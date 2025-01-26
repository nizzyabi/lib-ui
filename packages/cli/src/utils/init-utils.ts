import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger, spinner } from './visuals';

const execPromise = promisify(exec);

const helloApiRouteContent = `import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello from the libui API!' })
}
`;

const envFileContent = `# This file will contain all the required environment variables for the application
# Make sure to update these values in your .env file

DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"

API_BASE_URL="http://localhost:3000/api"
`;

export async function runInit() {
  // Check if directory is empty
  const projectDir = process.cwd();
  const dirContents = await fs.readdir(projectDir);
  if (dirContents.length > 0) {
    logger.error('Directory is not empty. Please run this command in an empty directory.');
    process.exit(1);
  }

  // 1. Create Next.js project
  const nextInitSpinner = spinner('Creating Next.js project...').start();
  try {
    await execPromise('npx create-next-app@latest . --typescript --use-npm --no-eslint --no-src-dir --no-experimental-app --yes', 
      { 
        cwd: projectDir,
        env: { ...process.env, FORCE_COLOR: '1' },
      }
    );
    nextInitSpinner.success('Next.js project created.');
  } catch (error) {
    nextInitSpinner.error('Failed to create Next.js project.');
    throw error;
  }

  // 2. Install Prisma
  const prismaSpinner = spinner('Setting up Prisma...').start();
  try {
    await execPromise('npm install -D prisma @prisma/client', { cwd: projectDir });
    await fs.mkdir(path.join(projectDir, 'prisma'), { recursive: true });
    prismaSpinner.success('Prisma setup completed.');
  } catch (error) {
    prismaSpinner.error('Failed to setup Prisma.');
    throw error;
  }

  // 3. Create API directory structure
  const apiSpinner = spinner('Creating API structure...').start();
  try {
    await fs.mkdir(path.join(projectDir, 'app/api/hello'), { recursive: true });
    await fs.writeFile(path.join(projectDir, 'app/api/hello/route.ts'), helloApiRouteContent, 'utf8');
    apiSpinner.success('API structure created.');
  } catch (error) {
    apiSpinner.error('Failed to create API structure.');
    throw error;
  }

  // 4. Create .env file
  const envSpinner = spinner('Creating environment file...').start();
  try {
    await fs.writeFile(path.join(projectDir, '.env'), envFileContent, 'utf8');
    envSpinner.success('Environment file created.');
  } catch (error) {
    envSpinner.error('Failed to create environment file.');
    throw error;
  }

  // 5. Create libui.config.json
  const config = {
    addedComponents: [],
  };

  const configPath = path.join(projectDir, 'libui.config.json');
  try {
    const configSpinner = spinner('Writing libui.config.json...').start();
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
    configSpinner.success('libui.config.json written successfully.');
  } catch (error) {
    logger.error('Failed to write libui.config.json.');
    throw error;
  }

  // 6. Install additional dependencies
  const dependenciesSpinner = spinner('Installing additional dependencies...').start();
  try {
    await execPromise('npm install react react-dom next @prisma/client', { cwd: projectDir });
    dependenciesSpinner.success('Additional dependencies installed.');
  } catch (error) {
    dependenciesSpinner.error('Failed to install additional dependencies.');
    throw error;
  }

  logger.success('Initialization complete! You can now:');
  logger.success('1. Update your .env file with your database credentials');
  logger.success('2. Run `npx prisma generate` to generate the Prisma Client');
  logger.success('3. Start your development server with `npm run dev`');
}

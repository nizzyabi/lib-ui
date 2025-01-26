import { promises as fs } from 'fs';
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
# Make sure to update them every time you add a new component
`;

const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
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
  const prismaSpinner = spinner('Installing Prisma...').start();
  try {
    await execPromise('npm install -D prisma @prisma/client', { cwd: projectDir });
    prismaSpinner.success('Prisma installed.');
  } catch (error) {
    prismaSpinner.error('Failed to install Prisma.');
    throw error;
  }

  // 3. Create API directory structure
  const apiSpinner = spinner('Creating API structure...').start();
  try {
    await fs.mkdir('app/api/hello', { recursive: true });
    await fs.writeFile('app/api/hello/route.ts', helloApiRouteContent, 'utf8');
    apiSpinner.success('API structure created.');
  } catch (error) {
    apiSpinner.error('Failed to create API structure.');
    throw error;
  }

  // 4. Create .env file
  const envSpinner = spinner('Creating environment file...').start();
  try {
    await fs.writeFile('.env', envFileContent, 'utf8');
    envSpinner.success('Environment file created.');
  } catch (error) {
    envSpinner.error('Failed to create environment file.');
    throw error;
  }

  // 5. Create libui.config.json
  const config = {
    addedComponents: [],
  };

  try {
    const configSpinner = spinner('Writing libui.config.json...').start();
    await fs.writeFile('libui.config.json', JSON.stringify(config, null, 2), 'utf8');
    configSpinner.success('libui.config.json written successfully.');
  } catch (error) {
    logger.error('Failed to write libui.config.json.');
    throw error;
  }

  // 6. Install additional dependencies
  const dependenciesSpinner = spinner('Installing additional dependencies...').start();
  try {
    await execPromise('npm install react react-dom next @prisma/client clsx tailwind-merge', { cwd: projectDir });
    dependenciesSpinner.success('Additional dependencies installed.');
  } catch (error) {
    dependenciesSpinner.error('Failed to install additional dependencies.');
    throw error;
  }

  // 7. Create utils directory and cn helper
  const utilsSpinner = spinner('Creating utils directory and helpers...').start();
  try {
    await fs.mkdir('lib', { recursive: true });
    await fs.writeFile('lib/utils.ts', utilsContent, 'utf8');
    utilsSpinner.success('Utils directory and helpers created.');
  } catch (error) {
    utilsSpinner.error('Failed to create utils directory and helpers.');
    throw error;
  }

  logger.success('Initialization complete! You can now:');
  logger.success('1. Update your .env file with your database credentials');
  logger.success('2. Start your development server with `npm run dev`');
}

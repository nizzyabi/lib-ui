import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from './logger';
import { highlighter } from './highlighter';
import { spinner } from './spinner';

const execPromise = promisify(exec);

export async function runInit(projectDir: string) {
  // Check if directory is empty
  const dirContents = await fs.readdir(projectDir);
  if (dirContents.length > 0) {
    logger.error('Directory is not empty. Please run this command in an empty directory.');
    process.exit(1);
  }

  // Initialize Next.js project with TypeScript
  const nextInitSpinner = spinner('Initializing Next.js project with TypeScript...').start();
  try {
    await execPromise('npx create-next-app@latest . --typescript --use-npm --no-eslint --no-tailwind --no-src-dir --no-experimental-app --yes', 
      { 
        cwd: projectDir,
        env: { ...process.env, FORCE_COLOR: '1' },
      }
    );
    nextInitSpinner.success('Next.js project initialized with TypeScript.');
  } catch (error) {
    nextInitSpinner.error('Failed to initialize Next.js project.');
    if (error instanceof Error) {
      logger.error(`Error details: ${error.message}`);
    }
    throw error;
  }

  // Install Tailwind CSS
  const tailwindSpinner = spinner('Installing Tailwind CSS...').start();
  try {
    await execPromise('npm install -D tailwindcss postcss autoprefixer', { cwd: projectDir });
    await execPromise('npx tailwindcss init -p', { cwd: projectDir });
    tailwindSpinner.success('Tailwind CSS installed.');

    // Configure Tailwind CSS
    const tailwindConfigPath = path.join(projectDir, 'tailwind.config.js');
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
    await fs.writeFile(tailwindConfigPath, tailwindConfig, 'utf8');

    // Check for app directory structure
    const appDirExists = await exists(path.join(projectDir, 'app'));
    const globalCssPath = appDirExists 
      ? path.join(projectDir, 'app', 'globals.css')
      : path.join(projectDir, 'styles', 'globals.css');

    // Create directory if it doesn't exist
    await fs.mkdir(path.dirname(globalCssPath), { recursive: true });

    // Add Tailwind directives to globals.css
    const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add your custom styles here */
`;
    await fs.writeFile(globalCssPath, globalsCssContent, 'utf8');
    logger.log(highlighter.success('Tailwind CSS configured successfully.'));
  } catch (error) {
    tailwindSpinner.error('Failed to install Tailwind CSS.');
    throw error;
  }

  // Install Prisma
  const prismaSpinner = spinner('Setting up Prisma...').start();
  try {
    await execPromise('npm install -D prisma @prisma/client', { cwd: projectDir });
    await fs.mkdir(path.join(projectDir, 'prisma'), { recursive: true });
    
    const prismaSchema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Add your models here
`;
    await fs.writeFile(path.join(projectDir, 'prisma', 'schema.prisma'), prismaSchema, 'utf8');
    prismaSpinner.success('Prisma setup completed.');
  } catch (error) {
    prismaSpinner.error('Failed to setup Prisma.');
    throw error;
  }

  // Create API directory structure
  const apiSpinner = spinner('Creating API structure...').start();
  try {
    // Create all necessary directories
    await fs.mkdir(path.join(projectDir, 'app', 'api', 'hello'), { recursive: true });
    
    // Create example API route
    const exampleApiRoute = `import { NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({ message: 'Hello from libui API!' })
}
`;
    await fs.writeFile(path.join(projectDir, 'app', 'api', 'hello', 'route.ts'), exampleApiRoute, 'utf8');
    apiSpinner.success('API structure created.');
  } catch (error) {
    apiSpinner.error('Failed to create API structure.');
    throw error;
  }

  // Create both .env and .env.sample with the same content
  const envSpinner = spinner('Creating environment file...').start();
  try {
    const envContent = `# This file will contain all the required environment variables for the application
# Make sure to update these values in your .env file

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"

# API Configuration
API_BASE_URL="http://localhost:3000/api"
`;
    await fs.writeFile(path.join(projectDir, '.env'), envContent, 'utf8');
    envSpinner.success('Environment file created.');
  } catch (error) {
    envSpinner.error('Failed to create environment file.');
    throw error;
  }

  // Create libuiconfig.json (expanded version)
  const config = {
    tsx: true,
    tailwind: {
      config: 'tailwind.config.js',
      css: 'styles/globals.css',
      baseColor: 'blue',
      cssVariables: true,
      prefix: '',
    },
    rsc: false,
    database: {
      provider: 'prisma',
      schema: 'prisma/schema.prisma',
      url: 'DATABASE_URL',
    },
    api: {
      baseUrl: '/api',
      version: 'v1',
      cors: {
        enabled: true,
        origins: ['http://localhost:3000'],
      },
    },
    aliases: {
      utils: 'utils',
      components: 'components',
      lib: 'lib',
      hooks: 'hooks',
      api: 'app/api',
      prisma: 'prisma',
    },
  };

  const configPath = path.join(projectDir, 'libuiconfig.json');
  try {
    const configSpinner = spinner('Writing libuiconfig.json...').start();
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
    configSpinner.success('libuiconfig.json written successfully.');
  } catch (error) {
    logger.error('Failed to write libuiconfig.json.');
    throw error;
  }

  // Install additional dependencies
  const dependenciesSpinner = spinner('Installing additional dependencies...').start();
  try {
    await execPromise('npm install react react-dom next @prisma/client', { cwd: projectDir });
    dependenciesSpinner.success('Additional dependencies installed.');
  } catch (error) {
    dependenciesSpinner.error('Failed to install additional dependencies.');
    throw error;
  }

  logger.log(highlighter.success('Initialization complete! You can now:'));
  logger.log('1. Update your .env file with your database credentials');
  logger.log('2. Run `npx prisma generate` to generate the Prisma Client');
  logger.log('3. Start your development server with `npm run dev`');
}

async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
} 
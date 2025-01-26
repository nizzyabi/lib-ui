import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import { logger, spinner } from './visuals';
import { Metadata } from '../types/metadata';
import { exists } from './files';

export async function addComponent(componentName: string) {
  const spin = spinner(`Adding ${componentName} component...`);
  const projectDir = process.cwd();
  try {
    // Validate libui.config.json exists and the component is not already added
    const configPath = path.join(projectDir, 'libui.config.json');
    if (!await exists(configPath)) {
      throw new Error('libui.config.json not found in the current directory');
    }
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    if (componentName in config.addedComponents) {
      throw new Error(`${componentName} component already added.`);
    }

    // Validate package.json exists
    const packageJsonPath = path.join(projectDir, 'package.json');
    if (!await exists(packageJsonPath)) {
      throw new Error('package.json not found in the current directory');
    }

    spin.start();
    
    const remoteRepoBaseURL = 'https://raw.githubusercontent.com/nizzyabi/lib-ui/main';
    const basePath = `core/${componentName}`;

    logger.log(`Fetching component metadata...`);
    const response = await axios.get(`${remoteRepoBaseURL}/${basePath}/metadata.json`);
    if (!response.data) {
      throw new Error(`Failed to fetch metadata.json`);
    }
    const metadata: Metadata = response.data;
    
    // Validate that none of the target directories exist
    logger.log('Checking if files already exist...');
    for (const file of metadata.files) {
      const localFilePath = path.join(projectDir, file);
      if (await exists(localFilePath)) {
        throw new Error(`File ${localFilePath} already exists`);
      }
    }

    // Download all files first
    const downloadedFiles = await Promise.all(
      metadata.files.map(async (file) => {
        const remoteFileURL = `${remoteRepoBaseURL}/${file}`;

        logger.log(`Downloading file from ${remoteFileURL}`);        
        const response = await axios.get(remoteFileURL, { responseType: 'text' });
        if (!response.data) {
          throw new Error(`No content retrieved from ${remoteFileURL}`);
        }
        return { file, content: response.data };
      })
    );

    // Create directories and write files
    for (const { file, content } of downloadedFiles) {
      const localFilePath = path.join(projectDir, file);
      const directory = path.dirname(localFilePath);

      await fs.mkdir(directory, { recursive: true });
      await fs.writeFile(localFilePath, content, 'utf-8');
      logger.log(`Added ${file} to ${localFilePath}`);
    }

    // Add dependencies to package.json
    const packageJson = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJsonObject = JSON.parse(packageJson);

    // Handle dependencies
    packageJsonObject.dependencies = packageJsonObject.dependencies || {};
    for (const [dep, version] of Object.entries(metadata.dependencies)) {
      if (packageJsonObject.dependencies[dep]) {
        if (packageJsonObject.dependencies[dep] === version) {
          logger.info(`Dependency ${dep}@${version} already exists in package.json`);
        } else {
          logger.warn(`Dependency ${dep} exists with different version: ${packageJsonObject.dependencies[dep]} (wanted: ${version})`);
        }
      } else {
        packageJsonObject.dependencies[dep] = version;
      }
    }

    // Handle devDependencies
    packageJsonObject.devDependencies = packageJsonObject.devDependencies || {};
    for (const [dep, version] of Object.entries(metadata.devDependencies)) {
      if (packageJsonObject.devDependencies[dep]) {
        if (packageJsonObject.devDependencies[dep] === version) {
          logger.info(`DevDependency ${dep}@${version} already exists in package.json`);
        } else {
          logger.warn(`DevDependency ${dep} exists with different version: ${packageJsonObject.devDependencies[dep]} (wanted: ${version}). Skipping...`);
        }
      } else {
        packageJsonObject.devDependencies[dep] = version;
      }
    }

    // Add env variables
    const envFilePath = path.join(projectDir, '.env');
    const envFile = await fs.readFile(envFilePath, 'utf-8');
    for (const envVar of metadata.envVariables) {
      const regex = new RegExp(`^${envVar}\\s*=\\s*`, 'm');
      if (regex.test(envFile)) {
        logger.warn(`Env variable ${envVar} already exists in .env file`);
      } else {
        await fs.writeFile(envFilePath, `\n${envVar}=...\n`, { flag: 'a' });
      }
    }

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJsonObject, null, 2), 'utf-8');

    // Add the component to the config
    config.addedComponents.push(componentName);
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');

    spin.succeed('Files and dependencies added successfully');
    logger.success(`The ${componentName} component has been added successfully`);
    logger.success('1. Update the .env file with the correct values');
    logger.success('2. Run `npm install` to install the new dependencies');
    logger.success('3. Run `npx prisma generate` to update the Prisma Client');
  } catch (error) {
    spin.fail(`Failed to add ${componentName} component`);
    throw error;
  }
}
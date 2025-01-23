import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import { handleError } from './handle-error';
import { logger } from './logger';
import { spinner } from './spinner';

interface Metadata {
  files: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export async function addComponent(componentName: string) {
  const spin = spinner(`Adding ${componentName} component...`);
  try {
    spin.start();
    
    const remoteRepoBaseURL = 'https://raw.githubusercontent.com/nizzyabi/lib-ui/main';
    const basePath = `core/${componentName}`;
    const metadata: Metadata = await fs.readFile(`${basePath}/metadata.json`, 'utf-8').then(JSON.parse);

    // First, validate that none of the target directories exist
    for (const file of metadata.files) {
      const localFilePath = path.join(process.cwd(), file);
      const directory = path.dirname(localFilePath);

      if (await fs.access(directory).then(() => true).catch(() => false)) {
        throw new Error(`Directory ${directory} already exists`);
      }
    }

    // Download all files first
    const downloadedFiles = await Promise.all(
      metadata.files.map(async (file) => {
        const remoteFileURL = `${remoteRepoBaseURL}/${file}`;
        logger.log(`Downloading file from ${remoteFileURL}`);
        
        try {
          const response = await axios.get(remoteFileURL, { responseType: 'text' });
          if (!response.data) {
            throw new Error('Failed to download file');
          }
          return { file, content: response.data };
        } catch {
          throw new Error(`Failed to download ${file} from ${remoteFileURL}`);
        }
      })
    );

    // Create directories and write files
    for (const { file, content } of downloadedFiles) {
      const localFilePath = path.join(process.cwd(), file);
      const directory = path.dirname(localFilePath);

      logger.log(`Creating directory ${directory}`);
      await fs.mkdir(directory, { recursive: true });

      await fs.writeFile(localFilePath, content, 'utf-8');
      logger.log(`Added ${file} to ${localFilePath}`);
    }

    // TODO Install dependencies
  
    spin.succeed(`${componentName} component added successfully`);
  } catch (error) {
    spin.fail(`Failed to add ${componentName} component`);
    handleError(error);
  }
} 
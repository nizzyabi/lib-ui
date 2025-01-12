import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import { handleError } from './handle-error';
import { logger } from './logger';
import { spinner } from './spinner';

interface LibUIConfig {
  aliases: Record<string, string>;
}

export async function addComponent() {
  const spin = spinner('Adding auth component...');
  try {
    spin.start();
    
    const configPath = path.join(process.cwd(), 'libuiconfig.json');
    const configData = await fs.readFile(configPath, 'utf-8');
    const libConfig: LibUIConfig = JSON.parse(configData);

    const aliases = libConfig.aliases;

    const remoteRepoBaseURL = 'https://raw.githubusercontent.com/nizzyabi/lib-ui/main/';

    // Define component files with their relative paths
    const componentFiles = [
        'actions/admin.ts',
        'actions/login.ts',
        'actions/logout.ts',
        'actions/new-password.ts',
        'actions/new-verification.ts',
        'actions/register.ts',
        'actions/reset.ts',
        'actions/settings.ts',
        'app/api/admin/route.ts',
        'app/api/auth/[...nextauth]/route.ts',
        'auth.config.ts',
        'auth.ts',
        'components/auth/auth.tsx',
        'components/auth/logout-button.tsx',
        'components/auth/user-button.tsx',
        'components/ui/avatar.tsx',
        'components/ui/examples/auth-example.tsx',
        'data/account.ts',
        'data/password-reset-token.ts',
        'data/two-factor-confirmation.ts',
        'data/two-factor-token.ts',
        'data/user.ts',
        'data/verification-token.ts',
        'hooks/use-current-role.ts',
        'hooks/use-current-user.ts',
        'lib/auth.ts',
        'lib/mail.ts',
        'lib/token.ts',
        'lib/utils.ts',
        'next-auth.d.ts',
        'prisma/schema.prisma',
        'routes.ts',
        'schemas/index.ts',
    ];

    for (const file of componentFiles) {
      const remoteFileURL = `${remoteRepoBaseURL}${file}`;
      const localFilePath = path.join(process.cwd(), file);

      console.log(`Downloading from: ${remoteFileURL}`);
      console.log(`Saving to: ${localFilePath}`);

      // Ensure the local directory exists
      const directory = path.dirname(localFilePath);
      await fs.mkdir(directory, { recursive: true });

      // Download the file from the remote repository
      let response;
      try {
        response = await axios.get(remoteFileURL, { responseType: 'text' });

        if (response.data) {
          await fs.writeFile(localFilePath, response.data, 'utf-8');
          logger.log(`Added ${file} to ${localFilePath}`);
        } else {
          throw new Error('Failed to download file');
        }
      } catch {
        throw new Error(`Failed to download ${file} from ${remoteFileURL}`);
      }
    }

    spin.succeed('Auth component added successfully');
  } catch (error) {
    spin.fail('Failed to add auth component');
    handleError(error);
  }
} 
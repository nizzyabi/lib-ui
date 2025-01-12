"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComponent = addComponent;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const axios_1 = __importDefault(require("axios"));
const handle_error_1 = require("./handle-error");
const logger_1 = require("./logger");
const spinner_1 = require("./spinner");
async function addComponent() {
    const spin = (0, spinner_1.spinner)('Adding auth component...');
    try {
        spin.start();
        const configPath = path_1.default.join(process.cwd(), 'libuiconfig.json');
        const configData = await promises_1.default.readFile(configPath, 'utf-8');
        const libConfig = JSON.parse(configData);
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
            const localFilePath = path_1.default.join(process.cwd(), file);
            console.log(`Downloading from: ${remoteFileURL}`);
            console.log(`Saving to: ${localFilePath}`);
            // Ensure the local directory exists
            const directory = path_1.default.dirname(localFilePath);
            await promises_1.default.mkdir(directory, { recursive: true });
            // Download the file from the remote repository
            let response;
            try {
                response = await axios_1.default.get(remoteFileURL, { responseType: 'text' });
                if (response.data) {
                    await promises_1.default.writeFile(localFilePath, response.data, 'utf-8');
                    logger_1.logger.log(`Added ${file} to ${localFilePath}`);
                }
                else {
                    throw new Error('Failed to download file');
                }
            }
            catch {
                throw new Error(`Failed to download ${file} from ${remoteFileURL}`);
            }
        }
        spin.succeed('Auth component added successfully');
    }
    catch (error) {
        spin.fail('Failed to add auth component');
        (0, handle_error_1.handleError)(error);
    }
}

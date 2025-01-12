"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = void 0;
const commander_1 = require("commander");
const init_setup_1 = require("../utils/init-setup");
const logger_1 = require("../utils/logger");
const handle_error_1 = require("../utils/handle-error");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
exports.initCommand = new commander_1.Command('init')
    .description('Initialize a new Next.js project with TypeScript and Tailwind CSS')
    .action(async () => {
    try {
        const projectDir = process.cwd();
        const configPath = path_1.default.join(projectDir, 'components.json');
        if (await exists(configPath)) {
            logger_1.logger.error('components.json already exists in this directory. Initialization aborted.');
            process.exit(1);
        }
        await (0, init_setup_1.runInit)(projectDir);
        logger_1.logger.log('Project initialization completed successfully.');
    }
    catch (error) {
        (0, handle_error_1.handleError)(error);
    }
});
async function exists(path) {
    try {
        await fs_1.promises.access(path);
        return true;
    }
    catch {
        return false;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
const logger_1 = require("./logger");
const highlighter_1 = require("./highlighter");
function handleError(error) {
    if (error instanceof Error) {
        logger_1.logger.error(highlighter_1.highlighter.error(error.message));
    }
    else {
        logger_1.logger.error(highlighter_1.highlighter.error('An unknown error occurred.'));
    }
    process.exit(1);
}

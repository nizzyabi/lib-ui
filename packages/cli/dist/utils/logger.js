"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.logger = {
    log: (message) => {
        console.log(message);
    },
    error: (message) => {
        console.error(chalk_1.default.red(message));
    },
    // Add other methods if necessary
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlighter = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.highlighter = {
    error: (str) => chalk_1.default.red(str),
    success: (str) => chalk_1.default.green(str),
    info: (str) => chalk_1.default.blue(str),
};

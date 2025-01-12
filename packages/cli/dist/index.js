#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const add_1 = require("./commands/add");
const program = new commander_1.Command();
program
    .name('libui-next')
    .description('add full-stack components to your project')
    .version('1.0.0');
program.addCommand(init_1.initCommand);
program.addCommand(add_1.addCommand);
program.parse(process.argv);

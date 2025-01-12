"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = void 0;
const commander_1 = require("commander");
const add_component_1 = require("../utils/add-component");
exports.addCommand = new commander_1.Command('add')
    .description('add a new component')
    .argument('<componentName>', 'Name of the component to add')
    .action(async (componentName) => {
    if (componentName.toLowerCase() !== 'auth') {
        console.error('Only the "auth" component can be added at this time.');
        process.exit(1);
    }
    await (0, add_component_1.addComponent)();
});

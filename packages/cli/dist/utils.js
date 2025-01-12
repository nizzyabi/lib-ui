"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComponent = exports.initializeProject = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const initializeProject = () => {
    const projectDir = process.cwd();
    const configPath = path_1.default.join(projectDir, 'shadcn.config.js');
    if (fs_1.default.existsSync(configPath)) {
        console.log('Project is already initialized.');
        return;
    }
    const configContent = `module.exports = {
  componentsDir: 'src/components',
  themeDir: 'src/theme',
  styleLibrary: 'tailwindcss',
};
`;
    fs_1.default.writeFileSync(configPath, configContent);
    console.log('Initialized shadcn.config.js');
};
exports.initializeProject = initializeProject;
const addComponent = (componentName) => {
    const projectDir = process.cwd();
    const componentsDir = path_1.default.join(projectDir, 'src', 'components');
    if (!fs_1.default.existsSync(componentsDir)) {
        fs_1.default.mkdirSync(componentsDir, { recursive: true });
    }
    const componentPath = path_1.default.join(componentsDir, `${componentName}.tsx`);
    if (fs_1.default.existsSync(componentPath)) {
        console.log(`Component "${componentName}" already exists.`);
        return;
    }
    const componentContent = `import React from 'react';

interface ${componentName}Props {
  // Define your props here
}

const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <div>
      {/* Your ${componentName} component */}
    </div>
  );
};

export default ${componentName};
`;
    fs_1.default.writeFileSync(componentPath, componentContent);
    console.log(`Added component "${componentName}"`);
};
exports.addComponent = addComponent;

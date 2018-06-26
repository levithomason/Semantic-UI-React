
// @ts-check
const inquirer = require('inquirer');

const fs = require('fs');
const path = require('path');

const SRC_COMPONENTS_DIR = path.resolve(__dirname, './src/components');
const DOCS_COMPONENT_EXAMPLES_DIR = path.resolve(__dirname, './docs/src/examples/components');

/**
 * @param {string} filepath
 * @param {string} [content]
 */
function touch(filepath, content) {
    const fileHandle = fs.openSync(filepath, 'w');

    if (content) {
        fs.writeSync(fileHandle, content);
    }

    fs.closeSync(fileHandle);
}

/**
 * @param {string} path 
 */
function ensureDirExists(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

/**
 * @param {string} rootDirectory 
 * @param {Object} treeDescriptor 
 */
function createFilesTree(rootDirectory, treeDescriptor) {
    ensureDirExists(rootDirectory);

    if (!treeDescriptor) { 
        return;
    }

    Object.keys(treeDescriptor).forEach(nodeName => {
        if (typeof treeDescriptor[nodeName] === 'string') {
            touch(path.resolve(rootDirectory, nodeName), treeDescriptor[nodeName]);
        } else {
            createFilesTree(
                path.resolve(rootDirectory, nodeName),
                treeDescriptor[nodeName]
            );
        }
    });
}

/**
 * @param {string} componentName 
 * @returns {string}
 */
function getSrcComponentContent(componentName) {
    return [
        `import React from 'react'`,
        ``,
        `const ${componentName}: any = (props: any) => (`,
        `  <div>Hello from ${componentName}!</div>`,
        `);`,
        ``,
        `export default ${componentName};`,
        ``
    ].join('\n');
}

/**
 * @param {string} componentName
 * @returns {string} 
 */
function getSrcIndexContent(componentName) {
    return [
        `export { default } from './${componentName}'`,
        ``
    ].join('\n');
}

/**
 * @param {string} componentName 
 * @returns {string}
 */
function getDocsTypesExampleContent(componentName) {
    return [
        `import React from 'react'`,
        `import { ${componentName} } from 'stardust'`,
        ``,
        `const ${componentName}Example = () => <${componentName} />`,
        ``,
        `export default ${componentName}Example`,
        ``
    ].join('\n');
}

/**
 * @param {string} componentName
 * @returns {string}
 */
function getDocsTypesIndexContent(componentName) {
    return [
        `import React from 'react'`,
        `import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample'`,
        `import ExampleSection from 'docs/src/components/ComponentDoc/ExampleSection'`,
        ``,
        `const Types = () => (`,
        `  <ExampleSection title="Types">`,
        `    <ComponentExample`,
        `      title="Default"`,
        `      description="A default ${componentName}."`,
        `      examplePath="components/${componentName}/Types/${componentName}Example"`,
        `    />`,
        `  </ExampleSection>`,
        `)`,
        ``,
        `export default Types`,
        ``
    ].join('\n');
}

/**
 * @param {string} componentName
 * @returns {string}
 */
function getDocsIndexContent(componentName) {
    return [
        `import React from 'react'`,
        `import Types from './Types'`,
        ``,
        `const ${componentName}Examples = () => (`,
        `  <div>`,
        `    <Types />`,
        `  </div>`,
        `)`,
        ``,
        `export default ${componentName}Examples`,
        ``
    ].join('\n');
}

/**
 * @param {string} message 
 */
function writeWarning(message) {
    console.warn(`WARNING: ${message}`);
}

/**
 * @param {string} componentName 
 */
function createComponentFilesInSrc(componentName) {
    // index.ts
    // ComponentName.tsx

    const componentDir = path.resolve(SRC_COMPONENTS_DIR, componentName);
    if (fs.existsSync(componentDir)) {
        writeWarning(`Directory of '${componentName}' already exists, nothing is created in src.`);
        return;
    }

    createFilesTree(componentDir, {
        [`${componentName}.tsx`]: getSrcComponentContent(componentName),
        'index.ts': getSrcIndexContent(componentName)
    });

}

/**
 * @param {string} componentName 
 */
function createComponentFilesInDocs(componentName) {
    const componentDir = path.resolve(DOCS_COMPONENT_EXAMPLES_DIR, componentName);

    if (fs.existsSync(componentDir)) {
        writeWarning(`Directory of '${componentName}' already exists, nothing is created in docs.`);
        return;
    }

    createFilesTree(componentDir, {
        'Types': {
            [`${componentName}Example.tsx`]: getDocsTypesExampleContent(componentName),
            'index.tsx': getDocsTypesIndexContent(componentName)
        },
        'index.tsx': getDocsIndexContent(componentName)
    });
}

/**
 * @param {string} componentName 
 */
function ensureExportStatementPresentInLibIndexFile(componentName) {
    const libIndexFilePath = path.resolve(SRC_COMPONENTS_DIR, '../index.ts');

    const libIndexFileContent = fs.readFileSync(libIndexFilePath).toString();
    const componentExportStatement = `export { default as ${componentName} } from './components/${componentName}'`;

    if (libIndexFileContent.includes(componentExportStatement)) {
        writeWarning(`Component '${componentName}' is already exported, nothing is added to lib's index file.`);
        return;
    }

    fs.appendFileSync(libIndexFilePath, `${componentExportStatement}\n`);
}

const QUESTIONS = [
  {
    name: 'componentName',
    type: 'input',
    message: 'Component name:',
    validate: function (input) {
      if (/^[A-Z]([A-Za-z\d])+$/.test(input)) return true;
      else return 'Component name should start with a capital letter and may only include letters or numbers.';
    }
  },
];

inquirer.prompt(QUESTIONS)
  .then(answers => {
    createComponentFilesInSrc(answers.componentName);
    ensureExportStatementPresentInLibIndexFile(answers.componentName);

    createComponentFilesInDocs(answers.componentName);

    console.log('Generation successfully completed.')
});

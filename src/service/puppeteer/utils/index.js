import path from 'path';
import fs from 'fs';

function createFolderIfNotExists(outputFilePath) {
    const parent = path.dirname(outputFilePath);
    if (!fs.existsSync(parent)) {
        createFolderIfNotExists(parent);
        fs.mkdirSync(parent);
    }
}

export const writeSync = function (outputFilePath, content) {
    createFolderIfNotExists(outputFilePath);
    fs.writeFileSync(outputFilePath, content);
}

export const writeFallback = (name, content) =>{
    writeSync(path.resolve(__dirname, '../../fallback', name+'.js'), `export default ${JSON.stringify(content, null, 2)}`);
}
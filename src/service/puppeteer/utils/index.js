import path from 'path';
import fs from 'fs';

export function createFolderIfNotExists(outputFilePath) {
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

export const writeFallback = (name, content) => {
    writeSync(path.resolve(__dirname, '../../fallback', name + '.js'), `export default ${JSON.stringify(content, null, 2)}`);
}

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
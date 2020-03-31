import path from 'path';
import fs from 'fs';
import XXH from 'xxhashjs';

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
    writeSync(path.resolve(__dirname, '../../fallback', name + '.json'), `${JSON.stringify(content, null, 2)}`);
}

export const readFallback = (name) => {
    try{
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../fallback', name + '.json'), 'UTF8'));
    }catch(e){
        return null;
    }
}

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

export const hashVal = (item) => XXH.h32([
    item.title,
    item.key,
    item.value,
    item.description,
    item.name,
    item.previewUrl,
    item.url,
    item.homepage,
    item.repository
].join('|'), 0xABCD).toString(16);

export const isObject = val => Object.prototype.toString.call(val) === '[object Object]';
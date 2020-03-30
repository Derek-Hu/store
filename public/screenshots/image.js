const sharp = require('sharp');
const path = require('path');
const Jimp = require('jimp');
Jimp.distance(image1, image2);

(async () => {
    // const buffer = await sharp(path.resolve(__dirname, './antd/0-zh-5db07ce7.png')).raw();

    const image = await Jimp.read(path.resolve(__dirname, './antd/0-zh-5db07ce7.png'));
    const empty = await Jimp.read(path.resolve(__dirname, '../empty.png'));

    const distance = Jimp.distance(image, empty);
    console.log(distance);
})()

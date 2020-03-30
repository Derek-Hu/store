const sharp = require('sharp');
const path = require('path');

(async () => {
    const buffer = await sharp(path.resolve(__dirname, './antd/0-zh-5db07ce7.png')).toFile('empty.jpg');

    const buffer2 = await sharp(path.resolve(__dirname, './antd/1-zh-9688d9db.png')).toBuffer('full.jpg');

    console.log(buffer);

    console.log(buffer2);
})()

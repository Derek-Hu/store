import fs from 'fs';
import { PNG } from 'pngjs';

export default (imageData) => {
    return new Promise((resolve, reject) => {
        let isEmpty = true;
        new PNG({ filterType: 4 }).parse(imageData, function (error, self) {
            if(error){
                reject(e);
                return;
            }
            const value = self.data[0];
            for (var y = 0; y < self.height; y++) {
                for (var x = 0; x < self.width; x++) {
                    var idx = (self.width * y + x);
                    if (self.data[idx] !== value) {
                        isEmpty = false;
                        break;
                    }
                }
                if (!isEmpty) {
                    break;
                }
            }
            resolve(isEmpty);
        });
    });
}

export const isEmptyByPath = (imagePath) => {
    return new Promise((resolve, reject) => {
        const isEmpty = true;
        const pipe = fs.createReadStream(imagePath).pipe(new PNG({ filterType: 4 }));

        pipe.on('error', function (e) {
            reject(e);
        })
        pipe.on('parsed', function () {
            const value = this.data[0];
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var idx = (this.width * y + x);
                    if (this.data[idx] !== value) {
                        isEmpty = false;
                        break;
                    }
                }
                if (!isEmpty) {
                    break;
                }
            }
            resolve(isEmpty);
        });
    });
}
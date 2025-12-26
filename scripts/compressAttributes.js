const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public/images/RealPic');

console.log(`Processing images in: ${directoryPath}`);

if (!fs.existsSync(directoryPath)) {
    console.error('Directory not found!');
    process.exit(1);
}

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            const filePath = path.join(directoryPath, file);
            const tempPath = path.join(directoryPath, `temp_${file}`);

            console.log(`Compressing ${file}...`);

            // Get file stats to compare later
            const originalSize = fs.statSync(filePath).size;

            sharp(filePath)
                .resize(1920, 1080, { // Resize to max HD resolution
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 75 }) // Compress to WebP with 75% quality
                .toFile(tempPath)
                .then(info => {
                    // Replace original file with compressed version
                    fs.unlinkSync(filePath);
                    fs.renameSync(tempPath, filePath);

                    const savings = ((originalSize - info.size) / originalSize * 100).toFixed(2);
                    console.log(`✔ Optimized ${file}: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(info.size / 1024 / 1024).toFixed(2)}MB (-${savings}%)`);
                })
                .catch(err => {
                    console.error(`Error processing ${file}:`, err);
                });
        }
    });
});

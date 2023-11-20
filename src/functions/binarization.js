export function applyBinarization(imageData, threshold) {
    const width = imageData.width;
    const height = imageData.height;
    const binarizedData = new ImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const brightness = 0.34 * imageData.data[i] + 0.5 * imageData.data[i + 1] + 0.16 * imageData.data[i + 2];
        const binary = brightness > threshold ? 255 : 0;
        binarizedData.data[i] = binary;
        binarizedData.data[i + 1] = binary;
        binarizedData.data[i + 2] = binary;
        binarizedData.data[i + 3] = 255;
    }

    return binarizedData;
}
export function applyBrightness(imageData, brightness) {
    const adjustedData = new ImageData(imageData.width, imageData.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        adjustedData.data[i] = imageData.data[i] * (brightness / 100);
        adjustedData.data[i + 1] = imageData.data[i + 1] * (brightness / 100);
        adjustedData.data[i + 2] = imageData.data[i + 2] * (brightness / 100);
        adjustedData.data[i + 3] = imageData.data[i + 3]; // mantendo o canal alpha
    }

    return adjustedData;
}
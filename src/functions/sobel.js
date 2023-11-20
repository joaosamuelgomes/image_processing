export function sobelFilter(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const sobelData = new ImageData(width, height);
    const grayscale = [];

    // Convertendo para escala de cinza
    for (let i = 0; i < imageData.data.length; i += 4) {
        const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        grayscale.push(avg, avg, avg, 255); // alpha permanece 255
    }

    // Kernels do Sobel
    const kernelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];
    const kernelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ];

    // Aplicando o filtro de Sobel
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let px = (y * width + x) * 4;
            let gx = 0;
            let gy = 0;

            for (let cy = -1; cy <= 1; cy++) {
                for (let cx = -1; cx <= 1; cx++) {
                    let cpx = ((y + cy) * width + (x + cx)) * 4;
                    gx += grayscale[cpx] * kernelX[cy + 1][cx + 1];
                    gy += grayscale[cpx] * kernelY[cy + 1][cx + 1];
                }
            }

            let magnitude = Math.sqrt(gx * gx + gy * gy) >>> 0; // Deslocamento para forçar resultado como inteiro
            sobelData.data[px] = magnitude;
            sobelData.data[px + 1] = magnitude;
            sobelData.data[px + 2] = magnitude;
            sobelData.data[px + 3] = 255;
        }
    }

    return sobelData;
}
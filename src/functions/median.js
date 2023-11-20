export function medianFilter(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);
    const windowSize = 3; // Tamanho da janela para o filtro de mediana
    const edge = Math.floor(windowSize / 2);

    for (let y = edge; y < height - edge; y++) {
        for (let x = edge; x < width - edge; x++) {
            const neighbors = [];
            for (let dy = -edge; dy <= edge; dy++) {
                for (let dx = -edge; dx <= edge; dx++) {
                    const i = ((y + dy) * width + (x + dx)) * 4;
                    neighbors.push({
                        r: imageData.data[i],
                        g: imageData.data[i + 1],
                        b: imageData.data[i + 2]
                    });
                }
            }

            neighbors.sort((a, b) => a.r - b.r);
            let medianR = neighbors[Math.floor(neighbors.length / 2)].r;

            neighbors.sort((a, b) => a.g - b.g);
            let medianG = neighbors[Math.floor(neighbors.length / 2)].g;

            neighbors.sort((a, b) => a.b - b.b);
            let medianB = neighbors[Math.floor(neighbors.length / 2)].b;

            const idx = (y * width + x) * 4;
            output.data[idx] = medianR;
            output.data[idx + 1] = medianG;
            output.data[idx + 2] = medianB;
            output.data[idx + 3] = 255; // Mantém o alpha como 255
        }
    }

    return output;
}
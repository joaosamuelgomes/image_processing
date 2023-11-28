/**
 * Aplica o filtro da mediana a uma imagem representada por dados de imagem.
 * @param {ImageData} imageData - Dados da imagem a ser filtrada.
 * @returns {ImageData} - Dados da imagem filtrada.
 */
export function medianFilter(imageData) {
    const width = imageData.width;
    const height = imageData.height;

    // Cria uma nova instância de ImageData com a mesma largura e altura da imagem original.
    const output = new ImageData(width, height);

    // Define o tamanho da janela para o filtro da mediana e o valor de borda.
    const windowSize = 3;
    const edge = Math.floor(windowSize / 2);

    // Itera sobre os pixels da imagem original.
    for (let y = edge; y < height - edge; y++) {
        for (let x = edge; x < width - edge; x++) {
            // Obtém os valores dos vizinhos ao redor do pixel atual.
            const neighbors = [];
            for (let dy = -edge; dy <= edge; dy++) {
                for (let dx = -edge; dx <= edge; dx++) {
                    const i = ((y + dy) * width + (x + dx)) * 4;
                    neighbors.push({
                        r: imageData.data[i],
                        g: imageData.data[i + 1],
                        b: imageData.data[i + 2],
                    });
                }
            }

            // Ordena os valores dos vizinhos para cada componente de cor (R, G, B).
            neighbors.sort((a, b) => a.r - b.r);
            let medianR = neighbors[Math.floor(neighbors.length / 2)].r;

            neighbors.sort((a, b) => a.g - b.g);
            let medianG = neighbors[Math.floor(neighbors.length / 2)].g;

            neighbors.sort((a, b) => a.b - b.b);
            let medianB = neighbors[Math.floor(neighbors.length / 2)].b;

            // Atribui os valores da mediana para os componentes de cor (R, G, B) na imagem de saída.
            const idx = (y * width + x) * 4;
            output.data[idx] = medianR;
            output.data[idx + 1] = medianG;
            output.data[idx + 2] = medianB;
            output.data[idx + 3] = 255;
        }
    }

    return output;
}
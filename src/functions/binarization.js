/**
 * Aplica a técnica de binarização a uma imagem representada por dados de imagem.
 * @param {ImageData} imageData - Dados da imagem a ser binarizada.
 * @param {number} threshold - Limiar de binarização, valor entre 0 e 255.
 * @returns {ImageData} - Dados da imagem binarizada.
 */
export function applyBinarization(imageData, threshold) {
    const width = imageData.width;
    const height = imageData.height;

    // Cria uma nova instância de ImageData com a mesma largura e altura da imagem original.
    const binarizedData = new ImageData(width, height);

    // Itera sobre os dados da imagem original.
    for (let i = 0; i < imageData.data.length; i += 4) {
        // Calcula o brilho da pixel utilizando a fórmula de luminosidade ponderada.
        const brightness = 0.34 * imageData.data[i] + 0.5 * imageData.data[i + 1] + 0.16 * imageData.data[i + 2];

        // Determina se o pixel será branco (255) ou preto (0) com base no limiar fornecido.
        const binary = brightness > threshold ? 255 : 0;

        // Atribui os valores binários para os componentes de cor (R, G, B) na imagem binarizada.
        binarizedData.data[i] = binary;
        binarizedData.data[i + 1] = binary;
        binarizedData.data[i + 2] = binary;

        // Mantém o componente alpha (transparência) inalterado.
        binarizedData.data[i + 3] = 255;
    }

    return binarizedData;
}

/**
 * Aplica o ajuste de brilho a uma imagem representada por dados de imagem.
 * @param {ImageData} imageData - Dados da imagem a ser ajustada.
 * @param {number} brightness - Valor de ajuste de brilho, variando de -100 a 100.
 * @returns {ImageData} - Dados da imagem ajustada.
 */
export function applyBrightness(imageData, brightness) {
    const adjustedData = new ImageData(imageData.width, imageData.height);

    // Itera sobre os dados da imagem original.
    for (let i = 0; i < imageData.data.length; i += 4) {
        // Aplica o ajuste de brilho a cada componente de cor (R, G, B) com base no valor fornecido.
        adjustedData.data[i] = imageData.data[i] * (brightness / 100);
        adjustedData.data[i + 1] = imageData.data[i + 1] * (brightness / 100);
        adjustedData.data[i + 2] = imageData.data[i + 2] * (brightness / 100);
        
        // Mantém o componente alpha (transparência) inalterado.
        adjustedData.data[i + 3] = imageData.data[i + 3];
    }
    
    return adjustedData;
}

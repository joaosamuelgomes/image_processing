# Processador de Imagens

Este projeto é um processador de imagens que permite aplicar diferentes filtros em uma imagem carregada pelo usuário. Ele é implementado em React e oferece uma interface interativa para a aplicação de filtros como brilho, binarização, mediana e Sobel.

## Tecnologias Utilizadas

- React
- JavaScript
- TailwindCSS
- React Icons
- Vite

## Funcionalidades

O processador de imagens oferece os seguintes filtros:

- **Brilho**: Ajusta o brilho da imagem. Matematicamente, isso é feito multiplicando os valores de cada pixel por um fator de brilho.
- **Binarização**: Converte a imagem em uma versão em preto e branco. Se um pixel é mais claro que um certo limiar, ele se torna branco; caso contrário, preto.
- **Mediana**: Um filtro que substitui cada pixel pelo valor mediano em sua vizinhança imediata. Isso ajuda a remover ruídos da imagem.
- **Sobel**: Um filtro de detecção de bordas que calcula o gradiente da intensidade dos pixels da imagem em cada ponto, destacando regiões de alta transição de intensidade.

## Funções

### Binarização de Imagens

A função `applyBinarization` é usada para converter uma imagem em uma versão em preto e branco, também conhecida como binarização. A função aceita dois parâmetros: os dados da imagem (`imageData`) e um valor de limiar (`threshold`).

- A função percorre cada pixel da imagem e calcula o brilho desse pixel com base em uma ponderação específica para os canais vermelho, verde e azul (RGB).
- Se o brilho calculado para um pixel exceder o valor de limiar definido, o pixel é transformado em branco (255 em todos os canais RGB). Caso contrário, ele é transformado em preto (0 em todos os canais RGB).
- O resultado é uma imagem onde os pixels são estritamente preto ou branco, dependendo de sua intensidade original em comparação com o valor de limiar.

### Ajuste de Brilho

A função `applyBrightness` é utilizada para alterar o brilho da imagem. Ela recebe os dados da imagem (`imageData`) e um valor de brilho (`brightness`) como parâmetros.

- A função modifica a intensidade de cada pixel da imagem multiplicando os valores dos canais vermelho, verde e azul (RGB) por um fator de brilho. Este fator é calculado com base no valor de brilho fornecido, que é uma porcentagem do brilho original.
- O canal alpha (transparência) de cada pixel é mantido inalterado para preservar a transparência original da imagem.
- O resultado é uma imagem com brilho ajustado, onde um valor de brilho maior que 100 aumenta a luminosidade e um valor menor que 100 a diminui.

### Filtro de Mediana

O `medianFilter` é uma função de processamento de imagem que aplica o filtro de mediana em uma imagem. O filtro de mediana é um tipo de filtro não-linear utilizado para reduzir o ruído em uma imagem.

- A função percorre cada pixel da imagem (excluindo as bordas) e considera uma pequena janela de pixels em torno de cada um.
- Para cada pixel, a função coleta os valores dos canais vermelho, verde e azul (RGB) dos pixels vizinhos dentro dessa janela.
- Esses valores são então ordenados, e o valor mediano é calculado separadamente para cada canal RGB.
- O pixel original é substituído pelo valor mediano, resultando em uma imagem onde os detalhes mais finos e o ruído são suavizados, enquanto as bordas mais fortes são preservadas.

### Filtro de Sobel

O `sobelFilter` é uma função que aplica o filtro de Sobel, um operador de detecção de bordas amplamente usado no processamento de imagens.

- Conversão para Escala de Cinza: Primeiro, a função converte a imagem para escala de cinza. Isso é feito calculando a média dos canais vermelho, verde e azul (RGB) de cada pixel.
- Aplicação dos Kernels do Sobel: A função utiliza dois kernels (matrizes 3x3) - um para detectar bordas horizontais (kernelX) e outro para detectar bordas verticais (kernelY). Cada pixel da imagem em escala de cinza é então processado usando esses kernels para calcular os gradientes horizontal e vertical.
- Cálculo da Magnitude do Gradiente: Para cada pixel, o filtro de Sobel calcula a magnitude do gradiente, que é a raiz quadrada da soma dos quadrados dos gradientes horizontal e vertical. Isso fornece a intensidade da borda naquele pixel.
- Resultado: O resultado final é uma imagem que destaca as bordas. As bordas são representadas por pixels mais claros, enquanto as áreas sem bordas significativas permanecem escuras.

## Instalação

Para configurar o ambiente de desenvolvimento:

```bash
git clone https://github.com/joaosamuelgomes/image_processing.git
cd image_processing
npm install
npm start
```

## Utilização

- Carregue uma imagem usando o botão de upload.
- Ajuste os filtros desejados usando os controles interativos.
- Baixe a imagem processada usando o botão de download.

## Integrantes

- João Samuel Gomes
- Jocemara Padilha

## Suporte

Para obter suporte, entre em contato com joao.samuel@sou.unijui.edu.br

## Licença

Este projeto está sobre licença MIT.
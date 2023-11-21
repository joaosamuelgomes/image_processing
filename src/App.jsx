import { useState } from "react";
import { applyBrightness } from "./functions/brightness";
import { applyBinarization } from "./functions/binarization";
import { sobelFilter } from "./functions/sobel";
import { medianFilter } from "./functions/median";
import { TfiReload } from "react-icons/tfi";
import { MdImage } from "react-icons/md";

function App() {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [binarization, setBinarization] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrightnessChange = (e) => {
    const newBrightness = parseInt(e.target.value, 10);
    setBrightness(newBrightness);

    if (selectedImage) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = selectedImage;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const brightnessData = applyBrightness(imageData, newBrightness);

        context.putImageData(brightnessData, 0, 0);

        const imageAfter = document.getElementById("image-after");
        if (imageAfter) {
          imageAfter.style.backgroundImage = `url(${canvas.toDataURL()})`;
        }
      };
    }
  };

  const handleBinarizationChange = (e) => {
    const newBinarization = parseInt(e.target.value, 10);
    setBinarization(newBinarization);

    if (selectedImage) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = selectedImage;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const binarizedData = applyBinarization(imageData, newBinarization);

        context.putImageData(binarizedData, 0, 0);

        const imageAfter = document.getElementById("image-after");
        if (imageAfter) {
          imageAfter.style.backgroundImage = `url(${canvas.toDataURL()})`;
        }
      };
    }
  };

  function applySobelFilter(imageSrc) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      const sobelData = sobelFilter(imgData);

      context.putImageData(sobelData, 0, 0);

      const imageAfter = document.getElementById("image-after");
      imageAfter.style.backgroundImage = `url(${canvas.toDataURL()})`;
    };
  }

  function applyMedianFilter(imageSrc) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      const medianData = medianFilter(imgData);

      context.putImageData(medianData, 0, 0);

      const imageAfter = document.getElementById("image-after");
      imageAfter.style.backgroundImage = `url(${canvas.toDataURL()})`;
    };
  }

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
  
    if (filter === "sobel" && selectedImage) {
      applySobelFilter(selectedImage);
    } else if (filter === "median" && selectedImage) {
      applyMedianFilter(selectedImage);
    }
  };

  const handleReset = () => {
    const imageBefore = document.getElementById("image-before");
    const imageAfter = document.getElementById("image-after");
  
    if (imageBefore && imageAfter) {
      imageAfter.style.backgroundImage = imageBefore.style.backgroundImage;
      imageAfter.style.filter = 'none';
  
      // Resetando os estados
      setBrightness(100);
      setBinarization(0);
      setSelectedFilter(''); // Resetar o filtro para o valor padrão
    }
  };

  const handleDownload = () => {
    const imageAfter = document.getElementById('image-after');
    if (imageAfter) {
      // Extrair o URL da imagem do estilo de fundo
      const imageURL = imageAfter.style.backgroundImage.slice(5, -2); // Remove 'url("' no início e '")' no final
  
      // Criar um link temporário para download
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'image-processed.png'; // Nome do arquivo para download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="flex w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url("https://github.com/joaosamuelgomes/image_processing/blob/8a407727d05c266090d31bc3f0e1aeb3cd63be97/src/assets/bg-image.jpg?raw=true")` }}
    >
      <div className="mx-auto bg-yellow-400 h-[90%] w-[70%] self-center">
        <h2 className="text-center text-2xl font-semibold mt-10">Processamento de imagens</h2>

        <div className="text-center mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="imageInput"
          />
          <label
            htmlFor="imageInput"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Selecione a imagem
          </label>
        </div>

        {selectedImage ? (
          <div className="flex flex-row gap-10 mt-6 justify-center">
            <div
              id="image-before"
              className="bg-white w-[400px] h-[225px]"
              style={{
                background: `url(${selectedImage}) no-repeat center center / contain`,
              }}
            ></div>
            <div
              id="image-after"
              className="bg-white w-[400px] h-[225px]"
              style={{
                background: `url(${selectedImage}) no-repeat center center / contain`,
                filter: `brightness(${brightness}%)`,
              }}
            ></div>
          </div>
        ) : (
          <div className="flex flex-row gap-10 mt-6 justify-center">
            <div className="bg-slate-200 w-[400px] h-[225px] flex justify-center items-center">
              <MdImage className="w-8 h-8"/>
            </div>
            <div className="bg-slate-200 w-[400px] h-[225px] flex justify-center items-center">
            <MdImage className="w-8 h-8"/>
            </div>
          </div>
        )}

        <div className="flex flex-row mt-4 gap-4 justify-center items-center">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brilho</label>
            <input
              id="brightness"
              onChange={handleBrightnessChange}
              type="range"
              min="50"
              max="150"
              value={brightness}
              className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Binarização</label>
            <input
              id="binarization"
              onChange={handleBinarizationChange}
              type="range"
              min="0"
              max="255"
              value={binarization}
              className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filtro</label>
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              id="filters"
              className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Selecione um filtro</option>
              <option value="sobel">Sobel</option>
              <option value="median">Mediana</option>
            </select>
          </div>

          <div className="mt-7">
            <button 
              type="button" 
              onClick={handleReset} 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full p-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <TfiReload />
              <span className="sr-only">Reload Icon</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row mt-10 gap-4 justify-center items-center">
          <button
            type="button"
            onClick={handleDownload}
            className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-500 dark:hover:bg-orange-600 focus:outline-none dark:focus:ring-yellow-600"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

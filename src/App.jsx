import { useState } from "react";

function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [binarization, setBinarization] = useState(0);

  const handleBinarizationChange = (e) => {
    
  }


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
    const newBrightness = e.target.value;
    setBrightness(newBrightness);

    const imageAfter = document.getElementById('image-after');
    if (imageAfter) {
      imageAfter.style.filter = `brightness(${newBrightness}%)`;
    }
  };

  return (
      <div className="flex w-screen h-screen bg-cover bg-center" style={{backgroundImage: `url("/src/assets/bg-image.jpg")`}}>

        <div className="mx-auto bg-yellow-400 h-[90%] w-[70%] self-center">

          <h2 className="text-center text-2xl font-semibold mt-10">Processamento de imagens</h2>

          <div className="text-center mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
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
                  background: `url(${selectedImage}) no-repeat center center / cover`,
                }}
              ></div>
              <div
                id="image-after"
                className="bg-white w-[400px] h-[225px]"
                style={{
                  background: `url(${selectedImage}) no-repeat center center / cover`,
                  filter: `brightness(${brightness}%)`
                }}
              ></div>
            </div>
          ) : <div className="flex flex-row gap-10 mt-6 justify-center">
            <div className="bg-slate-200 w-[400px] h-[225px]"></div>
            <div className="bg-slate-200 w-[400px] h-[225px]"></div>
          </div>
          }

          <div className="flex flex-row mt-4 gap-4 justify-center items-center">

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brilho</label>
              <input id="brightness" onChange={handleBrightnessChange} type="range" min="50" max="150" value={brightness} className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
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
              <select id="countries" className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Selecione um filtro</option>
                <option value="sobel">Sobel</option>
                <option value="median">Mediana</option>
              </select>
            </div>

            <div className="mt-9">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aplicar</button>
            </div>

          </div>

          <div className="flex flex-row mt-10 gap-4 justify-center items-center">
            <button type="button" className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-500 dark:hover:bg-orange-600 focus:outline-none dark:focus:ring-yellow-600">Download</button>
          </div>

        </div>
      </div>
  )
}

export default App

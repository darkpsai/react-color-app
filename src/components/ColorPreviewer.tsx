import React, { useEffect, useState } from "react";
import axios from "axios";

interface Color {
  id: number;
  name: string;
  color_code: string;
  hex_code: string;
}

// List of colors that will have a black font color
const COLOR_CODE_MAP = [
  'W',
  'Y',
  'CR',
  'S',
  'FLG',
  'HT'
]

const ColorPreviewer: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  useEffect(() => {
    // Fetch colors from the API
    const fetchColors = async () => {
      try {
        const response = await axios.get(
          "https://api.prolook.com/api/colors/prolook"
        );
        // console.log(response.data.colors);
        setColors(response.data.colors);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    fetchColors();
  }, []);

  const handleColorPreview = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex md:flex-row sm:flex-col flex-col justify-center py-4">
      <div className="md:w-1/3 sm:w-full flex flex-col">
        <h2 className="text-xl text-center font-bold mb-4">Colors</h2>
        <div className="overflow-y-auto h-[600px]">
          {colors.map((color) => (
            <div
              key={color.id}
              className="flex justify-between items center p-2 border"
            >
              <span>{color.name}</span>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:bg-blue-900"
                onClick={() => handleColorPreview(color)}
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-[800px] sm:w-full px-4 md:mt-0 sm:mt-6 mt-6">
        {selectedColor ? (
          <div className="flex flex-col">
            <h2 className="text-xl text-center font-bold mb-4">Selected Color</h2>
            <div
              className={"flex flex-col mt-4 w-full h-[320px] border rounded items-center justify-center " + (COLOR_CODE_MAP.includes(selectedColor.color_code) ? 'text-black' : 'text-white')}
              style={{ backgroundColor: "#" + selectedColor.hex_code}}
            >
              <p className={"text-center py-3"}>
                name: {selectedColor.name}
              </p>
              <p className="text-center py-3">
                hex: {selectedColor.hex_code}
              </p>
              <p className="text-center py-3">
                color code: {selectedColor.color_code}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Select a color to preview.</h2>
            <div className="flex flex-col mt-4 w-full h-[320px] border rounded items-center justify-center bg-transparent">
              <p className="text-black text-center py-3">name: null</p>
              <p className="text-black text-center py-3">hex: null</p>
              <p className="text-black text-center py-3">color: null</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPreviewer;

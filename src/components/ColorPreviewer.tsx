import React, { useEffect, useState } from "react";
import axios from "axios";

interface Color {
  id: number;
  name: string;
  color_code: string;
  hex_code: string;
}

// List of colors that will have a black font color
// const COLOR_CODE_MAP = ["W", "Y", "CR", "S", "FLG", "HT"];

const ColorPreviewer: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch colors from the API
    const fetchColors = async () => {
      try {
        const response = await axios.get(
          "https://api.prolook.com/api/colors/prolook"
          // "http://localhost:5000/colors"
        );
        console.log(response.data.colors);

        if (response.data.colors.length <= 0) {
          setError("No colors available from the API");
        } else {
          setColors(response.data.colors);
          setError(null); // Clear any previous error(s)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Set loading state to false after fetching is complete
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  const handleColorPreview = (color: Color) => {
    setSelectedColor(color);
  };

  const getTextColor = (hex: string): string => {
    // Ensure that the hex value starts with '#'
    if (!hex.startsWith('#')) {
      hex = `#${hex}`;
    }

    // Convert hex to rgb
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Calculate luminosity to determine if the color is light or dark
    const luminosity = (r * 0.299) + (g * 0.587) + (b * 0.114);

    // console.log('hex:', hex, 'brightness:', luminosity);

    // Return black for light color and white for dark color
    return luminosity > 186 ? 'text-black' : 'text-white';
  }

  // console.log('colors:',colors);

  return (
    <div className="flex md:flex-row sm:flex-col flex-col justify-center py-4">
      <div className="md:w-1/3 sm:w-full flex flex-col">
        <h2 className="text-xl text-center font-bold mb-4">Colors</h2>
        <div className="h-[600px] divide-y divide-gray-200 border border-gray-200 rounded overflow-y-auto">
          {error ? (
            <p className="text-xl text-red-500 text-center">{error}</p>
          ) : (
            <div>
              {loading ? (
                <p className="py-5 text-center">Loading color lists...</p>
              ): (colors.map((color) => (
                <div
                  key={color.id}
                  className="flex justify-between items-center p-2"
                >
                  <span>{color.name}</span>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:bg-blue-900"
                    onClick={() => handleColorPreview(color)}
                  >
                    Preview
                  </button>
                </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3 sm:w-full px-4 md:mt-0 sm:mt-6 mt-6">
        <div className="flex flex-col">
          <h2 className="text-xl text-center font-bold mb-4">
            {selectedColor ? "Selected Color" : "Select a color to preview."}
          </h2>
          <div
            className={`flex flex-col w-full h-[320px] border rounded items-center justify-center ` + (selectedColor ? getTextColor(selectedColor.hex_code) : 'text-black')}
            style={selectedColor ? { backgroundColor:"#" + selectedColor.hex_code } : {}}
          >
            <p className="py-1">
              name: {selectedColor ? selectedColor.name : "undefined"}
            </p>
            <p className="py-1">
              hex: {selectedColor ? selectedColor.hex_code : "undefined"}
            </p>
            <p className="py-1">
              color code: {selectedColor ? selectedColor.color_code : "undefined"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPreviewer;

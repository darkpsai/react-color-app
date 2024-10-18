import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ColorPreviewer from "./components/ColorPreviewer";

function App() {
  return (
    <main>
      <div className="px-4">
        <ColorPreviewer />
      </div>
    </main>
  );
}

export default App;

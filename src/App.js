import { useState } from "react";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";

function App() {
  const [newGreeting, setNewGreeting] = useState("Hello");
  return (
    <div className="App">
      <Navbar />
      <Home newGreeting={newGreeting} setNewGreeting={setNewGreeting} />
    </div>
  );
}

export default App;

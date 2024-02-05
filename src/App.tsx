import { BrowserRouter, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes></Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

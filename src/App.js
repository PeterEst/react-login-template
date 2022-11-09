import "./App.css";
import Login from "./views/LoginScreen/LoginScreen";
import Home from "./views/HomeScreen/HomeScreen";
import Register from "./views/RegisterScreen/RegisterScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

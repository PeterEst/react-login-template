import "./App.css";
import Login from "./views/LoginScreen/LoginScreen";
import Home from "./views/HomeScreen/HomeScreen";
import Register from "./views/RegisterScreen/RegisterScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

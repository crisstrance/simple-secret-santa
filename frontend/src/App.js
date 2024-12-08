import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa Router, Routes y Route
import "./index.css"; // Importamos los estilos
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <Router> {/* Envolvemos la app en Router */}
      <Navbar /> {/* Siempre visible, ya que está fuera de Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página principal */}
        {/* Puedes agregar más rutas aquí si es necesario */}
      </Routes>
    </Router>
  );
};

export default App;
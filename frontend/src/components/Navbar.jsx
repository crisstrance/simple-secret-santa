import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import SSS from "../assets/SSS.png"; // Asegúrate de que el nombre del archivo coincida

function Navbar() {

    const navigate = useNavigate(); // Usa el hook useNavigate

    const handleClick = () => {
        navigate("/"); // Navega a la página principal
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning" aria-label="Tenth navbar example">
            <div className="container">
                <span 
                    className="navbar-brand d-flex align-items-center" 
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                >
                    {/* Imagen al lado del texto */}
                    <img src={SSS} alt="Secret Santa" style={{ width: "50px", marginRight: "10px" }} />
                    <h1 className="text-center text-dark fw-bold mb-0">Simple Secret Santa</h1>
                </span>
            </div>
        </nav>
    );
}

export default Navbar;

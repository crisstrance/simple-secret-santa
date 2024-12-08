import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import injectContext from "./store/appContext.js";

// Inyecta el contexto global
const AppWithContext = injectContext(App);

// Selecciona el elemento raíz del DOM
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Crea el root con React 18

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <AppWithContext />
  </React.StrictMode>
);
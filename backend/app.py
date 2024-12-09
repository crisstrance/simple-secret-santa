from flask import Flask
from routes import *
from app import create_app  # Asegúrate de importar la función create_app

app = create_app()  # Usamos la factory para crear la app

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, send_from_directory
from routes import *
from app import create_app  # Asegúrate de importar la función create_app

app = create_app()  # Usamos la factory para crear la app

@app.route('/')
def serve_frontend():
    return send_from_directory('frontend/build', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('frontend/build', path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
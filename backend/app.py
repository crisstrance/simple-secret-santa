import os
from flask import Flask, send_from_directory
from routes import *
from app import create_app  # Asegúrate de importar la función create_app

def create_app():
    app = Flask(__name__)
    # Aquí configuramos el puerto con la variable de entorno `PORT` o por defecto el puerto 5000
    port = os.environ.get('PORT', 5000)

    # Ruta para servir la página principal de React
    @app.route('/')
    def serve_frontend():
        return send_from_directory('frontend/build', 'index.html')

    # Ruta para servir archivos estáticos como JS, CSS, imágenes, etc.
    @app.route('/<path:path>')
    def serve_static(path):
        return send_from_directory('frontend/build', path)
        
    app.run(host='0.0.0.0', port=port, debug=True)
    return app
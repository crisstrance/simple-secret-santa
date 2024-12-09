from flask import Flask, send_from_directory
from flask_cors import CORS

def create_app():
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
    CORS(app)  # Habilitar CORS para permitir conexiones cruzadas
    
    # Ruta para servir el archivo estático del frontend
    @app.route('/')
    def serve_frontend():
        return send_from_directory(app.static_folder, 'index.html')

    # Otras rutas de tu API
    from .routes import api
    app.register_blueprint(api, url_prefix='/api')

    return app

from flask import Flask, send_from_directory
from flask_cors import CORS

def create_app():
    # Inicializa la app Flask y define la carpeta estática para React
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

    # Configura CORS
    CORS(app)

    # Rutas para servir el frontend
    @app.route('/')
    def serve_frontend():
        return send_from_directory(app.static_folder, 'index.html')

    @app.route('/<path:path>')
    def serve_static_files(path):
        return send_from_directory(app.static_folder, path)

    # Registrar el Blueprint de la API
    from .routes import api
    app.register_blueprint(api, url_prefix='/api')

    return app

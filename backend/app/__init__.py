from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Configuramos CORS
    from .routes import api  # Importamos el Blueprint de las rutas
    app.register_blueprint(api, url_prefix='/api')  # Registramos el Blueprint con el prefijo

    return app
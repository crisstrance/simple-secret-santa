import os
from flask import Flask, send_from_directory

def create_app():
    app = Flask(__name__, static_folder='frontend/build', static_url_path='')

    # Configuramos el puerto con la variable de entorno `PORT`
    port = os.environ.get('PORT', 5000)

    # Ruta para servir la página principal de React
    @app.route('/')
    def serve_frontend():
        return send_from_directory('frontend/build', 'index.html')

    # Ruta para servir archivos estáticos como JS, CSS, imágenes, etc.
    @app.route('/<path:path>')
    def serve_static(path):
        return send_from_directory('frontend/build', path)

    # Inicia la app Flask en el puerto correcto
    app.run(host='0.0.0.0', port=port, debug=True)

    return app

from app import create_app
import os

# Inicializa la app Flask
app = create_app()

if __name__ == '__main__':
    # Usa el puerto especificado por Render o 5000 por defecto
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

from app import create_app

# Llama a la función para crear la aplicación
app = create_app()

# Ejecuta la aplicación
if __name__ == '__main__':
    import os
    # Obtén el puerto de las variables de entorno, usa 5000 como predeterminado
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

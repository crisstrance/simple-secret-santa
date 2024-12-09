from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/")
def home():
    return "¡Hola desde Flask!"

if __name__ == "__main__":
    app.run(debug=True)
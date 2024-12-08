import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from dotenv import load_dotenv

# Inicialización de Flask
app = Flask(__name__)

# Cargar variables de entorno desde .env
load_dotenv()
sender_email = os.getenv('SENDER_EMAIL')
sender_password = os.getenv('SENDER_PASSWORD')

# Configuración CORS
api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API

# Ruta para enviar el correo
@api.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()  # Obtenemos los datos de la solicitud
    recipient = data.get('recipient')  # El destinatario del correo
    subject = data.get('subject', 'Secret Santa Notification')  # Asunto (por defecto)
    body = data.get('body')  # Cuerpo del correo
    
    # Validamos que los datos sean correctos
    if not recipient or not body:
        return jsonify({"error": "Recipient and body are required"}), 400

    # Crear el mensaje
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Conexión SMTP con Gmail
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Establecer conexión segura
            server.login(sender_email, sender_password)  # Autenticarse
            text = msg.as_string()
            server.sendmail(sender_email, recipient, text)  # Enviar el correo

        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to send email: {str(e)}"}), 500

# Ruta de ejemplo
@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend"
    return response_body, 200

# Registramos el blueprint y arrancamos el servidor
app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)

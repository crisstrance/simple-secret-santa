import React, { useState } from "react";

// Función para enviar el correo
const sendEmail = async (recipient, body) => {
    const emailData = {
        recipient: recipient,
        body: body,  // Asegúrate de pasar HTML aquí
        subject: "Tu Secret Santa es....."
    };

    try {
        const response = await fetch('https://super-memory-7pj475v7v4vfwrjg-5000.app.github.dev/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Correo enviado:', result.message);
        } else {
            console.error('Error al enviar correo:', result.error);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};

function Home() {
    const [participants, setParticipants] = useState([
        { name: "", email: "" },
    ]);
    const [message, setMessage] = useState("");

    // Nuevos estados para el nombre del sorteo y el presupuesto
    const [raffleName, setRaffleName] = useState("");
    const [budget, setBudget] = useState("");

    // Maneja el cambio en los campos del formulario
    const handleInputChange = (index, e) => {
        const values = [...participants];
        values[index][e.target.name] = e.target.value;
        setParticipants(values);
    };

    const handleAddParticipant = () => {
        setParticipants([...participants, { name: "", email: "" }]);
    };

    const handleRemoveParticipant = (index) => {
        const values = [...participants];
        values.splice(index, 1);
        setParticipants(values);
    };

    const handleSort = () => {
        const shuffledParticipants = [...participants];
        shuffleArray(shuffledParticipants);

        const shuffledResults = shuffledParticipants.map((participant, index) => {
            let assigned = shuffledParticipants[index === shuffledParticipants.length - 1 ? 0 : index + 1];
            return {
                ...participant,
                assignedTo: assigned,
            };
        });

        setResults(shuffledResults);

        // Enviar correos con los resultados y los datos personalizados
        shuffledResults.forEach((result) => {
            const emailBody = `
                <h2>¡Hola ${result.name}!</h2>
                <p>Te ha tocado a <strong>${result.assignedTo.name}</strong> en el sorteo de <strong>${raffleName}</strong>.</p>
                <p>El presupuesto estimado para el regalo es: <strong>$${budget}€</strong></p>
                <p>Ahora es tu oportunidad de sorprenderlo con un regalo especial. ¡Hazlo con mucho cariño!</p>
                <p>🎁 ¡Ve a buscar su regalo! 🎉</p>
                <p>Recuerda que lo importante es disfrutar del momento y compartir alegría. 😄</p>
                <p>¡Feliz Navidad y que tengas unas fiestas maravillosas! 🎄</p>
                <p>Saludos,<br/>El equipo de Amigo Invisible</p>
            `;
            sendEmail(result.email, emailBody);
        });

        setMessage("Sorteo realizado y correos enviados");
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    return (
        <div className="container mt-4">
            <h1>Sorteo de Amigo Invisible</h1>
            <p>Agrega todos los participantes ingresando el Nombre y el Correo Electronico para realizar el sorteo</p>

            <div className="container">
                {/* Campo para el nombre del sorteo */}
                <div className="row align-items-center mb-3">

                    <div className="input-group flex-nowrap">
                        <span className="input-group-text fw-bold" id="addon-wrapping">Nombre del Sorteo</span>
                        <input
                            type="text"
                            className="mx-auto form-control"
                            id="raffleName"
                            value={raffleName}
                            onChange={(e) => setRaffleName(e.target.value)}
                            placeholder="Ej. Amigo Invisible Navidad 2024"
                            required
                        />
                    </div>
                </div>

                {/* Campo para el presupuesto estimado */}
                <div className="row align-items-center mb-3">

                    <div className="input-group flex-nowrap">
                        <span className="input-group-text fw-bold" id="addon-wrapping">Presupuesto Estimado</span>
                        <input
                            type="number"
                            className="form-control"
                            id="budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Ej. 20"
                            required
                        />
                        <span className="input-group-text">€</span>
                    </div>
                </div>
            </div>

            <form>
                {participants.map((participant, index) => (
                    <div className="card p-2 mb-3 text-light fw-bold" key={index} style={{ backgroundColor: "#054f63" }}>
                        <div className="container">
                            <label htmlFor={`name-${index}`} className="form-label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control mb-1"
                                id={`name-${index}`}
                                name="name"
                                value={participant.name}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />
                            <label htmlFor={`email-${index}`} className="form-label">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id={`email-${index}`}
                                name="email"
                                value={participant.email}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />

                            <button
                                type="button"
                                className="btn mt-2 text-light float-end"
                                style={{ backgroundColor: "#910115" }}
                                onClick={() => handleRemoveParticipant(index)}
                            >
                                <i className="fa-solid fa-user-xmark"></i> Eliminar
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    className="btn text-light float-end"
                    style={{ backgroundColor: "#007a0c" }}
                    onClick={handleAddParticipant}
                >
                    <i className="fa-solid fa-user-plus"></i> Agregar participante
                </button>

                <div className="mt-4">
                    <button type="button" className="btn btn-warning fs-2" onClick={handleSort} >
                    <i className="fa-solid fa-shuffle"></i> Sortear
                    </button>
                </div>
            </form>


            {/* Mostrar el mensaje de éxito o error */}
            {message && <div className="alert alert-info mt-4">{message}</div>}
        </div>
    );
}

export default Home;

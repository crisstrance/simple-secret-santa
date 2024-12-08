const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			host: 'https://playground.4geeks.com/contact/agendas/cristian/contacts',
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
            
            getDailyQuote: async () => {
                try {
                  const response = await fetch(store.host); // URL del endpoint
                  if (!response.ok) throw new Error("No se pudo obtener la frase");
                  const data = await response.json();
              
                  // Supongamos que el backend devuelve un objeto con una propiedad 'quote'
                  return data.quote || "Hoy no hay frase disponible.";
                } catch (error) {
                  console.error("Error al obtener la frase del día:", error);
                  return "Error al obtener la frase. Inténtalo más tarde.";
                }
              },

		}
	};
};

export default getState;
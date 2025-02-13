import { API_ENDPOINTS } from './endpoints.js';

export const fetchData = async (endpoint, method, data) => {
    try {
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        };

        if (method === 'POST') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(API_ENDPOINTS[endpoint], options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const deleteWork = async (workId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.error("Erreur : Aucun token trouvé.");
        alert("Vous devez être connecté pour supprimer un projet.");
        return;
    }

    try {
        const response = await fetch(`${API_ENDPOINTS.WORKS}/${workId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Vérifier si le token est bien envoyé
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Échec de la suppression (Status: ${response.status})`);
        }

        return response.status === 204 ? {} : await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        throw error;
    }
};

export const loginUser = (data) => fetchData('LOGIN', 'POST', data);
export const getCategories = () => fetchData('CATEGORIES');
export const getWorks = () => fetchData('WORKS');
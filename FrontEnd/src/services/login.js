import { API_ENDPOINTS } from './endpoints.js';

const API_BASE_URL = "http://localhost:5678/api";

/**
 * Function Login user
 */
export const loginUser = async (email, password) => {
    const data = { email, password };
    try {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
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
}

/**
 * Function initialize login
 */
export const initializeLogin = () => {
    const loginForm = document.querySelector("#login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            try {
                const response = await loginUser(email, password);

                if (response.token) {
                    localStorage.setItem("authToken", response.token);
                    sessionStorage.setItem("admin", "true"); // Définir le mode admin après connexion
                    window.location.href = "../../index.html";
                } else {
                    alert("Connexion réussie, mais aucun token reçu.");
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                const existingError = document.querySelector(".error");
                if (existingError) {
                    existingError.remove();
                }
                const loginError = document.createElement("div");
                loginError.classList.add("error");
                loginError.textContent = "Identifiants incorrects. Veuillez réessayer.";
                loginForm.appendChild(loginError);
            }
        });
    }
};
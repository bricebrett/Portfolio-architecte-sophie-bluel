import { loginUser } from "./api.js";
import { displayErrorMessage } from "../utils/errorUtils.js";

/**
 * Function initialize login
 */
export const initializeLogin = () => {
    const loginForm = document.querySelector("#login-form");
    const connectionBtn = document.querySelector("#connection-btn");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            try {
                const response = await loginUser( { email, password } );

                if (response.token) {
                    localStorage.setItem("authToken", response.token);
                    sessionStorage.setItem("admin", "true");
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
                displayErrorMessage(connectionBtn, "Identifiants incorrects. Veuillez réessayer.");
            }
        });
    }
};
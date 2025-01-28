import { addCategories } from './components/categories.js';
import { getCategories, getWorks } from './services/api.js';
import { addWorks } from './components/works.js';
import { filterWorksByCategory } from './components/filters.js';
import { loginUser } from './services/api.js';
// import { initializeLogin } from './components/login.js';

/**
 * Function handle events
 */
const initializeEvents = (works) => {
    const categoryButtons = document.querySelectorAll(".btn-categorie");
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const categoryId = button.getAttribute("data-category-id");
            filterWorksByCategory(works, categoryId);
        });
    });

    const allButton = document.getElementById("btnTous");
    if (allButton) {
        allButton.addEventListener("click", () => {
            addWorks(works);
        });
    }
};

/**
 * Function initialize login
 */
const initializeLogin = () => {
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
                    window.location.href = "../../index.html";
                } else {
                    alert("Connexion réussie, mais aucun token reçu.");
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                alert("Identifiants incorrects. Veuillez réessayer.");
            }
        });
    }
};


/**
 * Function initialize app
 */
const initializeApp = async () => {
    try {
        if (document.querySelector("#login-form")) {
            initializeLogin();
            return;
        }
        const categoriesContainer = document.getElementById("categories");
        if (categoriesContainer) {
            const categories = await getCategories();
            addCategories(categories);
        }
        const worksContainer = document.querySelector(".gallery");
        if (worksContainer) {
            const works = await getWorks();
            addWorks(works);
            initializeEvents(works);
        }
    } catch (error) {
        console.error("Error initializing app:", error);
    }
};

initializeApp();


import { initializeLogin } from './services/login.js';
import { addCategories } from './components/categories.js';
import { getCategories, getWorks } from './services/api.js';
import { addWorks } from './components/works.js';
import { initializeFilters } from './components/filters.js';
import { initializeAdminMode } from './services/admin.js';
import { initializeModal } from './components/modal.js';

/**
 * Fonction pour initialiser l'application.
 */
const initializeApp = async () => {
    try {
        if (document.querySelector("#login-form")) {
            initializeLogin();
            return;
        }
        initializeAdminMode();

        const categories = await getCategories();
        addCategories(categories);

        const works = await getWorks();
        addWorks(works);
        initializeFilters(works);

        const openModalButton = document.querySelector("#openModal");
        if (openModalButton) {
            openModalButton.addEventListener("click", openModal);
        }
    } catch (error) {
        console.error("Error initializing app:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
    const token = localStorage.getItem("authToken");
    if (token) {
        initializeModal();
    }
});
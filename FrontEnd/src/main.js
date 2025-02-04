import { initializeLogin } from './services/login.js';
import { addCategories } from './components/categories.js';
import { getCategories, getWorks } from './services/api.js';
import { addWorks } from './components/works.js';
import { initializeFilters } from './components/filters.js';
import { initializeAdminMode } from './services/admin.js';
import { initializeModal } from './components/modal.js';

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

    const allButton = document.querySelector("#btnAll");
    if (allButton) {
        allButton.addEventListener("click", () => {
            addWorks(works);
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
        initializeAdminMode();

        const categories = await getCategories();
        addCategories(categories);

        const works = await getWorks();
        addWorks(works);
        initializeFilters(works);

        // Initialize modal
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
    initializeModal();
});
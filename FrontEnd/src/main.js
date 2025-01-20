import { addCategories } from './components/categories.js';
import { getCategories, getWorks } from './services/api.js';
import { addWorks } from './components/works.js';
import { filterWorksByCategory } from './components/filters.js';

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
 * Function initialize app
 */
const initializeApp = async () => {
    try {
        const categories = await getCategories();
        addCategories(categories);

        const works = await getWorks();
        addWorks(works);

        initializeEvents(works);
    } catch (error) {
        console.error("Error initializing app:", error);
    }
};

initializeApp();
import { addCategories } from './components/categories.js';
import { getCategories } from './services/api.js';

const initializeApp = async () => {
    try {
        const categories = await getCategories();
        addCategories(categories);
    } catch (error) {
        console.error("Error initializing app:", error);
    }
};

initializeApp();
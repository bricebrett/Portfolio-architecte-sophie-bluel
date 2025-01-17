import { addCategories } from './components/categories.js';
import { getCategories } from './services/api.js';

import { getWorks } from './services/api.js';
import { addWorks } from './components/works.js';

const initializeApp = async () => {
    try {
        const categories = await getCategories();
        addCategories(categories);
        const works = await getWorks();
        addWorks(works);
    } catch (error) {
        console.error("Error initializing app:", error);
    }
};

initializeApp();
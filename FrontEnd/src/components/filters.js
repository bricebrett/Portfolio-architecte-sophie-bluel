import { addWorks } from './works.js';

export const filterWorksByCategory = (works, categoryId) => {
    const filteredWorks = works.filter(work => work.categoryId == categoryId);
    addWorks(filteredWorks);
};
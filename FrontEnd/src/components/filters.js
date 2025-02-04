import { addWorks } from './works.js';

export const filterWorksByCategory = (works, categoryId) => {
    return works.filter(work => work.categoryId == categoryId);
};

export const initializeFilters = (works) => {
    document.querySelectorAll('.btn-categorie').forEach(button => {
        button.addEventListener('click', (event) => {
            const categoryId = event.target.dataset.categoryId;
            const filteredWorks = filterWorksByCategory(works, categoryId);
            addWorks(filteredWorks);
        });
    });
    const allButton = document.getElementById('btnAll');
    if (allButton) {
        allButton.addEventListener('click', () => {
            addWorks(works);
        });
    }
};
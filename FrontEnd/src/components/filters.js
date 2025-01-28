import { addWorks } from './works.js';

export const filterWorksByCategory = (works, categoryId) => {
    const filteredWorks = works.filter(work => work.categoryId == categoryId);
    addWorks(filteredWorks);
};

export const initializeFilters = (works) => {
    document.querySelectorAll('.btn-categorie').forEach(button => {
        button.addEventListener('click', (event) => {
            const categoryId = event.target.dataset.categoryId;
            filterWorksByCategory(works, categoryId);
        });
    });
    const allButton = document.getElementById('btnAll');
    if (allButton) {
        allButton.addEventListener('click', () => {
            addWorks(works);
        });
    }
};
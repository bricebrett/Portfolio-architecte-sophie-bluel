import { addWorks } from './works.js';

export const filterWorksByCategory = (works, categoryId) => {
    const filteredWorks = works.filter(work => work.categoryId == categoryId);
    addWorks(filteredWorks);
};

// Ajoutez un écouteur d'événements pour les boutons de catégorie
document.querySelectorAll('.btn-categorie').forEach(button => {
    button.addEventListener('click', (event) => {
        const categoryId = event.target.dataset.categoryId;
        const works = Array.from(document.querySelectorAll('.work')).map(workElement => ({
            id: workElement.dataset.id,
            categoryId: workElement.dataset.categoryId,
            imageUrl: workElement.querySelector('img').src,
            title: workElement.querySelector('.work-info h3').textContent
        }));
        filterWorksByCategory(works, categoryId);
    });
});
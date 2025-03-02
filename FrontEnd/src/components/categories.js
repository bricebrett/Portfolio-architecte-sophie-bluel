/**
 * Ajoute les catégoris à l'HTML.
 * */ 
export const addCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories");
    categories.forEach(category => {
        const categoryBtn = document.createElement("button");
        categoryBtn.textContent = category.name;
        categoryBtn.classList.add("btn-categorie");
        categoryBtn.setAttribute("data-category-id", category.id);
        categoriesContainer.appendChild(categoryBtn);
    });
};
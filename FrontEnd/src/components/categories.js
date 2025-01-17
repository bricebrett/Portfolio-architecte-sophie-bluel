/**
 * Function add categories to HTML
 * */ 
export const addCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories");
    categories.forEach(category => {
        const categoryBtn = document.createElement("btn");
        categoryBtn.textContent = category.name;
        categoryBtn.classList.add("btn-categorie");
        categoriesContainer.appendChild(categoryBtn);
    });
};
  
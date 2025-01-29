/**
 * Function to handle admin mode visibility
 */
export const initializeAdminMode = () => {
    const isAdmin = sessionStorage.getItem("admin") === "true";
    const categories = document.getElementById("categories");
    const adminModeBtn = document.getElementById("adminMode");
    const loginNavItem = document.getElementById("login"); // Sélection correcte du bouton Login

    if (isAdmin) {
        // Cacher les catégories et afficher "Modifier"
        if (categories) categories.style.display = "none";
        if (adminModeBtn) adminModeBtn.style.display = "flex";

        // Modifier le bouton Login en Logout
        if (loginNavItem) {
            loginNavItem.innerHTML = `<a href="#" id="logout">logout</a>`;
            document.getElementById("logout").addEventListener("click", function () {
                sessionStorage.removeItem("admin"); // Supprimer le mode admin
                localStorage.removeItem("authToken"); // Supprimer le token
                location.reload(); // Recharger la page
            });
        }
    }
};
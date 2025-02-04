/**
 * Function handle admin
 */
export const initializeAdminMode = () => {
    const isAdmin = sessionStorage.getItem("admin") === "true";
    const categories = document.getElementById("categories");
    const modifyBtn = document.getElementById("modifyBtn");
    const loginNavItem = document.getElementById("login");

    if (isAdmin) {
        if (categories) categories.style.display = "none";
        if (modifyBtn) modifyBtn.style.display = "flex";

        if (loginNavItem) {
            loginNavItem.innerHTML = `<a href="#" id="logout">logout</a>`;
            document.getElementById("logout").addEventListener("click", function () {
                sessionStorage.removeItem("admin");
                localStorage.removeItem("authToken");
                location.reload();
            });
        }
    }
};
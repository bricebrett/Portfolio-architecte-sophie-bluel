import { getWorks, deleteWork } from "../services/api.js";
import { removeWorkFromDOM } from "../components/works.js";

export const initializeModal = async () => {
    const modifyBtn = document.querySelector("#modify-btn");
    const modal = document.querySelector("#modal");
    const modalAdd = document.querySelector("#modalAdd"); // La deuxième modal
    const overlay = document.querySelector(".modal-overlay");
    const closeModalBtn = document.querySelector(".js-modal-close");
    const modalGallery = document.querySelector("#modal-gallery");
    const addPhotoBtn = document.querySelector("#new-photo"); // Bouton "Ajouter une photo"
    const backBtn = document.querySelector(".js-modal-back"); // Bouton de retour

    const openModal = async () => {
        if (modal && overlay) {
            modal.style.display = "block";
            overlay.style.display = "block";
            await loadWorksInModal();
        }
    };

    const closeModal = () => {
        if (modal && overlay) {
            modal.style.display = "none";
            overlay.style.display = "none";
        }
        if (modalAdd) {
            modalAdd.style.display = "none";
        }
    };

    const openAddPhotoModal = () => {
        if (modal) modal.style.display = "none";
        if (modalAdd) modalAdd.style.display = "block";
    };

    const backToGalleryModal = () => {
        if (modalAdd) modalAdd.style.display = "none";
        if (modal) modal.style.display = "block";
    };

    const loadWorksInModal = async () => {
        modalGallery.innerHTML = "";
        try {
            const works = await getWorks();
            works.forEach(work => {
                const imgElement = document.createElement("img");
                imgElement.src = work.imageUrl;
                imgElement.alt = work.title;
                imgElement.classList.add("modal-image");

                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete-work");
                deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
                deleteBtn.dataset.id = work.id;

                deleteBtn.addEventListener("click", async () => {
                    await handleDeleteWork(work.id);
                });

                const workContainer = document.createElement("div");
                workContainer.classList.add("modal-work-container");
                workContainer.dataset.id = work.id;
                workContainer.appendChild(imgElement);
                workContainer.appendChild(deleteBtn);

                modalGallery.appendChild(workContainer);
            });
        } catch (error) {
            console.error("Erreur lors du chargement des travaux :", error);
        }
    };

    const handleDeleteWork = async (workId) => {
        try {
            await deleteWork(workId);
    
            removeWorkFromDOM(workId);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    if (modifyBtn) modifyBtn.addEventListener("click", openModal);
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (addPhotoBtn) addPhotoBtn.addEventListener("click", openAddPhotoModal);
    if (backBtn) backBtn.addEventListener("click", backToGalleryModal);
};
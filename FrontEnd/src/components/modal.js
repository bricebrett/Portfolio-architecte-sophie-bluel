import { getWorks } from "../services/api.js";

export const initializeModal = async () => {
    const modifyBtn = document.querySelector("#modifyBtn");
    const modal = document.querySelector("#modal");
    const overlay = document.querySelector(".modal-overlay");
    const closeModalBtn = document.querySelector(".js-modal-close");
    const modalGallery = document.querySelector("#modal-gallery");

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

                const workContainer = document.createElement("div");
                workContainer.classList.add("modal-work-container");
                workContainer.appendChild(imgElement);
                workContainer.appendChild(deleteBtn);

                modalGallery.appendChild(workContainer);
            });
            console.log("✅ Travaux chargés dans la modale !");
        } catch (error) {
            console.error("Erreur lors du chargement des travaux :", error);
        }
    };

    if (modifyBtn) {
        modifyBtn.addEventListener("click", openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }
};
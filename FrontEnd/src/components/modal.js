import { getWorks, deleteWork, getCategories } from "../services/api.js";
import { removeWorkFromDOM } from "../components/works.js";
import { API_ENDPOINTS } from "../services/endpoints.js";
import { displayErrorMessage } from "../utils/errorUtils.js";

export const initializeModal = async () => {
    const modifyBtn = document.querySelector("#modify-btn");
    const modal = document.querySelector("#modal");
    const modalAdd = document.querySelector("#modalAdd");
    const overlay = document.querySelector(".modal-overlay");
    const closeModalBtn = document.querySelector(".js-modal-close");
    const modalGallery = document.querySelector("#modal-gallery");
    const addPhotoBtn = document.querySelector("#new-photo");
    const backBtn = document.querySelector(".js-modal-back");

    const openModal = async () => {
        if (modal && overlay) {
            modal.style.display = "block";
            overlay.style.display = "block";
            await loadWorksInModal();
        }
    };

    const closeModal = (event) => {
        if (event && event.target === modal || event && event.target === modalAdd) {
            if (modal) modal.style.display = "none";
            if (modalAdd) modalAdd.style.display = "none";
            overlay.style.display = "none";
            clearModalFields();
            return;
        }
    
        if (event && event.target.classList.contains("js-modal-close")) {
            if (modal) modal.style.display = "none";
            if (modalAdd) modalAdd.style.display = "none";
            overlay.style.display = "none";
            clearModalFields();
        }
    };

    const categorySelect = async () => {
        const categorySelect = document.querySelector("#categoryContent");
    
        if (!categorySelect) return;
    
        try {
            const categories = await getCategories();
            categorySelect.innerHTML = "";
    
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erreur lors du chargement des catégories :", error);
        }
    };

    const previewSelectedImage = () => {
        const fileInput = document.querySelector("#file-upload");
        const uploadZone = document.querySelector(".upload-zone");
        const existingPreviewImage = document.querySelector(".preview-image");
        const allowedFormats = ["image/jpeg", "image/png"];
        const maxSize = 4 * 1024 * 1024;
    
        if (existingPreviewImage) {
            existingPreviewImage.remove();
        }
    
        const previewImage = document.createElement("img");
        previewImage.classList.add("preview-image");
        previewImage.style.maxWidth = "129px";
        previewImage.style.maxHeight = "169px";
        previewImage.style.objectFit = "cover";
        previewImage.style.display = "none";
    
        uploadZone.appendChild(previewImage);
    
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
    
            if (!file) return;
    
            if (!allowedFormats.includes(file.type)) {
                error("Le format de l'image n'est pas valide.");
                fileInput.value = "";
                return;
            }
    
            if (file.size > maxSize) {
                error("L'image ne doit pas dépasser 4 Mo.");
                fileInput.value = "";
                return;
            }
    
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
    
                document.querySelector(".fa-image").style.display = "none";
                document.querySelector(".file-label").style.display = "none";
                document.querySelector(".upload-zone p").style.display = "none";
            };
            reader.readAsDataURL(file);
        });
    };

    const openAddPhotoModal = () => {
        const modalAdd = document.querySelector("#modalAdd");
        if (modalAdd) {
            modalAdd.style.display = "block";
            categorySelect();
            previewSelectedImage();
        }
    };

    const backToGalleryModal = () => {
        const modalAdd = document.querySelector("#modalAdd");
        const modal = document.querySelector("#modal");
    
        if (modalAdd) modalAdd.style.display = "none";
        if (modal) modal.style.display = "block";
    
        clearModalFields();
    };

    const clearModalFields = () => {
        document.querySelector("#file-upload").value = ""; 
        document.querySelector("#titleContent").value = ""; 
        document.querySelector("#categoryContent").selectedIndex = 0; 
        
    
        document.querySelector(".fa-image").style.display = "block";
        document.querySelector(".file-label").style.display = "block";
        document.querySelector(".upload-zone p").style.display = "block";
    
        const existingPreviewImage = document.querySelector(".preview-image");
        if (existingPreviewImage) {
            existingPreviewImage.remove();
        }

        if (document.querySelector(".error-message")) {
            document.querySelectorAll(".error-message").forEach(error => error.remove());
        }
    
        const submitButton = document.querySelector("#submit-photo");
        submitButton.classList.remove("active");
        submitButton.style.backgroundColor = "#A7A7A7";
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

    const validateForm = () => {
        const fileInput = document.querySelector("#file-upload");
        const titleInput = document.querySelector("#titleContent");
        const categorySelect = document.querySelector("#categoryContent");
        const submitButton = document.querySelector("#submit-photo");
    
        if (fileInput.files.length > 0 && titleInput.value.trim() !== "" && categorySelect.value !== "") {
            submitButton.classList.add("active");
            submitButton.style.backgroundColor = "#1D6154";
        } else {
            submitButton.classList.remove("active");
            submitButton.style.backgroundColor = "#A7A7A7";
        }
    };

    const submitNewWork = async (event) => {
        event.preventDefault();
    
        const fileInput = document.querySelector("#file-upload");
        const titleInput = document.querySelector("#titleContent");
        const categorySelect = document.querySelector("#categoryContent");


        if (!fileInput.files[0] || titleInput.value.trim() === "" || categorySelect.value === "") {
            displayErrorMessage(categorySelect, "Tous les champs sont requis.", true);
        }
    
        const formData = new FormData();
        formData.append("image", fileInput.files[0]);
        formData.append("title", titleInput.value.trim());
        formData.append("category", categorySelect.value);
    
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Vous devez être connecté pour ajouter un projet.");
            return;
        }
    
        try {
            const response = await fetch(API_ENDPOINTS.WORKS, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du travail.");
            }
    
            const newWork = await response.json();
    
            addNewWorkToDOM(newWork);
    
            closeModal();
            clearModalFields();
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
        }
    };
    
    document.querySelector("#submit-photo").addEventListener("click", (event) => {
        event.preventDefault();
        submitNewWork(event);
    });

    const addNewWorkToDOM = (work) => {
        const worksContainer = document.querySelector('#gallery');
    
        const workElement = document.createElement('div');
        workElement.classList.add('work');
        workElement.dataset.id = work.id;
        workElement.dataset.categoryId = work.category;
        workElement.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}" />
            <div class="work-info">
                <h3>${work.title}</h3>
            </div>
        `;
    
        worksContainer.appendChild(workElement);
    
        const modalGallery = document.querySelector("#modal-gallery");
        if (modalGallery) {
            const workContainer = document.createElement("div");
            workContainer.classList.add("modal-work-container");
            workContainer.dataset.id = work.id;
    
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
    
            workContainer.appendChild(imgElement);
            workContainer.appendChild(deleteBtn);
            modalGallery.appendChild(workContainer);
        }
    };
    
    document.querySelector("#file-upload").addEventListener("change", validateForm);
    document.querySelector("#titleContent").addEventListener("input", validateForm);
    document.querySelector("#categoryContent").addEventListener("change", validateForm);
    document.querySelectorAll(".js-modal-close").forEach(button => { button.addEventListener("click", closeModal) });

    if (modifyBtn) modifyBtn.addEventListener("click", openModal);
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (addPhotoBtn) addPhotoBtn.addEventListener("click", openAddPhotoModal);
    if (backBtn) backBtn.addEventListener("click", backToGalleryModal);
    if (overlay) overlay.addEventListener("click", closeModal);
};
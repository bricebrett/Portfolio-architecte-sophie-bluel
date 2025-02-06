/**
 * Function add works to HTML
 */
export const addWorks = (works) => {
    const worksContainer = document.querySelector('#gallery');
    worksContainer.innerHTML = '';
    works.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work');
        workElement.dataset.id = work.id;
        workElement.dataset.categoryId = work.categoryId;
        workElement.innerHTML = `
            <img src='${work.imageUrl}' alt='${work.title}' />
            <div class='work-info'>
                <h3>${work.title}</h3>
            </div>
        `;
        worksContainer.appendChild(workElement);
    });
}

export const removeWorkFromDOM = (workId) => {
    const workElement = document.querySelector(`#gallery [data-id="${workId}"]`);
    if (workElement) {
        workElement.remove();
    }

    const modalElement = document.querySelector(`#modal-gallery .modal-work-container[data-id="${workId}"]`);
    if (modalElement) {
        modalElement.remove();
    }
};






/**
 * Function add works to HTML
 * */ 
export const addWorks = (works) => {
    const worksContainer = document.querySelector('#gallery');
    worksContainer.innerHTML = '';
    works.forEach( work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work');
        workElement.innerHTML = `
        <img src='${work.imageUrl}' alt='${work.title}' />
        <div class='work-info'>
            <h3>${work.title}</h3>
        </div>
        `;
    worksContainer.appendChild(workElement);
    });
}

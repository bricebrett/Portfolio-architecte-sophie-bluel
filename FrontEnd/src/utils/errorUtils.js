export const displayErrorMessage = (element, message, globalMessage = false) => {

    let existingError = element.parentElement.querySelector(".error-message");
    if (existingError) {
        existingError.textContent = message;
        return;
    }

    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    errorSpan.style.color = "red";
    errorSpan.style.marginTop = "15px";
    errorSpan.style.marginBottom = "15px";
    errorSpan.style.padding = "10px";
    errorSpan.style.backgroundColor = "#F8D7DA";
    errorSpan.style.textAlign = "center";
    errorSpan.style.borderRadius = "3px";
    errorSpan.textContent = message;

    if (globalMessage) {
        element.parentElement.appendChild(errorSpan);
    } else {
        element.insertAdjacentElement("afterend", errorSpan);
    }
};
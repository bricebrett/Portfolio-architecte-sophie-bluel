// /**
//  * Function Login user
//  */
// export const loginUser = async (email, password) => {
//     const url = `${API_BASE_URL}/users/login`;
//     const data = { email, password };
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json();
//         console.log(json);
//         return json;
//     } catch (error) {
//         console.error(error.message);
//         throw error;
//     }
// }

// /**
//  * Function initialize login
//  */
// export const initializeLogin = () => {
//     const loginForm = document.querySelector("#login-form");
//     if (loginForm) {
//         loginForm.addEventListener("submit", async (event) => {
//             event.preventDefault();

//             const email = document.querySelector("#email").value;
//             const password = document.querySelector("#password").value;

//             try {
//                 const response = await loginUser(email, password);

//                 if (response.token) {
//                     localStorage.setItem("authToken", response.token);
//                     window.location.href = "../../index.html";
//                 } else {
//                     alert("Connexion réussie, mais aucun token reçu.");
//                 }
//             } catch (error) {
//                 console.error("Erreur lors de la connexion :", error);
//                 alert("Identifiants incorrects. Veuillez réessayer.");
//             }
//         });
//     }
// };
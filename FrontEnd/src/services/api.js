const API_BASE_URL = "http://localhost:5678/api";

export const getCategories = async () => {
    const url = `${API_BASE_URL}/categories`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
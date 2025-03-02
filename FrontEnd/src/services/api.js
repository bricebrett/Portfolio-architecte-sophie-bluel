import { API_ENDPOINTS } from './endpoints.js';

/**
 * Fonction générique pour effectuer des requêtes API.
 */
export const fetchData = async (endpoint, method, data = null) => {
    try {
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        };

        const token = localStorage.getItem("authToken");
        if (token) {
            options.headers["Authorization"] = `Bearer ${token}`;
        }

        let url = API_ENDPOINTS[endpoint];
        if (method === 'DELETE' && data) {
            url = `${url}/${data}`;
        } else if (data && method !== 'DELETE') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return response.status === 204 ? {} : await response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};


export const deleteWork = (workId) => fetchData('WORKS', 'DELETE', workId);
export const loginUser = (data) => fetchData('LOGIN', 'POST', data);
export const getCategories = () => fetchData('CATEGORIES');
export const getWorks = () => fetchData('WORKS');
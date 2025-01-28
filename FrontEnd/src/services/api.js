import { API_ENDPOINTS } from './endpoints.js';

export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(API_ENDPOINTS[endpoint]);
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

export const getCategories = () => fetchData('CATEGORIES');
export const getWorks = () => fetchData('WORKS');
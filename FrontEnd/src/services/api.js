import { API_ENDPOINTS } from './endpoints.js';

export const fetchData = async (endpoint, method, data) => {
    try {
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        };

        if (method === 'POST') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(API_ENDPOINTS[endpoint], options);
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

export const loginUser = (data) => fetchData('LOGIN', 'POST', data);
export const getCategories = () => fetchData('CATEGORIES');
export const getWorks = () => fetchData('WORKS');
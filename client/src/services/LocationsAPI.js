// client/src/services/LocationsAPI.js
const API_URL = 'http://localhost:3000/api/locations';

const getAllLocations = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error fetching locations:", error);
    }
};

const getLocationById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching location ${id}:`, error);
    }
};

export default {
    getAllLocations,
    getLocationById
};
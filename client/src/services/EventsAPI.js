// client/src/services/EventsAPI.js
const API_URL = 'http://localhost:3000/api/events';

const getAllEvents = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error fetching events:", error);
    }
};

const getEventsByLocationId = async (locationId) => {
    try {
        const response = await fetch(`${API_URL}/location/${locationId}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching events for location ${locationId}:`, error);
    }
};

export default {
    getAllEvents,
    getEventsByLocationId
};
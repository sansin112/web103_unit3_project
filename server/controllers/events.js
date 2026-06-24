// server/controllers/events.js
import { pool } from '../config/database.js';

export const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY date ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const getEventsByLocation = async (req, res) => {
    try {
        const { locationId } = req.params;
        const results = await pool.query('SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC', [locationId]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};
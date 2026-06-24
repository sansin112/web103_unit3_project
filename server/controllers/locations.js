// server/controllers/locations.js
import { pool } from '../config/database.js';

export const getLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await pool.query('SELECT * FROM locations WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};
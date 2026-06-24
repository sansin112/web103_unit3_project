// server/routes/events.js
import express from 'express';
import { getEvents, getEventsByLocation } from '../controllers/events.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/location/:locationId', getEventsByLocation);

export default router;
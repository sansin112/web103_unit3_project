// server/server.js
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import cors from 'cors'; // Added for Cross-Origin matching

// Import the routers from your routes files
import locationRouter from './routes/locations.js';
import eventRouter from './routes/events.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()); // Allows our React frontend to securely fetch data
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')));
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')));
    app.use(express.static('public'));
}

// Specify the API path gateways for the server to use
app.use('/api/locations', locationRouter);
app.use('/api/events', eventRouter);

// Fallback routing for static single-page application generation
if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    );
} else {
    // Helpful root landing page when running locally in development mode
    app.get('/', (req, res) => {
        res.status(200).send('<h1 style="text-align: center; margin-top: 5rem; font-family: sans-serif;">⚡ Pokémon Show Center API Gateway is Live! ⚡</h1>');
    });
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
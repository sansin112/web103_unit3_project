// server/config/reset.js
// server/config/reset.js
import dotenv from 'dotenv';
dotenv.config();

import { pool } from './database.js';

const createTablesQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        location_id INT REFERENCES locations(id) ON DELETE CASCADE
    );
`;

const seedDatabase = async () => {
    try {
        await pool.query(createTablesQuery);
        console.log('🎉 Pokémon Championship database refreshing with real event photography...');

        // 4 Real Major Championship Hubs with Convention-accurate assets
        const locationResult = await pool.query(`
            INSERT INTO locations (name, image, description) VALUES
            ('Moscone Center', 'https://s.hdnux.com/photos/01/54/24/30/28395037/3/1920x0.jpg', 'San Francisco, California. The ultimate convergence point for elite global standard bracket matches.'),
            ('Los Angeles Convention Center', 'https://www.laconventioncenter.com/assets/img/pokemon-championships-2026-thumb-c563bbc818.png', 'Hall A, Los Angeles, USA. Host venue for massive Western regional high-stakes TCG play.'),
            ('Indiana Convention Center', 'https://www.indystar.com/gcdn/-mm-/bb18997b6faae5fa4da3ae6965a1920cd176a612/c=0-232-3629-2279/local/-/media/Indianapolis/Indianapolis/2014/07/05/1404598116011-inidc5-6g16bu090kj32emlbw0-original.jpg?width=700&height=395&fit=crop&format=pjpg&auto=webp', 'Halls H & I, Indianapolis, USA. Mid-west competitive hotbed featuring the first live platform adjustments.'),
            ('Seattle Convention Center', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2sL6rpHdyEA9NGmG6uKflJEkqXl2zZQ4uyPOeI6PnQC7qIk5dpQQyhM&s=10', 'Halls 4ABCDEF, Seattle, USA. Pacific Northwest headquarters for official trading card league points.')
            RETURNING id, name;
        `);

        const locs = locationResult.rows;
        
        // Seeding exact 2026 matches linked to corresponding venue nodes
        const eventsQuery = `
            INSERT INTO events (title, date, description, image, location_id) VALUES
            ('2026 Pokémon World Championships', '2026-08-28 09:00:00', 'The absolute biggest tournament of the year! Invite-only masters and juniors brackets fighting for the global title.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87', $1),
            ('LA Regional Championships', '2026-05-08 08:00:00', 'A historical major regional cup gathering thousands of Masters division card slinging competitors.', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04', $2),
            ('Indianapolis Regional Championship', '2026-05-29 08:00:00', 'Official Championship Series circuit match awarding premium travel points and cash prizing limits.', 'https://images.unsplash.com/photo-1511578314322-379afb476865', $3),
            ('Seattle Regional Cup Kickoff', '2026-02-27 08:00:00', 'A highly competitive past bracket environment determining early winter regional invite points.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', $4);
        `;

        await pool.query(eventsQuery, [locs[0].id, locs[1].id, locs[2].id, locs[3].id]);
        console.log('✅ Real 2026 arena snapshots successfully pushed to Render.');
    } catch (err) {
        console.error('⚠️ Database seed initialization failed:', err);
    }
};

seedDatabase();
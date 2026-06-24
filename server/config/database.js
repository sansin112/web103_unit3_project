// server/config/database.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Clears out legacy environment memory to prevent connection conflicts
delete process.env.PGHOST;
delete process.env.PGUSER;
delete process.env.PGPASSWORD;
delete process.env.PGDATABASE;
delete process.env.PGPORT;

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false 
    }
};

export const pool = new pg.Pool(config);
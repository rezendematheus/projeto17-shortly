import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pg;

const configDatabase = {
    connectionString: 'postgres://postgres:postgres@localhost:5432/shortlydb',
};

if (process.env.MODE === "prod") configDatabase.ssl = true;

export const db = new Pool(configDatabase);
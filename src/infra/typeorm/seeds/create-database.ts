import 'dotenv/config';
import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

const createDatabase = async () => {
  await client.connect();
  await client.query(`DROP DATABASE ${process.env.DB_NAME};`);
  await client.query(`CREATE DATABASE ${process.env.DB_NAME};`);
  await client.end();
};

createDatabase();

import { configDotenv } from 'dotenv';

configDotenv();

export const BASE_URL = process.env.BASE_URL;
export const SECRET_KEY = process.env.SECRET_KEY;
export const PORT = process.env.PORT;

import { Pool } from "pg";

const pool = new Pool({
    user: 'nat',
    password: 'admin',
    database: 'bork',
    host: "localhost",
    port: 5432
})

export { pool };
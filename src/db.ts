import * as pg from "pg";

export const pgPool = new pg.Pool({ ssl: { rejectUnauthorized: false } });

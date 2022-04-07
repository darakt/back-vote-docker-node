import * as pg from "pg";


// we do that here to facilate the mock of the psql db
const { Pool } = pg.default;
const connectionString = "postgresql://postgres:postgres@db:5432/postgres"; // TODO: no hardcoding use envar
const pool = new Pool({
  connectionString,
});

export { pool };
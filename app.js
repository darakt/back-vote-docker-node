'use strict';
import "core-js/stable";
import "regenerator-runtime/runtime";
import "dotenv/config";
import express from "express";
import * as pg from "pg";
import voteController from './vote/voteController.js';
import cors from 'cors'

const PORT = 8080;
const HOST = '0.0.0.0';
const { Pool } = pg.default;

const connectionString = "postgresql://postgres:postgres@db:5432/postgres"; // TODO: no hardcoding
const pool = new Pool({
  connectionString,
});

const app = express();
app.use(cors);

app.get("/", voteController.get2RandomCharacters);



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

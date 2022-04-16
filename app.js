"use strict";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "dotenv/config";
import express from "express";
import * as pg from "pg";
import voteController from "./vote/voteController.js";
import cors from "cors";
import { addAsync } from '@awaitjs/express';

const PORT = 3002;
const HOST = "0.0.0.0";
const { Pool } = pg.default;

const connectionString = "postgresql://postgres:postgres@db:5432/postgres"; // TODO: no hardcoding
const pool = new Pool({
  connectionString,
});

const app = express();
app.get('/', express.json(), voteController.get2RandomCharacters) // dirty but wasn't working otherwise, TODO: improve


// app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// app.use(cors); before I couldn't use postman without that middleware, now it's breaking everything => confusion
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

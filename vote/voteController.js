import * as pg from "pg";
import { twoRandomNumbers } from "../helpers.js";
import voteService from "./voteService.js";

const { Pool } = pg.default;
console.log("Pool  ", Pool);
const connectionString = "postgresql://postgres:postgres@db:5432/postgres"; // TODO: no hardcoding use envar
const pool = new Pool({
  connectionString,
});

const voteController = {
  get2RandomCharacters: async (req, res) => {
    (async () => {
      try {
        const allIds = await voteService.getAllCandidatesIds(pool);
        let theIds = twoRandomNumbers(allIds);
        const twoCharacters = await voteService.getCandidatesById(theIds, pool);
        return res.json(twoCharacters);
      } catch (err) {
        return res.json(err)
      }
    })().catch((err) => console.log(err.stack)); //should be logged
  },
};

export default voteController;

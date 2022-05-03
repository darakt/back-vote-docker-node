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
    try {
      const allIds = await voteService.getAllTheCandidatesIds(pool);
      let theIds = twoRandomNumbers(allIds);
      const twoCharacters = await voteService.getCandidatesById(theIds, pool);
      return res.json(twoCharacters);
    } catch (err) {
      return res.json(err)
    }
},
  pick1Character: (req, res) => {
    try {
      console.log(req.body)
      res.json({status: "has voted"})
    } catch (err) {
      return res.json(err)
    }
  }
};

export default voteController;

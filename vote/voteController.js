import * as pg from "pg";
import { twoRandomNumbers } from "../helpers/helpers.js";
import voteService from "./voteService.js";
import tokenService from "../token/tokenService"

const { Pool } = pg.default;
const connectionString = "postgresql://postgres:postgres@db:5432/postgres"; // TODO: no hardcoding use envar
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


const voteController = {
  get2RandomCharacters: async (req, res) => {
    try {
      const allIds = await voteService.getAllTheCandidatesIds(pool);
      let theIds = twoRandomNumbers(allIds);
      const firstCharacter = await voteService.getACandidateById(
        theIds[0],
        pool
      );
      const secondCharacter = await voteService.getACandidateById(
        theIds[1],
        pool
      );

      const token = await tokenService.createToken(1, pool) //will change with auth
      return res.json({ characters: [...firstCharacter, ...secondCharacter], token });
    } catch (err) {
      return res.json(err)
    }
},
  pick1Character: async (req, res) => {
    try {
      let flag = await tokenService.validateToken(req.body.token, pool)
      if (flag) {
        let result = await voteService.createAVote(req.body.voter, req.body.voteFor, pool)
        return res.json({ status: "has voted" })
      }
      // a log maybe ?
      return res.status(403).json({ message: 'Invalid Token' })
    } catch (err) {
      return res.json(err)
    }
  }
};

export default voteController;

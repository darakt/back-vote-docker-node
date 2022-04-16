import { pool } from "../config.js"; // default size is 10
import { objectToArray, twoRandomNumber } from "../helpers.js";
import voteService from './voteService.js'

const voteController = {
  get2RandomCharacters: async (req, res) => {
    (async () => {
      let client = await pool.connect();
      try {
        const allIds = await voteService.getAllCandidatesIds();
        let theIds = twoRandomNumber(allIds);
        const twoCharacters = await voteService.getCandidatesById(theIds);
        const theResult = voteService.manageError(twoCharacters);
        return res.json(theResult);
      } finally {
        client.release();
      }
    })().catch((err) => console.log(err.stack)); //should be logged
  },
};

export default voteController;

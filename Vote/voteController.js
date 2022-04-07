import { pool } from '../config.js'; // default size is 10
import { missingNumbers, twoRandomNumber } from '../helpers.js';

const voteController = {
  get2RandomCharacters: async (req, res) => {
    (async () => {
      let client = await pool.connect();
      try {
        let psql = await client.query("SELECT id FROM characters");
        const dirtyIds = psql.rows; // we got an object unusable for our purpose
        const ids = dirtyIds.map(({ id }) => id)
        const missing = missingNumbers(ids);
        let theIds = twoRandomNumber(ids[0], ids[ids.length - 1], missing);
        client = await pool.connect(); // a new operation = a new client...
        psql = await client.query(`SELECT * FROM characters where id=${theIds[0]} or id=${theIds[1]}`);
        return res.send(psql.rows);
      } finally {
        client.release();
      }
      })().catch((err) => console.log(err.stack)); //should be logged
    }
};

export default voteController;

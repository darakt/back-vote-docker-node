import { pool } from '../config.js'; // default size is 10
import { twoRandomNumber } from '../helpers.js';

const voteService = {
    getAllCandidatesIds: async () => {
        let client;
        let ids;
        try {
            client = await pool.connect();
            let psql = await client.query("SELECT id FROM characters");
            const dirtyIds = psql.rows;
            ids = dirtyIds.map(({ id }) => id)
        } catch (err) {
            console.log(err.stack); // should be logged
        } finally {
            client.release();
        }
        return ids;
    },
    getCandidatesById: async (ids) => {
        let client
        try {
            let query = `SELECT * FROM characters where id=${ids[0]}`; // if ids = null catch will throw an error
            ids.shift();
            ids.map((anId) => {
                query = query.concat(` or id=${anId}`);
            });
            client = await pool.connect();
            const psql = await client.query(query)
            return psql.rows;
        } catch (err) {
            console.log(err.stack);
        } finally {
            client.release();
        }
    },
    manageError: (data) => {
        if (data.length !== 2) {
            return {
                err: 'something went wrong'
            }
        }
        return data;
    }
}

export default voteService;
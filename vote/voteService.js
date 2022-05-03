import myError from "../myError";

const voteService = {
    createAVote: async (pool, id, vote) => {

    },
    getAllTheCandidatesIds: async (pool) => {
        let client;
        let ids;
        try {
            client = await pool.connect();
            let psql = await client.query("SELECT id FROM characters");
            const dirtyIds = psql.rows;
            ids = dirtyIds.map(({ id }) => id)
        } catch (err) {
            console.log('err :',err.code)
            throw myError(
                err.code,
                err.messaage,
                err.stack,
                voteService.getAllTheCandidatesIds.name
            );
        } finally {
            client.release();
        }
        return ids;
    },
    getCandidatesById: async (ids, pool) => {
        let client  // TODO: add test for a more precise error
        try {
            let query = `SELECT * FROM characters where id=${ids[0]}`; // if ids = null catch will throw an error
            ids.shift();
            ids.map((anId) => {
                query = query.concat(` or id=${anId}`);
            });
            client = await pool.connect();
            const psql = await client.query(query);
            return psql.rows;
        } catch (err) {
            console.log(err.code);
            throw myError(
                err.code,
                err.message,
                err.stack,
                voteService.getCandidatesById.name
            );
        } finally { // How to test finally ?
            client.release();
        }
    },
}

export default voteService;
import myError from "../myError";

const voteService = {
    getAllCandidatesIds: async (pool) => {
        let client;
        let ids;
        try {
            client = await pool.connect();
            let psql = await client.query("SELECT id FROM characters");
            const dirtyIds = psql.rows;
            ids = dirtyIds.map(({ id }) => id)
        } catch (err) {
            throw myError(
                err.code,
                err.messaage,
                err.stack,
                voteService.getAllCandidatesIds.name
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
            const psql = await client.query(query)
            return psql.rows;
        } catch (err) {
            console.log(err.stack);
            throw myError(
                err.code,
                err.message,
                err.stack,
                voteService.getCandidatesById.name
            );
        } finally {
            client.release();
        }
    },
    manageError: (data) => {
        const err = {};
        if (data.length !== 2) {
            throw myError(
                err.code,
                'something went wrong',
                err.stack,
                voteService.getAllCandidatesIds.name
            );
        }
        return data;
    }
}

export default voteService;
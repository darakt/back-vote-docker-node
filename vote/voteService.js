import myError from "../myError";

const voteService = {
    createAVote: async (id, candidate, pool) => {
        try {
            let psql = await pool.query(
                'INSERT INTO votes(id_char, id_voter) VALUES ($1, $2)',
                [candidate, id]
            );
            if (psql.oid === 0 && psql.rowCount === 1 && psql.command === 'INSERT') {
                return {messaage: 'has voted'}
            }
            return {message: 'no vote'}
        } catch (err) {
            throw myError(
                err.code,
                err.messaage,
                err.stack,
                voteService.getAllTheCandidatesIds.name
            );
        }
    },
    getAllTheCandidatesIds: async (pool) => {
        let ids;
        try {
            let psql = await pool.query("SELECT id FROM characters");
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
        }
        return ids;
    },
    getCandidatesById: async (ids, pool) => {
        let psql;  // TODO: add test for a more precise error
        try {
            let query = 'SELECT * FROM characters where id in '; // if ids = null catch will throw an error
            if (ids.length === 1) query = query.concat("( $1 )");
            else if (ids.length === 2) query = query.concat("( $1, $2 )");
            psql = await pool.query(query, ids);
            return psql.rows;
        } catch (err) {
            console.log(err.code);
            throw myError(
                err.code,
                err.message,
                err.stack,
                voteService.getCandidatesById.name
            );
        }
    },
}

export default voteService;
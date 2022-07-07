import {CustomError} from "../myError";

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
            throw new CustomError(
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
            throw new CustomError(
                err.code,
                err.messaage,
                err.stack,
                voteService.getAllTheCandidatesIds.name
            );
        }
        return ids;
    },
    getACandidateById: async (id, pool) => {
        let psql;  // TODO: add test for a more precise error
        try {
            let text = 'SELECT * FROM characters where id = $1';
            psql = await pool.query(text, [id]);
            return psql.rows;
        } catch (err) {
            console.log(err.code);
            throw new CustomError(
                err.code,
                err.message,
                err.stack,
                voteService.getACandidateById.name
            );
        }
    },
}

export default voteService;
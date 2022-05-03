import myError from "../myError";
import crypto from 'crypto';

const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.webcrypto.getRandomValues(new Uint8Array(1))[0] &
                (15 >> (c / 4)))
        ).toString(16)
    );
}

const expire_on = (date, validity) => { // validity in minutes
    const expire = new Date(date.getTime() + validity * 60000);
    console.log(expire);
    console.log(expire.toString())
    return expire.toISOString();
}

const is_valid = (date) => {
    const tmp = date.getTime() - Date.now();
    if (tmp < 0) return true;
    return false;
}

const tokenService = {
    createToken: async (id, pool) => {
        let client, psql;
        try {
            client = await pool.connect();
            expire_on(new Date(), 30);
            psql = await client.query(
                `INSERT INTO tokens(value, expire_on, id_user) VALUES (
                    '${uuidv4()}',
                    '${expire_on(new Date(), 30)}',
                    ${id})`
            );
            console.log(psql);
            return psql
        } catch (err) {
            console.log(err)
            throw myError(
                err.code,
                err.messaage,
                err.stack,
                voteService.getAllTheCandidatesIds.name
            );
        } finally {
            client.release();
        }

    },
    validateToken: async () => {

    }
}

export default tokenService;
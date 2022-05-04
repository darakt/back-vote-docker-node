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
    return expire.toISOString();
}

const is_valid = (limit) => {
    const tmp = limit.getTime() - Date.now();
    if (tmp > 0) return true;
    return false;
}

const tokenService = {
    createToken: async (id, pool) => {
        let client, psql, token;
        try {
            token = uuidv4();
            client = await pool.connect();
            psql = await client.query(
                `INSERT INTO tokens(value, expire_on, id_user) VALUES (
                    '${token}',
                    '${expire_on(new Date(), 30)}',
                    ${id})`
            );
            if (psql.oid === 0 && psql.rowCount === 1 && psql.command === 'INSERT') {
                return token
            }
            throw Error('Cannot create a token!');
        } catch (err) {
            console.log(err)
            throw myError(
                err.code,
                err.messaage,
                err.stack,
                tokenService.createToken.name
            );
        } finally {
            client.release();
        }
    },
    validateToken: async (value, pool) => {
        let client, flag, psql;
        try {
            client = await pool.connect();
            psql = await client.query(`SELECT * FROM tokens WHERE value='${value}'`)
            let [theToken] = psql.rows;
            if (theToken) return is_valid(new Date(theToken.expire_on));
            return false;
        } catch (err) {
            console.log(err);
            throw myError(
                err.code,
                err.messaage,
                err.stack,
                tokenService.validateToken.name
            );
        } finally {
            client.release();
        }
    }
}

export default tokenService;
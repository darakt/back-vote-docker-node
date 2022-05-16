import myError from "../myError";
import { uuidv4 } from "../helpers"

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
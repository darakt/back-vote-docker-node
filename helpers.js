import myError from "./myError";
import crypto from "crypto";

const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
        c ^
        (crypto.webcrypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
};


const twoRandomNumbers = (numbers) => {
    let response = [];
    let first = Math.floor(Math.random() * numbers.length);
    response = response.concat(numbers[first]);
    let second = first;
    while (first === second) {
        second = Math.floor(Math.random() * numbers.length);
    }
    response = response.concat(numbers[second]);
    if (response.length !== 2) {
        const err = {}
        Error.captureStackTrace(err);
        throw myError(
            0,
            `The output of ./helpers/twoRandomNumbers should be an array of 2, it was ${response.length}`, // should be an env var
            err.stack,
            twoRandomNumbers.name
        );
    }
    return response;
}


export { twoRandomNumbers, uuidv4}
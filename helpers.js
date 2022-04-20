import myError from "./myError";

const twoRandomNumbers = (numbers) => {
    let response = [];
    let first = Math.floor(Math.random() * numbers.length);
    response = response.concat(numbers[first]);
    let second = first;
    while (first === second) {

        second = Math.floor(Math.random() * numbers.length);
    }
    response = response.concat(numbers[second]);
    console.log(response)
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

const objectToArray = (anObject) => anObject.map(({ id }) => id);

export { objectToArray, twoRandomNumbers }
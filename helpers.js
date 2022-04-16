
const twoRandomNumber = (numbers) => {
    console.log("numbers ", numbers);
    let first = Math.floor(Math.random() * numbers.length);
    let second = first;
    while (first === second) {

        second = Math.floor(Math.random() * numbers.length);
    }
    return [numbers[first], numbers[second]]
}

const objectToArray = (anObject) => anObject.map(({ id }) => id);

export { objectToArray, twoRandomNumber }
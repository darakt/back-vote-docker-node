
const missingNumbers = (numbers) => {
    const count = numbers.pop();
    numbers.push(count);
    let missing = [];
    for (let i = 1; i <= count; i++) {
        if (numbers.indexOf(i) == -1) {
            missing.push(i);
        }
    }
    return missing;
}

export { missingNumbers };

const randomNumber = (min, max, exept) => {
    let therandomNumber = -1;
    let i = 0;
    while (therandomNumber === -1) {
        console.log(i++);
        therandomNumber = Math.floor(Math.random() * (max - min) + min);
        if (exept.indexOf(therandomNumber) !== -1) {
            console.log('the random number ', therandomNumber);
            therandomNumber = -1;
        }
    }
    return therandomNumber
}

const twoRandomNumber = (min, max, exept) => {
    const first = randomNumber(min, max, exept);
    const second = randomNumber(min, max, [first, ...exept]);
    return [first, second];
}

export { twoRandomNumber }
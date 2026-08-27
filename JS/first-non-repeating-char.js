function firstNonRepeatingChar(str) {
    const obj = {};
    let firstChar = null
    for (let i = 0; i < str.length; i++) {
        if (str[i] in obj) {
            obj[str[i]] += 1;
        } else {
            obj[str[i]] = 0;
        }
    }
    for (const item of Object.entries(obj)) {
        if (item[1] === 0) {
            firstChar = item[0];
            break;
        }
    }
    return firstChar;
}

const str = "swiss";
console.log(firstNonRepeatingChar(str))
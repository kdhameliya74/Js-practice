function findMissing(arr) {
    let missing;
    const max = Math.max(...arr);
    const min = Math.min(...arr)

    for (let i = min; i < max; i++) {
        if (!arr.includes(i)) {
            missing = i;
        }
    }

    return missing;
}

const arr = [1, 2, 3, 5];
console.log(findMissing(arr));
console.log(findMissing([5, 6, 7, 9]));

console.log("=========================================")


function findMissing1(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    const expectedSum = ((max - min + 1) * (min + max)) / 2;

    const actualSum = arr.reduce((sum, value) => sum + value, 0);

    return expectedSum - actualSum;
}

console.log(findMissing([1, 2, 3, 5])); // 4
console.log(findMissing([5, 6, 7, 9])); // 8

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
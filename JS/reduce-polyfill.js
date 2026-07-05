/*
Reduce Polyfill

How reduce() works:
1. It executes a callback for every element in the array.
2. The callback receives an accumulator that stores the running result.
3. If an initial accumulator is provided, iteration starts from index 0.
4. Otherwise, the first array element becomes the accumulator,
   and iteration starts from index 1.
5. Finally, it returns the accumulated result.

Native Reduce parameters = reduce((accumulator, currentValue, index, array) => ({}))
*/

Array.prototype.reducePolyfill = function (cb, accumulator) {

    let initialIndex = 0;

    // Edge case:
    // Native reduce throws an error if the array is empty
    // and no initial value is provided.
    if (this.length === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
    }

    // If no initial accumulator is passed,
    // use the first element of the array.
    // undefined and null are valid values so arguments length is checked
    if (arguments.length < 2) {
        accumulator = this[0];
        initialIndex = 1;
    }

    // Iterate through the array
    for (let i = initialIndex; i < this.length; i++) {

        accumulator = cb(
            accumulator,
            this[i],
            i,
            this
        );
    }

    // Return the final accumulated value
    return accumulator;
};

const arr = [1, 2, 3, 4, 5, 6];

const cb = (accumulator, currentValue) => {
    return accumulator + currentValue;
};

console.log(arr.reducePolyfill(cb)); // 21
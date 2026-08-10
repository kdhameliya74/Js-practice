function groupAnagrams(words) {
    const map = new Map();

    for (const word of words) {
        const key = word.split("").sort().join("");

        if (!map.has(key)) {
            map.set(key, []);
        }

        map.get(key).push(word);
    }

    return Array.from(map.values());
}
const input = ["listen", "silent", "enlist", "hello", "olleh"];
console.log(groupAnagrams(input))
// output: 
// [
//   ["listen", "silent", "enlist"],
//   ["hello", "olleh"]
// ]
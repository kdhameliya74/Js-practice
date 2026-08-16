async function runWithLimit(tasks, limit) {
    if (limit <= 0) {
        throw new Error("There must be some limit");
    }

    const fnChunk = [];
    const result = [];

    for (let i = 0; i < tasks.length; i += limit) {
        fnChunk.push(tasks.slice(i, i + limit));
    }

    for (let i = 0; i < fnChunk.length; i++) {
        const data = await Promise.all(
            fnChunk[i].map(fn => fn())
        );

        result.push(...data);
    }

    return result;
}

const fetchData = (value) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Result for ${value}`);
        }, 1000);
    });
};

const tasks = [
    () => fetchData(1),
    () => fetchData(2),
    () => fetchData(3),
    () => fetchData(4),
    () => fetchData(5),
];

runWithLimit(tasks, 2).then(results => {
    console.log(results);
});
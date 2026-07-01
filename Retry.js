async function retry(fn, attempts = 3) {
    try {
        return await fn();
    } catch (err) {
        console.log("error:", err);

        if (attempts > 1) {
            console.log("retrying... attempts left:", attempts - 1);
            return retry(fn, attempts - 1);
        }

        throw err;
    }
}

async function getConsole() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("get console rejected")
        }, 2000)
    })
}


retry(getConsole, 3).catch(er => {
    console.log("Final rejection", er)
})

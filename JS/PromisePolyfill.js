function MyPromise(executor) {
    let status = "pending"
    let value;
    const successCB = []; // multiple then block
    const failureCB = []; // multiple catch block

    function resolve(val) {
        if (status !== 'pending') return;
        status = "fulfilled"
        value = val
        successCB.forEach(fn => fn(value))
    }

    function reject(err) {
        if (status !== 'pending') return;
        status = "rejected"
        value = err
        failureCB.forEach(fn => fn(value))
    }

    this.then = function (thenHandler, catchHandler) {
        return new MyPromise((resolve, reject) => {

            successCB.push((val) => {
                if (!thenHandler) return resolve(val);
                try {
                    resolve(thenHandler(val))
                } catch (err) {
                    reject(err)
                }
            })

            failureCB.push((val) => {
                if (!catchHandler) return reject(val)
                try {
                    resolve(catchHandler(val))
                } catch (err) {
                    reject(err)
                }
            })


            /**
             * const p = new MyPromise((resolve) => {
                 resolve("hello") 
                })
             * resolves IMMEDIATELY — synchronously!
             * By the time we reach .then(), promise is ALREADY fulfilled
             * status = "fulfilled", value = "data"
             * successCB queue is ALREADY empty (forEach already ran on empty array)    
             * p.then(val => console.log(val)) // pushes cb1... but forEach already ran!, cb1 sits in queue FOREVER
             */

            if (status === "fulfilled") successCB[successCB.length - 1](value)
            if (status === "rejected") failureCB[failureCB.length - 1](value)
        })
    }

    this.catch = function (catchHandler) {
        return this.then(null, catchHandler)
    }

    this.finally = function (handler) {
        return this.then(
            (value) => { handler(); return value },
            (err) => { handler(); throw err }
        )
    }

    try {
        executor(resolve, reject)
    } catch (err) {
        reject(err)
    }
}

MyPromise.resolve = function (promise) {
    if (promise instanceof MyPromise) return promise;
    return new MyPromise((resolve, reject) => {
        if (value && typeof value.then === 'function') {
            try {
                value.then(resolve, reject)
            } catch (err) {
                reject(err)
            }
        } else {
            resolve(promise)
        }
    })
}

MyPromise.reject = function (reason) {
    return new MyPromise((_, reject) => reject(reason));
};


// Static methods
MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Argument must be iterable"));
        }
        if (promises.length === 0) {
            return resolve([])
        }
        const result = [];
        let totalSettled = 0;

        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then(data => {
                totalSettled++;
                result[index] = data
                if (totalSettled === promises.length) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        })
    })
}



MyPromise.allSettled = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Argument must be iterable"));
        }
        if (promises.length === 0) {
            return resolve([])
        }
        const result = [];
        let totalSettled = 0;

        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then(data => {
                result[index] = {
                    value: data,
                    status: "fulfilled"
                }
                totalSettled++;
                if (totalSettled === promises.length) {
                    resolve(result);
                }
            }).catch(err => {

                result[index] = {
                    reason: err,
                    status: "rejected"
                }

                totalSettled++;
                if (totalSettled === promises.length) {
                    resolve(result);
                }

            })
        })
    })
}


MyPromise.any = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Argument must be iterable"));
        }
        if (promises.length === 0) {
            return reject(new AggregateError([], "All promises were rejected"));
        }

        const errors = []
        let totalSettled = 0;

        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then(data => {
                resolve(data)
            }).catch(err => {
                errors[index] = err;
                totalSettled++;
                if (totalSettled === promises.length) {
                    reject(new AggregateError(errors, "All promises were rejected"))
                }
            })
        })
    })
}

MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Argument must be iterable"));
        }
        if (promises.length === 0) {
            return; // stays pending forever
        }
        promises.forEach(promise => {
            MyPromise.resolve(promise).then(resolve, reject)
        })
    })
}


const P1 = new MyPromise((resolve, reject) => reject("1"))
const P2 = new MyPromise((resolve, reject) => reject("2"))
const P3 = new MyPromise((resolve, reject) => reject("3"))

MyPromise.race([P1, P2, P3]).then(data => {
    console.log("data", data)
}).catch(err => {
    console.log("Catch", err)
})
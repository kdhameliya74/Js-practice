function square(value) {
  return value * value;
}

function addition(value) {
  return value + 10;
}

function multiplyBy(value) {
  return value * 5;
}

function execution(initialValue) {
  return function (...functions) {
    return functions.reduce((result, fn) => {
      return fn(result);
    }, initialValue);
  };
}

const execute = execution(5);

const result = execute(
  square,
  addition,
  multiplyBy
);

console.log(result); // 175
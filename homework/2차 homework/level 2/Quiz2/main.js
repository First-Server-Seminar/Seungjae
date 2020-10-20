const calculator = require('./calculator');

const argument1 = 10;
const argument2 = 5;

console.log("Add: " + calculator.add(argument1, argument2));
console.log("Substract: " + calculator.substract(argument1, argument2));
console.log("Multiply: " + calculator.multiply(argument1, argument2));
console.log("Divide: " + calculator.divide(argument1, argument2));
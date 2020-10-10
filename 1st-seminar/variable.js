// var vv = '123';
// console.log(vv);

// var vv = '321';
// console.log(vv);
// var은 변수 재선언 가능

// let variableLet = "123";
// let variableLet = "321";

// console.log(`variableLet: ${variableLet}`);
// let은 변수 재선언 불가

// const variableConst = "123";
// const variableConst = "321";
// console.log(`variableConst: ${variableConst}`);
// const는 변수 재선언 불가

// var variableVar = `123`;
// variableVar = '321';
// console.log(`variableVar: ${variableVar}`);
// var은 변수값 재할당 가능

// let variableLet = `123`;
// variableLet = '321';
// console.log(`variableLet: ${variableLet}`);
// let은 변수값 재할당 가능

// const variableConst = `123`;
// variableConst = '321';
// console.log(`variableLet: ${variableConst}`);
// const는 변수값 재할당 불가능, 단 const를 상수라고 생각해서는 안된다.

// if(true) {
//     var x = 'var';
// }
// console.log(`var: ${x}`); // x는 잘 뜬다. -> function scope이기 때문!

// if(true) {
//     let y = 'let';
// }
// console.log(`let: ${y}`); // y는 not defined -> block scope이기 때문!

// function colorFunction() {
//     if(true) {
//         var color = 'blue';
//         console.log(color);
//     }
//     console.log(color);
// }

// colorFunction();
// console.log(color); // var은 function scope이기 때문에 에러!

hoistFunction();

function hoistFunction() {
    console.log(x); // undefined
    var x = 'var';
    console.log(x); // var
} // hoisting때문에 초기화가 아닌 선언만 함수의 최상위로 끌어올린다(hoisting).
// var뿐만 아닌 함수선언식(위와 같은)으로 선언된 함수도 hoisting의 대상!

const symbol1 = Symbol('id');
const symbol2 = Symbol('id');

console.log(symbol1.description); // id
console.log(symbol1 === symbol2); // description이 같아도 각 Symbol은 서로 다르다!

console.log('--------------');

const includes = Symbol('커스텀 includes 함수');

Array.prototype[includes] = function() {
  return 'its Symbol';
}

var arr = [1, 2, 3];
console.log(arr.includes(1)); // true, JS 기본 includes 함수 -> 인자로 받은 값이 array에 있으면 true
console.log(arr['includes'](1)); // true, JS 기본 includes 함수
console.log(arr[includes]()); // its Symbol, 커스텀 includes 함수
console.log('start');

setTimeout( () => {
  console.log('3초 후');
}, 3000);

console.log('end');

// 이벤트 루프 동작때문에 0초로 해도 똑같은 결과!
const getNumber = new Promise((resolve, reject) => {
  console.log('promise test');
  setTimeout(() => {
    resolve(100);
  }, 1000);
});
// promise는 생성될때 바로 실행!

getNumber
  .then(value => {
    console.log(value);
    return value * 2;
  })
  .then(value => {
    console.log(value);
    return value * 3;
  })
  .then(value => {
    console.log(value);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value + 1000);
      }, 1000);
    });
  })
  .then(value => {
    console.log(value);
  })

// 위 promise 생성때(이때는 pending 상태) 1초후 풀필드 상태가 되며 값 만들어지고(이 뒤에는 이미 풀필드 상태이므로 1초 기다릴 필요X),
// 아래 promise 생성때 또 한번 1초후 풀필드 상태가 되며 값 만들어지고!
// 이렇게 chaining 시키는 것을 promise chaining이라고 한다!
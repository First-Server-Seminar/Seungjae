// crypto -> 암호화를 돕는 모듈!

// const crypto = require('crypto');

// const password = '12341234';
// const password2 = '12312';

// const base64 = crypto.createHash('sha512').update(password).digest('base64');
// const base64_ = crypto.createHash('sha512').update(password2).digest('base64');
// const hex = crypto.createHash('sha512').update(password).digest('hex');

// console.log(base64);
// console.log(base64_);
// console.log(hex);

const crypto = require('crypto');

// randomBytes 메소드로 64바이트 길이의 salt를 생성, buf는 버퍼 형식이기 때문에 buf.toString('base64')로 base64 문자열 salt로 변경.
// 출처: https://www.zerocho.com/category/NodeJS/post/593a487c2ed1da0018cff95d
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64'); // salt에는 아무 문자열을 넣어도 동작함! 단 이렇게 하는게 더 안전할듯(보안적으로)
  console.log(`salt : ${salt}`);
  crypto.pbkdf2('password', salt, 100000, 64, 'sha512', (err, key) => {
    console.log(`password: ${key.toString('base64')}`);
  });
});
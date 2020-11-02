const {
  exception
} = require('console');
const crypto = require('crypto');

const makeSalt = () => new Promise((resolve, reject) => { //4. salt 생성
  crypto.randomBytes(64, (err, buf) => {
    resolve(buf.toString('base64'));
  });
});

const encryptingPassword = (password, salt) => new Promise((resolve, reject) => { //5. 2차 세미나때 배웠던 pbkdf2 방식으로 (비밀번호 + salt) 해싱하여 => 암호화된 password 를 만들기!
  crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
    resolve(key.toString('base64'));
  });
});

async function encrypting(DB, id, password) { //6. usersDB에 id, 암호화된 password, salt 저장!
  try {
    const salt = await makeSalt();
    const newPassword = await encryptingPassword(password, salt);

    DB.push({
      id,
      password: newPassword,
      salt
    });

  } catch (error) {
    console.error(error);
  } finally {
    console.log('암호화 실행 완료!');
  }
}

async function checkPassword(answerPassword, password, salt) {
  const newPassword = await encryptingPassword(password, salt);

  return new Promise((resolve, reject) => {
    if (answerPassword === newPassword) {
      resolve();
    }
    reject();
  });
}

module.exports = {
  encrypting,
  checkPassword
};
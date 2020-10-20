const crypto = require('crypto');
const password = "HelloSeungjae";
const fs = require('fs');
const fileName = 'myPassword';

const makeSalt = () => new Promise( (resolve, reject) => {
  crypto.randomBytes(64, (err, buf) => {
    resolve(buf.toString('base64')); 
  });
});

const encryptingPassword = salt => new Promise( (resolve, reject) => {
  crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
    resolve(key.toString('base64'));
  });
});

const makeFile =  encryptedPassword => new Promise( (resolve, reject) => {
  fs.writeFileSync(`${fileName}.txt`, password + ": " + encryptedPassword);
});

async function encrypting() {
  try { 
    const salt = await makeSalt();
    const newPassword = await encryptingPassword(salt);
    await makeFile(newPassword);
  } catch(error) {
    console.error(error);
  } finally {
    console.log('암호화 실행 완료!'); 
  }
}

encrypting();
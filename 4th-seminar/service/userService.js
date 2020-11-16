const crypto = require('crypto');
const {
  User
} = require('../models');

module.exports = {
  signUp: async (email, userName, password) => {
    try {
      //4. salt 생성
    const salt = crypto.randomBytes(64).toString('base64');
    //5. 2차 세미나때 배웠던 pbkdf2 방식으로 (비밀번호 + salt) => 암호화된 password
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    //6. User email, 암호화된 password, salt, userName 생성!
    const user = await User.create({
      email,
      password: hashedPassword,
      userName,
      salt
    });
    
    return user;
    } catch(err) {
      throw err;
    }
  }
}
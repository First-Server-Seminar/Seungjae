const jwt = require('jsonwebtoken');
const { secretKey, options, refreshOptions } = require('../config/secretKey');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: async (user) => { // jwt 생성
    const payload = {
      id: user.id,
      name: user.userName
    };
    const result = {
      accessToken: await jwt.sign(payload, secretKey, options),
      refreshToken: await jwt.sign(payload, secretKey, refreshOptions),
    };
    return result;
  },
  verify: async (token) => { // jwt 식별
    let decoded;
    try {
      decoded = await jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
  refresh: async (refreshToken) => {
    try {
      const decoded = await jwt.verify(refreshToken, secretKey);
      console.log("refresh!");
      console.log(decoded);

      const payload = {
        id: decoded.id,
        name: decoded.name
      };

      const accessToken = await jwt.sign(payload, secretKey, options);

      return accessToken;
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }
  }
}

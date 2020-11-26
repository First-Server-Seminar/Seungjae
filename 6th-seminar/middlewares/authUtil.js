const jwt = require('../modules/jwt');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const ut = require('../modules/util');
const {
  User
} = require('../models');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: async (req, res, next) => {
    // var token = req.headers.jwt;
    const token = req.session.accessToken; // 그냥 헤더에 넣는 대신 세션을 사용.
    const userId = req.session.userId;

    if (!token) {
      return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
    }

    let user = await jwt.verify(token);

    if (user === TOKEN_EXPIRED) {
      console.log("session userId: " + userId);

      const currentUser = await User.findOne({
        where: {
          id: userId
        }
      });

      const newAccessToken = await jwt.refresh(currentUser.refreshToken);
      req.session.accessToken = newAccessToken;

      if(newAccessToken === TOKEN_EXPIRED) {
        return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
      }

      user = await jwt.verify(newAccessToken);
    }

    if (user === TOKEN_INVALID) {
      return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
    }

    if (user.id === undefined) {
      return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
    }

    req.decoded = user;
    next();
  }
}
module.exports = authUtil;
const express = require('express');
const router = express.Router();
const ut = require('../../modules/util');
const sc = require('../../modules/statusCode');
const rm = require('../../modules/responseMessage');
const jwt = require('../../modules/jwt');
const {
  User
} = require('../../models');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

router.get('/', async (req, res) => {
  const token = req.session.accessToken; // 그냥 헤더에 넣는 대신 세션을 사용.
  // 세션에 user id정도는 가지고 있어야할 듯. 그래야 만료되도 해당 refresh토큰 호출가능
  const userId = req.session.userId; // 테스트(세션에 등록된 user id라 가정) 
  if (!token) {
    return res.json(ut.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
  }
  const user = await jwt.verify(token);

  if (user === TOKEN_EXPIRED) {
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
    return res.status(sc.OK).send(ut.success(sc.OK, rm.AUTH_SUCCESS, {newAccessToken}));
  }
  if (user === TOKEN_INVALID) {
    return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
  }
  if (user.id === undefined) {
    return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
  }
  return res.status(sc.OK).send(ut.success(sc.OK, rm.AUTH_SUCCESS));
});

module.exports = router;
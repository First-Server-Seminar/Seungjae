const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const {
  User
} = require('../../models');
const userController = require('../../controller/userController');

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.get('/', async (req, res) => {
  //1. 모든 사용자 정보 (id, email, userName ) 리스폰스!
  // status: 200, message: READ_USER_ALL_SUCCESS, data: id, email, userName 반환
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'userName']
    });
    console.log(users);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, users));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.MEMBER_READ_ALL_FAIL));
  }
});

router.get('/:id', async (req, res) => {
  //1. parameter로 id값을 받아온다! (id값은 인덱스값)
  const {
    id
  } = req.params;
  //2. id값이 유효한지 체크! 존재하지 않는 아이디면 NO_USER 반환
  try {
    const user = await User.findOne({
      where: {
        id
      },
      attributes: ['id', 'email', 'userName']
    });

    if (!user) {
      console.log("존재하지 않는 아이디 입니다.");
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    //3. status:200 message: READ_USER_SUCCESS, id, email, userName 반환
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, user));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.MEMBER_READ_FAIL));
  }
});

// 회원정보 삭제
router.delete('/:id', async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id
      },
      attributes: ['id', 'userName', 'email']
    });

    if (!user) {
      console.log("존재하지 않는 아이디 입니다.");
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    await User.destroy({
      where: {
        id
      }
    });

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_DELETE_SUCCESS, user));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.MEMBER_DELETE_FAIL));
  }
});

// 회원정보 수정
router.put('/:id', async (req, res) => {
  const {
    id
  } = req.params;

  let {
    userName,
    email,
    password
  } = req.body;

  let isChangingPwd = true;

  try {
    const user = await User.findOne({
      where: {
        id
      }
    });

    if (!user) {
      console.log("존재하지 않는 아이디 입니다.");
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    if (!userName && !email && !password) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    if (!userName) {
      console.log('userName 값은 바뀌지 않습니다.');
      userName = user.userName;
    }

    if (!email) {
      console.log('email 값은 바뀌지 않습니다.');
      email = user.email;
    }

    if (!password) {
      console.log('password 값은 바뀌지 않습니다.');
      isChangingPwd = false;
    }

    let salt = null;
    let hashedPassword = null;

    if (isChangingPwd) {
      salt = crypto.randomBytes(64).toString('base64');
      hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    } else {
      salt = user.salt;
      hashedPassword = user.password;
      console.log(hashedPassword);
    }

    await User.update({
      userName,
      email,
      password: hashedPassword,
      salt
    }, {
      where: {
        id
      }
    });

    const changedUser = await User.findOne({
      where: {
        id
      },
      attributes: ['id', 'email', 'userName']
    });

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_UPDATE_SUCCESS, changedUser));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.MEMBER_UPDATE_FAIL));
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtils = require('../../middlewares/authUtil'); // 미들웨어 import

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', authUtils.checkToken, userController.readAll);
router.get('/profile', authUtils.checkToken, userController.getProfile); // 밑에 것(id를 params를 받는)이 먼저 오면 밑에 것에 profile이 전달됨!(profile도 params로 인지하기 때문!)
router.get('/:id', authUtils.checkToken, userController.readOne);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

//회원가입
router.post('/signup', userController.signup);

// 로그인
router.post('/signin', userController.signin);

// 전체 회원정보 읽기
router.get('/', userController.readAll);

// 특정 회원정보 읽기
router.get('/:id', userController.readOne);

// 회원정보 삭제
router.delete('/:id', userController.deleteById);

// 회원정보 수정
router.put('/:id', userController.updateById);

module.exports = router;
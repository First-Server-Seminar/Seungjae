const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const multerController = require('../../controller/multerController');

router.post('/single/:id', upload.single('image'), multerController.uploadImgOnThePost); // image가 키값

router.post('/array', upload.array('images', 3), multerController.uploadImgs);

module.exports = router;
const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');

router.post('/single', upload.single('image'), async (req, res) => { // image가 키값
  const image = req.file.location; // 이것으로 파일의 주소를 클라이언트에게 넘겨준다!
  console.log(req.file);
  console.log(req.body);
  res.send({
    imageUrl: image,
    file: req.file,
    body: req.body
  });
});

router.post('/array', upload.array('images', 3), async (req, res) => {
  const imageUrls = req.files.map(file => file.location);
  console.log(req.files);
  console.log(req.body);
  res.send({
    imageUrls: imageUrls,
    file: req.files,
    body: req.body
  });
});

module.exports = router;
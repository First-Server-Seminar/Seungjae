var express = require('express');
var router = express.Router();

router.use('/users', require('./users')); // 이 폴더 내 index.js를 뜻하지만 그 폴더가 없어서 users.js를 사용하는듯?
router.use('/ranking', require('./ranking'));
router.use('/society', require('./society'));
router.use('/members', require('./members'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wsClient', function(req, res, next) {
  res.render('wsClient');
});

router.get('/socketIoClient', function(req, res, next) {
  res.render('socketIoClient');
});

router.get('/moveSocketIoClient', function (req, res, next){
  res.render('moveSocketIoClient');
});

module.exports = router;

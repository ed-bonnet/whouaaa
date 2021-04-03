var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Expresssssssssss' });
  res.render('demo2');
  // const pathDemo = path.join(__dirname + '/../views/demo1.html');
  // res.sendFile(pathDemo);
});

module.exports = router;

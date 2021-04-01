const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/1', function(req, res, next) {
  const pathDemo = path.join(__dirname + '/../views/demo1.html');
  res.sendFile(pathDemo);
});

router.get('/2', function(req, res, next) {
  res.render('demo2', { title: 'Express' });
});
module.exports = router;

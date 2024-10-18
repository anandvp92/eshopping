var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  res.render('index', { title: 'Express',admin:true,user});
  
});






module.exports = router;

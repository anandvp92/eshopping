var express = require('express');
const User = require('../helpers/userhelper');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/login', (req, res, next) => {
  if(req.session.loggedIn){
    return res.redirect('/');
  }else{
    res.render('login',{msg:req.flash('info')});
    res.set('Cache-control','no-store')
  }
});


router.get('/signup',(req,res,next)=>{
  res.render("signup");
})

router.post('/signup',(req,res,next)=>{
  new User(req.body).doSignup().then(value=>{
  console.log(value)
  }).catch(err=>{
    console.log(err)
  })
  next()
})


router.post('/login',(req,res,next)=>{
  new User(req.body).logIn().then(response=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      console.log(response.message)
      req.flash('info',response.message)
      res.redirect('/users/login')
    }
  }).catch(err=>{
    res.send(err)
  });
})

router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.redirect('/users/login');
})


module.exports = router;

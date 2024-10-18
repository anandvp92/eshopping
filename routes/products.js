var express = require('express')

var router = express.Router()



router.get('/',(req,res,next)=>{
    res.render('products/homepage',{})
})


router.get('/create',(req,res,next)=>{
    res.render('products/create',{})
})


router.get('/list-products',(req,res,next)=>{
    res.render('products/listproducts',{})
})  


router.get('/edit-products',(req,res,next)=>{
    res.render('products/editproduct',{})
})

router.post('/create',(req,res,next)=>{
     console.log(req.body)
})


module.exports=router;
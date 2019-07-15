const express = require('express');

const router = express.Router();


const names = [];

router.get('/',(req,res,next)=>{
  res.render('index',{
    pageTitle: 'Main page'
  });
});
router.get('/users',(req,res,next)=>{
  res.render('users',{
    pageTitle: 'User list',
    users: names
  });
});
router.post('/users',(req,res,next)=>{
  names.push(req.body.name);
  res.redirect('/users');
});

module.exports = router;
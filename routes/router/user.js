const User=require('../../database/schema/user');
const Img=require('../../database/schema/img');
const express=require('express');
const router=express.Router();
const empty=require('is-empty');
const sha1=require('sha1');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path = require('path');
const fs = require('fs');


router.post('/login',(req,res)=>{
  console.log(req.body);
  User.findOne({email:req.body.email},(err,doc)=>{
    if(!empty(doc)){
      if(doc.password==(sha1(req.body.password))){
          const token=jwt.sign({
            email:doc.email
          },process.env.JWT_KEY||'tokenclave',{
            expiresIn:'2h'
          });
          res.json({
            message:'autenticacion exitosa',
            admin:doc.admin,
            token:token
          });
      }else {
        res.json({message:'el password es incorrecto'});
      }
    }else{
      res.json({message:'el email es incorrecto'});
    }
  });
});


const auth=require('./ver');const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        try {
            fs.statSync('./public/uploads');
        } catch (e) {
            fs.mkdirSync('./public/uploads/');
        }
        cb(null, './public/uploads/');
    },
    filename: (res, file, cb) => {
        cb(null, 'IMG-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage });


router.get('/',(req,res)=>{
    User.find({},(err,docs)=>{
      if(empty(docs)){
        res.json({message:'no existen usuarios en la bd'});
      }else{
        res.json(docs);
      }
    });
});

router.post('/',async(req,res)=>{
  console.log(req.body);
  req.body.password=(sha1(req.body.password));
  let ins=new User(req.body);
  let result=await ins.save();
  res.json({message:'usuario insertado'});
});

router.delete('/:id',(req,res)=>{
  let id=req.params.id;
  User.findByIdAndRemove(id,()=>{
    res.json({message:'usuario eliminado'});
  });
});


router.post('/subir',upload.array('img', 12),async(req,res)=>{
    let imgSet=[];
    if(!empty(req.files)){
      req.files.forEach(foto=>{
        imgSet.push({url:foto['filename']});
      });
    }
  
    let ins=new Img({
      image:imgSet
    });
    let result =await ins.save();
    res.json({
      message:'img ins'
    });
});

module.exports=router;

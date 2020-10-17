const mongoose=require('../connect');

const user={
  nombre:String,
  email:String,
  password:String,
  admin:Boolean,
  img:[{
    url:String
  }]
};

const usermodel=mongoose.model('user',user);

module.exports=usermodel;

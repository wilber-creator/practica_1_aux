const mongoose=require('../connect');

const img={
  image:[{
    url:String
  }]
};

const imgmodel=mongoose.model('image',img);

module.exports=imgmodel;

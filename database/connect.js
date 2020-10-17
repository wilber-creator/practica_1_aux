var mongoose =require("mongoose");
mongoose.connect("mongodb://172.27.0.2:27017/proyectoimg",{useNewUrlParser:true});
var db= mongoose.connection;
db.on("error",()=>{
    console.log("ERROR no se puede conectar al servidor");
});
db.on("open",()=>{
    console.log("Conexion Exitosa")
});
module.exports=mongoose; 
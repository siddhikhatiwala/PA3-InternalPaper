const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/vehicledb", {useNewUrlParser:true}).then(()=>{console.log("Successfully connected!")})
.catch((err)=>{console.log(err);});
module.exports=mongoose;
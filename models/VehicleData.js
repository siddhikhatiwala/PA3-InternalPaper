const { float } = require("webidl-conversions");
const mongoose = require("../config/db");
var VehicleDataSchema = new mongoose.Schema({
    brand: String,
    category_name:{
        type: String,
        ref: 'VehicleCategory'
    },
    picture: String,
    price: Number,
    depreciation: Number,
    no_of_years: Number,
    total_price: Number
});
var VehicleData = new mongoose.model('VehicleData',VehicleDataSchema,'vehicles')
module.exports=VehicleData;
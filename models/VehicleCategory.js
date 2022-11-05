const mongoose = require("../config/db");
var VehicleCategorySchema = new mongoose.Schema({
    c_id: mongoose.Schema.Types.ObjectId,
    category_name: String
});
var VehicleCategory = new mongoose.model('VehicleCategory',VehicleCategorySchema,'vehiclecategories')
module.exports=VehicleCategory;
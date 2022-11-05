const router = require('express').Router();
const VehicleCategory = require('../models/VehicleCategory');
const VehicleData = require('../models/VehicleData');
const multer = require('multer');
const path = require('path');

const express = require('express')
router.use(express.static('uploads'));

var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({
    storage: Storage
});

router.get('/', (req,res)=>{
    VehicleData.find((err, result)=>{
        if(err)
            res.send(err);
        res.render("list",{vehicles:result});
    });
})
router.get('/add', (req,res)=>{
    VehicleCategory.find((err,result)=>{
        if(err)
            res.send(err);
        res.render("add",{categories:result});
    });
})
router.post('/add', upload.single('picture'), async(req,res)=>{
    try{
        var p =  parseFloat(req.body.price);
        var d =  parseFloat(req.body.depreciation);
        var n = parseInt(req.body.no_of_years);
        var tp =  parseFloat(p - (d*n));
        var v1 = new VehicleData({
            brand: req.body.brand,
            category_name: req.body.category_name,
            picture: req.file.filename,
            price: req.body.price,
            depreciation: req.body.depreciation,
            no_of_years: req.body.no_of_years,
            total_price: tp
        })
        await v1.save();
        res.redirect('/vehicles/');
    }
    catch(err){
        console.log(err);
    }
})
router.get('/update/:id', (req,res)=>{
    VehicleData.findOne({_id:req.params.id}, (err,data)=>{
        if(err)
            res.send(err);
        VehicleCategory.find((err,categories)=>{
                if(err)
                    res.send(err);
                res.render('update',{categories:categories, vehicle:data})
        });
        //res.render("update", {vehicle:res});
    });
})
router.post("/update", upload.single('picture'), async(req,res)=>{
    try{
        var p =  parseFloat(req.body.price);
        var d =  parseFloat(req.body.depreciation);
        var n = parseInt(req.body.no_of_years);
        var tp =  parseFloat(p - (d*n)).toFixed(2);
        await VehicleData.findOneAndUpdate({_id:req.body._id},{
            brand: req.body.brand,
            category_name: req.body.category_name,
            picture: req.file.filename,
            price: req.body.price,
            depreciation: req.body.depreciation,
            no_of_years: req.body.no_of_years,
            total_price: tp
        }).then(()=>{res.redirect("/vehicles")});
    }catch(e){
        console.log(e);
    }
})
router.get("/delete/:id",(req,res)=>{
    VehicleData.findByIdAndRemove(req.params.id, (err, result) => {
        if (err)
            res.send(err)
        res.redirect("/vehicles/");
    })
})
module.exports=router;
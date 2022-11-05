const express = require('express');
const app = express();
app.use(express.static('uploads'));
const multer = require('multer')
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

const router = require('./routers/VehicleRouter');
app.use('/vehicles',router);

app.listen(8080);
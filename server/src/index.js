const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const uploadImage = require('../controller/uploadImage')
const uploadDir=  __dirname+'/../uploads'
const DBConnection = require('../dbconnection');
const getImagesData = require('../controller/getImagesData');
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors())
DBConnection();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({storage})

app.use('/uploads',express.static(path.join(uploadDir)))
//post request
app.post('/api/uploads',upload.single('file'),uploadImage)

app.get('/api/getImagesData',getImagesData)


app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
})
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true,
    },
    size:{
        type:Number,
        required:true
    },
    uploadDate:{
        type:Date,
        required:true
    },
    extensionName:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})

const imagedb = mongoose.model('imageInfo',imageSchema);

module.exports = imagedb
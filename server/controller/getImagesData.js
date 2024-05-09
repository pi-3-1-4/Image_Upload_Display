const imagedb = require("../model/imageSchema")

const getImagesData = async(req,res) =>{
    const fetchData = await imagedb.find({})
    res.json(fetchData)
}

module.exports = getImagesData
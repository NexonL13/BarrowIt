const { Equipment } = require('../models')
const multer = require('multer')
const path = require('path')

const getEquipment = async (req,res) => {
    const listOfEquipment = await Equipment.findAll()
    res.json(listOfEquipment)
}

const addEquipment = async (req, res) => {
    const equipment = {
        image: req.file.filename,
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        category: req.body.category,
        isAvailable: req.body.isAvailable
    }
    await Equipment.create(equipment)
    res.json(equipment)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

module.exports = {
    getEquipment, 
    addEquipment,
    upload
}
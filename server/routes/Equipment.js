const express = require('express')
const router = express.Router()
const equipmentController = require('../controllers/equipmentController')
const {validateToken} = require('../middlewares/AuthMiddleware')


//GET
router.get('/', equipmentController.getEquipment)

//POST
router.post('/', validateToken, equipmentController.upload, equipmentController.addEquipment)


module.exports = router
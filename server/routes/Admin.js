const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')


//POST 
router.post("/", adminController.addAdmin)
router.post("/login", adminController.loginAdmin)

module.exports = router
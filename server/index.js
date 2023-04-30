const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')
const {} = require('jsonwebtoken')

//Middleware
app.use(express.json())
app.use(cors())
app.use(express.static('../client/public/'))

//Routes
const equipmentRouter = require('./routes/Equipment')
const adminRouter = require('./routes/Admin')

app.use('/equipment', equipmentRouter)
app.use('/auth', adminRouter)

//Database Sync
db.sequelize.sync().then(() => {
    app.listen('3000', () => {
        console.log("Running on port 3000")
    })
})

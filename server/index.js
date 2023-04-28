const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')

//Middleware
app.use(express.json())
app.use(cors())
app.use(express.static('../client/public/'))

//Routes
const equipmentRouter = require('./routes/Equipment')

app.use('/equipment', equipmentRouter)

//Database Sync
db.sequelize.sync().then(() => {
    app.listen('3000', () => {
        console.log("Running on port 3000")
    })
})

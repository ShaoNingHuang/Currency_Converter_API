const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
const app = express()
const bodyParser = require('body-parser')
const currencyAPI = require('./routes/API/currencyAPI.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/currency', currencyAPI)

module.exports = app
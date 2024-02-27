const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const currencyAPI = require('./routes/API/currencyAPI.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/currency', currencyAPI)

module.exports = app
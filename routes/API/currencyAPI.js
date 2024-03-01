// Improvements to make
/*
    1. Modularize the tasks in the route handler to have better readibility and maintainability
    2. More structured error handling
    3. How to avoid ReDoS attack in the regex
       - Limit the user input to a certain length?
       
*/

const express = require('express')
const router = express.Router()

const currencyTable = {
        "TWD": {
        "TWD": 1,
        "JPY": 3.669,
        "USD": 0.03281
        },
        "JPY": {
        "TWD": 0.26956,
        "JPY": 1,
        "USD": 0.00885
        },
        "USD": {
        "TWD": 30.444,
        "JPY": 111.801,
        "USD": 1
        }
}
/*
    GET /api/currency/convert
    Parse the input query, if invalid, return 400
    If valid, then try to do the conversion and format the output. If failed, return 400
*/
router.get('/convert', (req, res) => {
    const source = req.query.source
    const target = req.query.target
    let amount = req.query.amount 

    const payload = {
        "msg": '',
        "amount": '0'
    }

    try {
        validation(source, target, amount)
        amount = parseFloat(amount.split('$')[1].split(',').join(''))
        let convertedAmount = convertCurrency(source, target, amount)
        convertedAmount = formatOutput(convertedAmount, 'en-US', 2, 2)
        payload.amount = `$${convertedAmount}`
        payload.msg = 'Success'
        return res.status(200).json(payload)
    } catch (error) {
        console.error(error)
        payload.msg = 'Failed'
        return res.status(400).json(payload)
    }
})

function convertCurrency(source, target, amount) {
    let convertedAmount = amount * currencyTable[source][target]
    return convertedAmount
}

function validation(source, target, amount) {
    if (source === undefined || target === undefined || amount === undefined) {
        throw new Error('Invalid input.')
    }
    if (! source in currencyTable || currencyTable[source][target] === undefined) {
        throw new Error('Invalid source or target currency.')
    }
    const nonDigit = amount.match(/[^0-9$.,]/)
        if (nonDigit !== null) {
            throw new Error('Invalid amount.')
    }
}

function formatOutput(convertedAmount, region, maxDigit, minDigit) {
    return new Intl.NumberFormat(region, {
        minimumFractionDigits: minDigit,
        maximumFractionDigits: maxDigit
    }).format(convertedAmount)
}

module.exports = router;
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

    if (source === undefined || target === undefined || amount === undefined) {
        payload.msg = 'Failed. Please provide source, target and amount.'
        return res.status(400).json(payload)
    }
    try {
        const nonDigit = amount.match(/[^0-9$.,]/)
        if (nonDigit !== null) {
            throw new Error('Invalid amount.')
        }
        amount = parseFloat(amount.split('$')[1].split(',').join(''))
        let convertedAmount = amount * currencyTable[source][target]
        if (isNaN(convertedAmount)) {
            throw new Error('Invalid source or target currency.')
        }
        convertedAmount = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(convertedAmount)

        payload.amount = `$${convertedAmount}`
        payload.msg = 'Success'
        return res.status(200).json(payload)
    } catch (error) {
        console.log(error)
        payload.msg = 'Failed'
        return res.status(400).json(payload)
    }
})

module.exports = router;
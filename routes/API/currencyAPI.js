// Improvements to make
/*
    1. Modularize the tasks in the route handler to have better readibility and maintainability
    2. More structured error handling
    3. How to avoid ReDoS attack in the regex
       - Limit the user input to a certain length?
       
*/

const express = require('express')
const router = express.Router()
const currencyUtil = require('../../utils/currencyUtils')
/** 
 * @swagger 
 * '/api/currency/convert':
 *  get:
 *     summary: Convert the currency
 *     parameters:
 *      - target: currency
 *        in: path
 *        description: target currency
 *        required: true
 *     responses:
 *      200:
 *        description: Successful response                 
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

        currencyUtil.validation(source, target, amount)
        let convertedAmount = currencyUtil.convertCurrency(source, target, amount)
        convertedAmount = currencyUtil.formatOutput(convertedAmount, 'en-US', 2, 2)
        payload.amount = `$${convertedAmount}`
        payload.msg = 'Success'
        return res.status(200).json(payload)

    } catch (error) {

        console.error(error)
        payload.msg = 'Failed'
        return res.status(400).json(payload)
        
    }

})

module.exports = router;
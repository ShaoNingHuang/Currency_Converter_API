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

function formatOutput (convertedAmount, region, maxDigit, minDigit) {
    return new Intl.NumberFormat(region, {
        minimumFractionDigits: minDigit,
        maximumFractionDigits: maxDigit
    }).format(convertedAmount)
}

function convertCurrency(source, target, amount) {
    amount = parseFloat(amount.split('$')[1].split(',').join(''))
    let convertedAmount = amount * currencyTable[source][target]
    return convertedAmount
}


module.exports = {
    validation,
    formatOutput,
    convertCurrency
}
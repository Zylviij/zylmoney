

const period = [
    new Object('Daily'),
    new Object('Weekly'),
    new Object('Monthly'),
    new Object('Annually'),
]

class Payment {
    constructor(amount, date) {
        this.amount = amount
        this.date = date
    }
}

class Expense {
    constructor(date, cost, repeat, end_date, payments) {
        this.date = date
        this.total_cost = cost
        this.repeat = repeat
        this.end_date = end_date
        
        this.payments = payments || new Array()
    }
    
    pay(payment) {
        return new Expense(
            this.date,
            this.total_cost,
            this.repeat,
            this.end_date,
            this.payments.concat(payment)
        )
    }

    cost() {
        return this.total_cost
    }

    paid() {
        return this.payments.reduce((acc, val) => {
            return acc + val.amount
        }, 0)
    }

    // get payments that should be made for this to be 'on track'
    getPayForPeriod(day) {
        const paid_percentage = this.paid() / this.cost()

        const pay_by_date = this.cost() * this.getPeriodPercentage(day)
        
        return pay_by_date - this.paid()
    }

    // gets the percentage of the way through the pay period
    getPeriodPercentage(day) {
        const full_period = this.end_date.getTime() - this.date.getTime()
        const partial = day.getTime() - this.date.getTime()

        return partial / full_period
    }
}

module.exports = Expense
module.exports.Payment = Payment

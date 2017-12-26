

const Period = [
    new Object('Daily'),
    new Object('Weekly'),
    new Object('Biweekly'),
    new Object('Monthly (by Day)'),
    new Object('Monthly (by Date)'),
    new Object('Annually')
]

class Payment {
    constructor(amount, date) {
        this.amount = amount
        this.date = date
    }
}

class Expense {
    constructor(start_date, cost, repeat, end_date, payments) {
        this.start_date = start_date
        this.cost = cost
        this.repeat = repeat
        this.end_date = end_date
        
        this.payments = payments || new Array()
    }
    
    pay(payment) {
        return new Expense(
            this.start_date,
            this.cost,
            this.repeat,
            this.end_date,
            this.payments.concat(payment)
        )
    }

    paymentDate(day) {
        if (day < this.start_date || day > this.end_date) {
            return false
        }

        // Daily
        if (this.repeat === Period[0]) {
            return true
        }

        // Weekly
        else if (this.repeat === Period[1]) {
            return this.start_date.getDay() === day.getDay()
        }
        
        // Biweekly
        else if (this.repeat === Period[2]) {
            const week = 1000 * 60 * 60 * 24 * 7

            const difference = day - this.start_date
            return Math.trunc(difference) === difference
        }

        // Monthly (by Day)
        else if (this.repeat === Period[3]) {
            const same_day = this.start_date.getDay() === day.getDay()
            const start_week = (this.start_date.getDate() / 7) | 0
            const day_week = (day.getDate() / 7) | 0

            return same_day && start_week === day_week
        }

        // Monthly (by Date)
        else if (this.repeat === Period[4]) {
            return this.start_date.getDate() === day.getDate()
        }

        // Annually
        else {
            const same_month = this.start_date.getMonth() === day.getMonth()
            const same_date = this.start_date.getDate() === day.getMonth()

            return same_month && same_date
        }
    }

    cost(start, end) {
        start = start || this.start_date
        end = end || this.end_date || new Date()
        
        const day = 1000 * 60 * 60 * 24

        let total = 0
        for (; start <= end; start += day) {
            if (this.paymentDate(start)) {
                total += this.cost
            }
        }

        return total
    }

    paid(start, end) {
        start = start || this.start_date
        end = end || this.end_date || new Date()

        return this.payments.reduce((acc, val) => {
            if (val.date >= start && val.date <= end) {
                return acc + val.amount
            } else {
                return acc
            }
        }, 0)
    }

    // get payments that should be made for this to be 'on track'
    getPayForPeriod(day) {
        const paid = this.paid(null, day)
        const cost = this.cost(null, day)

        const paid_percentage = paid / cost

        const pay_by_date = cost * this.getPeriodPercentage(day)
        
        return pay_by_date - paid
    }

    // gets the percentage of the way through the pay period
    getPeriodPercentage(day) {
        const full_period = this.end_date - this.start_date
        const partial = day - this.start_date

        return partial / full_period
    }
}

module.exports = Expense
module.exports.Payment = Payment
module.exports.Period = Period

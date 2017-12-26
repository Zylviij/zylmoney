
const Expense = require('./server/expense.js')

let test = new Expense(
    new Date(2017, 0, 1),
    1000.0,
    null,
    new Date(2018, 0, 1)
)

test = test.pay(new Expense.Payment(200, new Date(2017, 5, 1)))

console.log(test.getPayForPeriod(new Date()))
console.log(test.getPayForPeriod(new Date(2017, 1, 2)))

console.log(test.paid())

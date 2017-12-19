

class ExpenseTypes {
    constructor() {
        this.types = [
            new Object('Necessities'),
            new Object('Expenses'),
            new Object('Debts'),
            new Object('Hobbies'),
            new Object('Fun')
        ]
    }

    add(item, i) {
        item = new Object(item)

        if (i === undefined) {
            this.types.push(item)
        } else {
            this.types.splice(i, 0, item)
        }
    }

    move(from, to) {
        if (from === to) {
            return
        }

        const item = this.types.splice(from, 1).pop()

        this.types.splice(to, 0, item)
    }
}

module.exports = ExpenseTypes


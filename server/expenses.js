

// Tree's Branch's Leaf
class Expense {
    constructor(name, info) {
        this.name = name
        this.info
    }}
    
    add(e) {
        const children = 
        return new Category(this.name, [
            Object.assign(new Object(), this),
            e
        ])
    }

    // duck typing interface
    cost() {
        return this.info.cost()
    }

    // duck typing interface
    paid() {
        return this.info.paid()
    }
}

// Tree's Branch
class Category {
    constructor(name, children) {
        this.name = name

        this.children = children || new Array()
    }
    
    add(e) {
        return new Category(this.name, this.children.concat(e))
    }
    
    cost() {
        return this.children.reduce((acc, val) => {
            return acc + val.cost()
        }, 0)
    }

    paid() {
        return this.children.reduce((acc, val) => {
            return acc + val.paid()
        }, 0)
    }
}

// Root of Tree
class Expenses {
    constructor(children) {
        this.children = children || new Array()
    }

    add(e) {
        return new Expenses(this.children.concat(e))
    }

    static default_expense_tree() {
        let out = new Expenses()
        let housing = new Category('Housing')
        let utilities = new Category('Utilities')

        housing.add(utilities)
        utilities.add(new Expense('Electricity'))
        utilities.add(new Expense('Water'))
    }
}

module.exports = Expenses
module.exports.Category = Category
module.exports.Expense = Expense


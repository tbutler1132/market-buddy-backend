import User from '../models/user.js'

export const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json("Failed to get user")
    }
}

export const createUser = async (req, res) => {
    const {username, password, portfolio, transactions, historicalPortfolioValue, cash, lists } = req.body
    // const salt = await bcrypt.genSalt()
    // const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
        username,
        password,
        cash,
        portfolio,
        transactions,
        lists,
        historicalPortfolioValue
    });
    console.log(newUser)
    try {
        await newUser.save()
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//Change in portfolio//

export const addStockToPortfolio = async (req, res) => {
    const stock = req.body
    const userId = req.params.id

    // console.log("Stock", stock)
    // console.log("User", userId)

    const user = await User.findById(userId)

    console.log(user)

    try {
        user.portfolio.push(stock)
        user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export const deleteStockFromPortfolio = async (req, res) => {
    const userId = req.params.userId
    const stockId = req.params.stockId

    const user = await User.findById(userId)
    const stock = await user.portfolio.id(stockId)


    try {
        stock.remove()
        await user.save()

        res.status(200).json('Stock succesfully deleted')
        
    } catch (error) {
        return res.status(400).json('Could not delete stock')
    }
}

// export const createTransaction = async (req, res) => {
    
// }

export const updateUserCash = async (req, res) => {
    const id = req.params.id
    const cash = req.body.cash

    const user = await User.findByIdAndUpdate(id, {cash: cash}, {new: true})

    try {
        user.save()

        res.status(200).json(user)
    } catch (error) {
        
        return res.status(400).json('Could not update user')
    }
    
}

export const updateStock = async (req, res) => {
    const userId = req.params.userId
    const stockId = req.params.stockId
    const shares = req.body.shares

    console.log(shares)

    const user = await User.findById(userId)
    const stock = await user.portfolio.id(stockId)

    console.log(stock.shares)

    try {
        stock.shares = shares
        user.save()

        res.status(200).json(stock)
    } catch (error) {
        
        return res.status(400).json('Could not update stock')
    }
}





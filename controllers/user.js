import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.API_KEY


export const loginDemo = async (req, res) => {

    function generateRandom(min = 0, max = 100) {

        // find diff
        let difference = max - min;
    
        // generate random number 
        let rand = Math.random();
    
        // multiply with difference 
        rand = Math.floor( rand * difference);
    
        // add with min value 
        rand = rand + min;
    
        return rand;
    }


    function generateHistoricalPortfolioValues(idx, finalValue){
        //I want it to bounce a little within a certain range
        //Half way through make a big leap
        //3/4 make a small dive

        let range = 5

        let n = 0
        let ran = generateRandom(15, 25)


        if(idx < 365 / 2 && idx > 71){
            n = 100
            ran = generateRandom(30, generateRandom(60, 80)) 
        }else{
            n = 700
        }

        if(idx > 340){
            n = 10
            ran = generateRandom(25, 35)
        }

        if (idx > 30 && idx < 70 && idx % 8 === 0){
            n = 350
            ran = generateRandom(10, generateRandom(70, 120))
        }

        if(idx > 250){
            n = 125
        }

        if(idx >= 25 && idx <= 70){
            n = 1000
        }

        let str = (finalValue - n) / 365
        return generateRandom(idx, idx + ran) * str

    }

    function getDateXDaysAgo(numOfDays, date = new Date()) {
        const daysAgo = new Date(date.getTime());
      
        daysAgo.setDate(date.getDate() - numOfDays);
      
        return daysAgo;
    }

    
    
    try {

        await User.deleteMany({})

        const { data } = await axios.get(`https://cloud.iexapis.com/v1/stock/market/quote/latestprice/batch?token=${apiKey}&symbols=aapl,snap,tsla&filter=symbol,close,previousClose`)

        let value = 0

        let closeTiming = data[0].close ? 'close' : 'previousClose'

        for(let close of data){
            if(close['symbol'] === 'AAPL'){
                value = value + close[closeTiming] * 2
            }
            if(close['symbol'] === 'TSLA'){
                value = value + close[closeTiming] * 3
            }
            if(close['symbol'] === 'SNAP'){
                value = value + close[closeTiming] * 4
            }
        }

        const histArr = []

        Array.from(Array(364)).forEach((_, i) => {
            histArr.push({
                value: generateHistoricalPortfolioValues(365 - i, value).toFixed(2),
                date:  getDateXDaysAgo(i + 1).toLocaleDateString("en-US"),
            });
        })


        const demoUser = new User({
            username: "Warren",
            password: 123,
            cash: 1000,
            portfolio: [
                {
                    ticker: "TSLA",
                    shares: 2
                },
                {
                    ticker: "AAPL",
                    shares: 2
                },
                {
                    ticker: "SNAP",
                    shares: 4
                },
            ],
            lists: [],
            historicalPortfolioValue: histArr.reverse()
        }) 

        await demoUser.save()

        const token = jwt.sign({username: demoUser.username, _id: demoUser._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result: demoUser._id, token})
    } catch (error) {   
        console.log(error)
        res.status(500).json(error)
    }
}


export const signin = async (req, res) => {

    const {username, password} = req.body

    try {
        const existingUser = await User.findOne({username})

        if(!existingUser) return res.status(404).json("User does not exist")

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        console.log(isPasswordCorrect)

        if(!isPasswordCorrect) return res.status(400).json('Invalid Credentials')

        const token = jwt.sign({username: existingUser.username, _id: existingUser._id}, 'test', {expiresIn: "1h"})

        return res.status(200).json({result: existingUser, token})
    } catch (error) {
        return res.status(500).json('Woops')
        
    }
}

export const signup = async (req, res) => {
    const {username, password} = req.body

    try {
        const existingUser = await User.findOne({username})

        if(existingUser) return res.status(400).json("User exists")

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({username, password: hashedPassword})

        const token = jwt.sign({username: result.username, _id: result._id}, 'test', {expiresIn: "1h"})

        return res.status(200).json({result, token})
    } catch (error) { 
        return res.status(500).json('Woops')
    }
}


export const getUser = async (req, res) => {
    const { id } = req.params
    const { fields } = req.query

    try {
        const user = await User.findById(id, fields)

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
    try {
        await newUser.save()
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//Change in portfolio//

export const addStockToPortfolio = async (req, res) => {
    const stock = req.body.stockObj
    const userId = req.params.id

    const user = await User.findById(userId)
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

        res.status(200).json(user)
        
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
    const shares = req.body.stock.shares

    const user = await User.findById(userId)
    const stock = await user.portfolio.id(stockId)

    try {
        stock.shares = shares
        user.save()

        res.status(200).json(user)
    } catch (error) {
        
        return res.status(400).json('Could not update stock')
    }
}


export const addStockToList = async (req, res) => {
    const userId = req.params.userId
    const listId = req.params.listId
    const stock = req.body.stock

    const user = await User.findById(userId)
    const list = user.lists.id(listId)
    list.stocks.push(stock)

    try {
        user.save()

        res.status(200).json(user)
    } catch (error) {
        
        return res.status(400).json('Could not add to list')
    }
}

export const removeStockFromList = async (req, res) => {
    const userId = req.params.userId
    const listId = req.params.listId
    const stock = req.params.stockId
    const user = await User.findById(userId)
    const list = user.lists.id(listId)
    list.stocks = list.stocks.filter(el => el !== stock)
    

    try {
        user.save()
        res.status(200).json(user)
    } catch (error) {
        
        return res.status(400).json('Could not remove from list')
    }
}

export const addList = async (req, res) => {
    const list = req.body
    const userId = req.params.id
    
    try {

        const user = await User.findById(userId)
        user.lists.push(list)
        await user.save()

        res.status(200).json(user)  
    } catch (error) {
        
        return res.status(400).json('Could not add list')
    }
}

export const deleteList = async (req, res) => {
    const listId = req.params.listId
    const userId = req.params.userId

    const user = await User.findById(userId)
    const list = user.lists.id(listId)

    try {
        list.remove()
        await user.save()

        res.status(200).json(user)
    } catch (error) {
        
        return res.status(400).json('Could not remove list')
    }
}

export const getCurrentPortfolioValue = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id, 'portfolio cash')
        const symbols = user.portfolio.map(holding => holding.ticker.toLowerCase()).join()
        const { data } = await axios.get(`https://cloud.iexapis.com/v1/stock/market/quote/latestprice/batch?token=${apiKey}&symbols=${symbols}&filter=latestPrice,symbol`)
        let value = 0
        user.portfolio.forEach(holding => {
            const stock = data.find(stock => stock.symbol === holding.ticker)
            value = value + stock.latestPrice * holding.shares
        })

        const date = new Date 
        const str = date.toLocaleDateString('en-us')
        

        res.status(200).json({value: Number(value.toFixed(2)) + user.cash, date: str})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getHistoricalPortfolioValue = async (req, res) => {

    
    
    const { id } = req.params
    const { range } = req.query

    function calculateDaysSoFar(){
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    let totalDays = 0

    switch(range){
        case "3m":
            totalDays = 90
            break
        case "6m":
            totalDays = 180
            break
        case "1m":
            totalDays = 30
            break
        case "ytd":
            console.log("hit")
            totalDays = calculateDaysSoFar()
        default:
            totalDays = 30
    }

    if(range === "ytd"){
        totalDays = calculateDaysSoFar()
    }

    try {
        const { historicalPortfolioValue } = await User.findById(id, 'historicalPortfolioValue')
        const timeRangePortfolioValue = historicalPortfolioValue.slice(historicalPortfolioValue.length - totalDays)
        let arr = []

        // timeRangePortfolioValue.forEach((point) => {
        //     arr.push({
        //         name: point.date,
        //         value: point.value
        //     })
        // })
    
        // arr.push({name: currentData.date, value: currentData.value})

        res.status(200).json(timeRangePortfolioValue)
    } catch (error) {
        
        res.status(500).json(error)
    }
}

export const getPortfolioData = async (req, res) => {
    const { id } = req.params
    
    try {
        const { portfolio } = await User.findById(id, 'portfolio')
        const symbols = portfolio.map(holdings => holdings.ticker).join()
        const { data } = await axios.get(`https://cloud.iexapis.com/v1/stock/market/quote/latestprice/batch?token=${apiKey}&symbols=${symbols}&filter=symbol,latestPrice,changePercent`)

        const adjustedWithSharesOwned = []

        data.map(stock => {
            const holding = portfolio.find(holding => holding.ticker === stock.symbol)
            stock["sharesOwned"] = holding.shares
            stock["_id"] = holding._id
            adjustedWithSharesOwned.push(stock)
        })
        
        res.status(200).json(adjustedWithSharesOwned)
    } catch (error) {
     
        res.status(500).json(error)
    }
}

export const updatePosition = async (req, res) => {
    const { id, positionId } = req.params 
    const data = req.body 
    try {
        const user = await User.findById(id, 'portfolio cash') 
        const position = user.portfolio.id(positionId)
        if(position.shares + data.adjustment < 0){
            console.log("You can't sell more shares than you own")
            return res.status(400).json("You can't sell more shares than you own")
        }
        if(position.shares + data.adjustment === 0){
            position.remove()
            user.cash = user.cash + data.price
            await user.save()
            return res.status(200).json(user)
        }
        position.shares = position.shares + data.adjustment
        user.cash = user.cash + data.price
        await user.save()

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const createPosition = async (req, res) => {
    const { id } = req.params 
    const { cost, ticker, shares } = req.body 
    try {
        const user = await User.findById(id, 'portfolio cash')
        user.portfolio.push({ticker, shares})
        user.cash = user.cash + cost
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getUserPosition = async (req, res) => {
    const { id, symbol } = req.params 

    try {
        const user = await User.findById(id, 'portfolio')
        const holding = user.portfolio.find(holding => holding.ticker === symbol)
        res.status(200).json(holding)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}




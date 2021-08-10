import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.API_KEY

export const getCompany = async (req, res) => {

    const symbol = req.params.symbol


    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${apiKey}&symbols=${symbol}`)
        res.status(200).json(stock.data)
    } catch (error) {
        console.error(error)
    }
}

export const getStockPrices = async (req, res) => {

    console.log("News")

    const symbols = req.params.symbol

    try {
        const stock = await axios.get(`https://cloud.iexapis.com/v1/stock/market/quote/latestprice/batch?token=${apiKey}&symbols=${symbols}`)
        res.status(200).json(stock.data)
    } catch (error) {
        res.status(400).json(error.error)
    }
    
}

export const getLatestPrice = async (req, res) => {

    const symbol = req.params.symbol

    try {
        const price = await axios(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=${apiKey}&symbols=${symbol}`)
        res.status(200).json(price.data)
    } catch (error) {
        res.status(400).json(error.error)
    }
}

export const addStockToUser = async (req, res) => {
    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/tops?token=${apiKey}&symbols=aapl`)
        res.status(200).json(stock.data)
    } catch (error) {
        
    }
}

export const search = async (req, res) => {
    const fragment = req.params.fragment

    try {
       const results = await axios.get(`https://cloud.iexapis.com/stable/search/${fragment}?token=${apiKey}`)
       res.status(200).json(results.data)
    } catch (error) {
        
    }
}

export const getHistoricalData = async (req, res) => {
    const id = req.params.id

    try {
        const data = await axios.get(`https://cloud.iexapis.com/stable/stock/${id}/chart/ytd?token=${apiKey}`)

        res.status(200).json(data.data)
    } catch (error) {
        res.status(400).json('Could not get data')
    }
}

export const getNews = async (req, res) => {
    console.log(req.query.ass)
    const symbol = req.params.id
    try {
        const news = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/news?token=${apiKey}`)

        res.status(200).json(news.data)
    } catch (error) {
        
    }
}
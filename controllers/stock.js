import axios from 'axios'

export const getCompany = async (req, res) => {

    const symbol = req.params.symbol


    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_abbd9e2e259e413ea2d01686156d5746&symbols=${symbol}`)
        res.status(200).json(stock.data)
    } catch (error) {
        console.error(error)
    }
}

export const getStockPrices = async (req, res) => {

    const symbols = req.params.symbol

    try {
        const stock = await axios.get(`https://cloud.iexapis.com/v1/stock/market/previous/batch?token=pk_abbd9e2e259e413ea2d01686156d5746&symbols=${symbols}&types=chart`)
        res.status(200).json(stock.data)
    } catch (error) {
        res.status(400).json(error.error)
    }
    
}

export const getLatestPrice = async (req, res) => {

    const symbol = req.params.symbol

    try {
        const price = await axios(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=pk_abbd9e2e259e413ea2d01686156d5746&symbols=${symbol}`)
        res.status(200).json(price.data)
    } catch (error) {
        res.status(400).json(error.error)
    }
}

export const addStockToUser = async (req, res) => {
    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/tops?token=pk_abbd9e2e259e413ea2d01686156d5746&symbols=aapl`)
        res.status(200).json(stock.data)
    } catch (error) {
        
    }
}

export const search = async (req, res) => {
    const fragment = req.params.fragment

    try {
       const results = await axios.get(`https://cloud.iexapis.com/stable/search/${fragment}?token=pk_abbd9e2e259e413ea2d01686156d5746`)
       res.status(200).json(results.data)
    } catch (error) {
        
    }
}

export const getHistoricalData = async (req, res) => {
    const id = req.params.id

    try {
        const data = await axios.get(`https://cloud.iexapis.com/stable/stock/${id}/chart/ytd?token=pk_abbd9e2e259e413ea2d01686156d5746`)

        res.status(200).json(data.data)
    } catch (error) {
        res.status(400).json('Could not get data')
    }
}
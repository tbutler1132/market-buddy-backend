import axios from 'axios'

export const getCompany = async (req, res) => {

    const symbol = req.params.symbol

    console.log(symbol)

    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_abbd9e2e259e413ea2d01686156d5746&symbols=${symbol}`)
        res.status(200).json(stock.data)
    } catch (error) {
        console.error(error)
    }
}

export const getStockPrices = async (req, res) => {

    console.log(req.params.symbol)
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
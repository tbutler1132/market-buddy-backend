import axios from 'axios'

export const getCompany = async (req, res) => {
    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/stock/aapl/company?token=pk_abbd9e2e259e413ea2d01686156d5746&symbols=aapl`)
        res.status(200).json(stock.data)
    } catch (error) {
        console.error(error)
    }
}

export const getStockPrices = async (req, res) => {
    
}

export const addStockToUser = async (req, res) => {
    try {
        const stock = await axios.get(`https://cloud.iexapis.com/stable/tops?token=pk_abbd9e2e259e413ea2d01686156d5746&symbols=aapl`)
        res.status(200).json(stock.data)
    } catch (error) {
        
    }
}
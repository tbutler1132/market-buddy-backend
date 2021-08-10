import express from 'express'

import { getCompany, getStockPrices, getLatestPrice, search, getHistoricalData, getNews } from '../controllers/stock.js'


const router = express.Router()

router.get('/company/:symbol', getCompany)
router.get('/:symbol', getStockPrices)
router.get('/latestPrice/:symbol', getLatestPrice)
router.get('/search/:fragment', search)
router.get('/historical/:id', getHistoricalData)
router.get('/news/:id', getNews)


export default router
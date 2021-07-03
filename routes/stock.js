import express from 'express'

import { getCompany, getStockPrices, getLatestPrice } from '../controllers/stock.js'


const router = express.Router()

router.get('/company/:symbol', getCompany)
router.get('/:symbol', getStockPrices)
router.get('/latestPrice/:symbol', getLatestPrice)


export default router
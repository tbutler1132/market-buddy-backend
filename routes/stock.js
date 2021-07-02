import express from 'express'

import { getCompany, getStockPrices } from '../controllers/stock.js'


const router = express.Router()

router.get('/', getCompany)
router.get('/:symbol', getStockPrices)


export default router
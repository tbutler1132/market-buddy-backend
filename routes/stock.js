import express from 'express'

import { getCompany, getStockPrices, getLatestPrice, search, getHistoricalData, getNews, getMostActive, getCollection, getFinancials,
    getTags, getAnalystRatings 
} from '../controllers/stock.js'


const router = express.Router()

router.get('/company/:symbol', getCompany)
router.get('/ratings/:symbol', getAnalystRatings)
router.get('/tags', getTags)
router.get('/financials/:symbol', getFinancials)
router.get('/:symbol', getStockPrices)
router.get('/latestPrice/:symbol', getLatestPrice)
router.get('/search/:fragment', search)
router.get('/historical/:id', getHistoricalData)
router.get('/collection/:type', getMostActive)
router.get('/collection/tag/:type', getCollection)
router.get('/news/:id', getNews)


export default router
import express from 'express'

import { getUser, createUser, addStockToPortfolio, deleteStockFromPortfolio, updateStock, updateUserCash, addStockToList, removeStockFromList, addList, 
        signin, signup, deleteList, loginDemo, getCurrentPortfolioValue, getHistoricalPortfolioValue,
        getPortfolioData, updatePosition, createPosition, getUserPosition

} from '../controllers/user.js'

import auth from '../middleware/auth.js'


const router = express.Router()

router.get('/:id', getUser)
router.get('/:id/currentPortfolioValue', getCurrentPortfolioValue)
router.post('/', createUser)
router.post('/:id/stocks', addStockToPortfolio)
router.delete('/:userId/stocks/:stockId', deleteStockFromPortfolio)
router.patch('/:userId/stocks/:stockId', updateStock)
router.patch('/:id/cash', updateUserCash)
router.patch('/:userId/lists/:listId', addStockToList)
router.delete('/:userId/lists/:listId/:stockId', removeStockFromList)
router.post('/:id/lists', addList)
router.delete('/:userId/lists/:listId', deleteList)

router.get('/:id/historicalPortfolioValue', getHistoricalPortfolioValue)
router.get('/:id/portfolioData', getPortfolioData)
router.patch('/:id/transaction/:positionId', updatePosition)
router.get('/:id/portfolio/:symbol', getUserPosition)
router.post('/:id/transaction', createPosition)

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/demo', loginDemo)



export default router
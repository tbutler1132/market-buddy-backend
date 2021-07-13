import express from 'express'

import { getUser, createUser, addStockToPortfolio, deleteStockFromPortfolio, updateStock, updateUserCash, addStockToList, removeStockFromList, addList, 
        signin, signup, deleteList

} from '../controllers/user.js'

import auth from '../middleware/auth.js'


const router = express.Router()

router.get('/:id', auth, getUser)
router.post('/', createUser)
router.post('/:id/stocks', addStockToPortfolio)
router.delete('/:userId/stocks/:stockId', deleteStockFromPortfolio)
router.patch('/:userId/stocks/:stockId', updateStock)
router.patch('/:id/cash', updateUserCash)
router.patch('/:userId/lists/:listId', addStockToList)
router.delete('/:userId/lists/:listId/:stockId', removeStockFromList)
router.post('/:id/lists', addList)
router.delete('/:userId/lists/:listId', deleteList)

router.post('/signin', signin)
router.post('/signup', signup)



export default router
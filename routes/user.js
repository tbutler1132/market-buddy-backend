import express from 'express'

import { getUser, createUser, addStockToPortfolio, deleteStockFromPortfolio, updateStock, updateUserCash } from '../controllers/user.js'


const router = express.Router()

router.get('/:id', getUser)
router.post('/', createUser)
router.post('/:id/stocks', addStockToPortfolio)
router.delete('/:userId/stocks/:stockId', deleteStockFromPortfolio)
router.patch('/:userId/stocks/:stockId', updateStock)
router.patch('/:id/cash', updateUserCash)


export default router
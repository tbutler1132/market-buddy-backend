import express from 'express'

import { getUser, createUser, addStockToPortfolio } from '../controllers/user.js'


const router = express.Router()

router.get('/:id', getUser)
router.post('/', createUser)
router.post('/:id/stocks', addStockToPortfolio)


export default router
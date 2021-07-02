import express from 'express'

import { getCompany } from '../controllers/stock.js'


const router = express.Router()

router.get('/', getCompany)


export default router
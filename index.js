import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
//
dotenv.config()
const mdb = process.env.MONGO_DB_URI
const apiKey = process.env.API_KEY

import stockRoutes from './routes/stock.js'
import userRoutes from './routes/user.js'

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/stocks', stockRoutes)
app.use('/users', userRoutes)

const CONNECTION_URL = `${mdb}`

const PORT = process.env.PORT|| 7000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.get('/', (req, res) => {
    res.send('I am running')
})

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", `Accept: text/event-stream' 'https://cloud-sse.iexapis.com/stable/news-stream?token=${apiKey}&symbols=spy`)
  console.log(res)
  res.write("data: " + `${res}\n\n`)
})


mongoose.set('useFindAndModify', false);
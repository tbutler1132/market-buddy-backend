import  Decimal128  from 'bson'
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const transactionSchema = new Schema(
    {
        buy: Boolean,
        ticker: String,
        shares: Number
    },
    {
        timestamps: true
    }
)

const userSchema = new Schema( 
    {
        username: {type: String, unique: true},
        password: String,
        portfolio: [{
            ticker: String,
            shares: Number,
        }],
        cash: {type: Number, default: 10000, min: [0, 'Not enough cash']},
        lists: [{
            title: String,
            stocks: [String]
        }],
        historicalPortfolioValue: [{
            value: Number,
            date: String
        }], 
    },
    {
        timestamps: true
    }
)

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

export default User

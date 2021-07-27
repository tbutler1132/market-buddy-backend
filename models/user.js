import  Decimal128  from 'bson'
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const userSchema = new Schema( 
    {
        username: {type: String, unique: true},
        password: String,
        portfolio: [{
            ticker: String,
            shares: Number,
        }],
        cash: {type: Number, default: 10000},
        lists: [{
            title: String,
            stocks: [String]
        }],
        historicalPortfolioValue: [{
            value: Number,
            date: Date
        }]
        
    },
    {
        timestamps: true
    }
)

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

export default User

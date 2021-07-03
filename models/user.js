import  Decimal128  from 'bson'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const stockSchema = new Schema(
//     {
//         symbol: String,
//         lastSalePrice: Decimal128,
//         ceo: String,
//         state: String,
//         city: String,
//         employees: String,
//         ticker: String,
//         description: String,
//         historicalValues: {
//             date: Date,
//             value: Decimal128
//         }
//     }
// )

// const transactionSchema = new Schema(
//     {
//         type: String,
//         price: Decimal128
//     }
// )

const userSchema = new Schema( 
    {
        username: String,
        password: String,
        portfolio: [{
            ticker: String,
            shares: Number,
        }],
        cash: {type: Number, default: 10000.21},
        lists: [{
            title: String,
            stocks: [String]
        }],
        // transactions: [{
        //     transactionType: String,
        //     ticker: String,
        //     value: Number,
        //     createdAt: {type: Date, default: new Date()}
        // }],
        historicalPortfolioValue: [{
            value: Number,
            date: Date
        }]
        
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User


// {
// 	"username": "tbutler1132",
// 	"password": "1234",
// 	"portfolio": [
// 		"AAPL"
// 	],
// 	"lists": [{
// 		"title": "First List",
// 		"stocks": [
// 			"TSLA"
// 		]
// 	}],
// 	"transactions": [{
// 		"transactionType": "buy",
// 		"ticker": "AAPL",
// 		"value": 130.12
// 	}],
// 	"historicalPortfolioValue": [{
// 		"value": 134.00,
// 		"date": "2021-06-30"
// 	}]
// }
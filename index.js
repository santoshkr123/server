const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const Razorpay = require("razorpay")

const instance = new Razorpay({
    key_id: 'rzp_test_twbvrVkvl7ZYGz',
    key_secret: 'uWR6Bjsn8bGP3pzPujRVafxR'
})

app.listen(8080)
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/order', async (req, res)=>{
    try {
        const newOrder = await instance.orders.create({
            amount: (req.body.amount*100),
            receipt: 'CO_RP_'+Date.now()
        })
        res.json({
            amount: newOrder.amount,
            orderId: newOrder.id
        })
    }
    catch(err)
    {

        res.status(500).json(err)
    }
})
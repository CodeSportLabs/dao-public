import {Client} from 'square'
import {randomUUID} from 'crypto'
BigInt.prototype.toJSON = function(){ return this.toString()}

const {paymentsApi} = new Client({
    accessToken: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN,
    environment: 'sandbox'
})

export default async function handler(req, res) {
    if (req.method === 'POST'){
    
        const {result} = await paymentsApi.createPayment({     
            idempotencyKey: randomUUID(),
            sourceId: req.body.sourceId,
            amountMoney: { currency:'USD', amount:55}
        })

         console.log(result)
         res.status(200).json(result)
    } else{
    console.log(process.env.SQUARE_ACCESS_TOKEN)
        res.status(500).send()
    }

}

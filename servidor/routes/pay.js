import Stripe from "stripe";//portal de pagos para conectarse a su api
const striper = Stripe('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');//clave de acceso stripe para recibir el pago

//router.post("/payment", (req,res)=>{
//    let costumer = stripe.costumer
//})


//funcion que permite conectarse a la api y realizar los pagos
export const pay = async (req,res) => {
    let {amount, id} = req.body
    try {
        const payment = await striper.paymentIntents.create({
            amount,
            currency: 'COP',
            description: 'shop',
            payment_method: id,
            confirm: true
        })

        console.log('payment', payment);
        res.json({
            message: 'payment succesful',
            succes: true
        })
    } catch (error) {
        console.log('error', error);
        res.json({
            message:'payment failed',
            succes: false
        })
    }
}
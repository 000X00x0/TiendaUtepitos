import Stripe from "stripe";  // Se importa la biblioteca Stripe para conectarse a su API de pagos

const striper = Stripe('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');  // Se crea una instancia de Stripe y se proporciona la clave de acceso

// Función que permite conectarse a la API de Stripe y realizar los pagos
export const pay = async (req, res) => {
    let { amount, id } = req.body;  // Se obtienen la cantidad y el ID del pago desde el cuerpo de la solicitud

    try {
        const payment = await striper.paymentIntents.create({
            amount,  // Cantidad del pago
            currency: 'COP',  // Moneda (en este caso, pesos colombianos)
            description: 'shop',  // Descripción del pago
            payment_method: id,  // Método de pago (ID del método)
            confirm: true  // Confirmar el pago automáticamente
        });

        console.log('payment', payment);  // Se muestra la respuesta del pago en la consola
        res.json({
            message: 'payment successful',  // Respuesta de éxito del pago
            success: true
        });
    } catch (error) {
        console.log('error', error);  // Se muestra el error en caso de que ocurra
        res.json({
            message: 'payment failed',  // Respuesta de fallo del pago
            success: false
        });
    }
};

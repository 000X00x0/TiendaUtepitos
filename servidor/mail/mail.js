import nodemailer from 'nodemailer'; //se improta la libreria nodemailer que permite el facil envio de correo

//El transportador, simplemente una receta de cocina en la cual SMTP protocolo simple de transferencia de correo
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'utpitos@gmail.com',
        pass: 'nzzuagemljlsojpb'
    }
});

//funcion que envia el correo con el contenido usando la libreria de mailer

export const sendMail = prod => {
    transporter.sendMail({
        from: "UTPitos <utpitos@gmail.com",
        to: "juan.ganan@utp.edu.co",
        subject: "Stock at its minimun",
        text: `The following product's stock which id's is${prod.id}. is almost empty`
    }).then(console.info)
    .catch(console.catch)
}


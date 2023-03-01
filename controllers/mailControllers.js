import nodemailer from 'nodemailer';

const sendMail = async (req, res) => {
    const { name, email, message } = req.body;

    const contentHTML = `
        <h1>Formulario de Contacto</h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Email: ${email}</li>
        </ul>
        <p>${message}</p>
    `

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        })

        const mailOptions = {
            from: process.env.USER,
            to: process.env.USER,
            subject: 'Mensaje de contacto!',
            html: contentHTML
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log('Error', error)
            } else {
                console.log('Email enviado' + info.response);
                res.status(201).json({ msg: 'El mensaje de contacto fue enviado correctamente. ¡Me pondré en contacto contigo a la brevedad!', status: 201, info });
            }
        })
    } catch (error) {
        res.status(201).json({ status: 401, error });
    }
}

export { sendMail }
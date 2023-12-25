import nodemailer from 'nodemailer'

const transpoter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    },

})

const sendMail = async (email, subject, html) => {

    console.log(email, subject, html)


    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject,
        html
    }

    try {
        await transpoter.sendMail(mailOptions)
        return true
    } catch (error) {
        return false
    }
}


export { sendMail }
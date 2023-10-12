import nodemailer, { Transporter } from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
import dotenv from 'dotenv';

dotenv.config();

interface EmailOption {
    email: string,
    subject: string,
    template: string,
    data: { [key: string]: any }
}

const sendMail = async (option: EmailOption): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const { email, subject, template, data } = option

    // Get the path template email file
    const templatePath = path.join(__dirname, '../mails', template)

    // Render email template to ejs
    const html: string = await ejs.renderFile(templatePath, data)

    // Send the Email
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    }
    await transporter.sendMail(mailOptions)
}

export default sendMail
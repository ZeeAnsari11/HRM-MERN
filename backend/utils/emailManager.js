import nodemailer from 'nodemailer';

export const sendEmail = (options, res, next) => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
    });
    const message = {
        from : `${process.env.SMTP_ADMIN_NAME} <${process.env.SMTP_ADMIN_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.resetPswdEmail
    }
    transport.sendMail(message)
    .then(() => {
        res.status(200).json({
            success:true,
            message: `Email sent to ${options.email}`
        })
    })
    .catch((error) => next({error:error, statusCode:404}));
}
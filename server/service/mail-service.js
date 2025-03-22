const nodemailer = require("nodemailer");

//апи у гугла поменялось, ленб разбираться в той технологии, которую использовать не буду

class MailService {
    /*
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    */
    async sendActivationMail(to, link){
        /*
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activation account on " + process.env.API_URL,
            text: "",
            html: 
                `
                    <div>
                        <h1>For activation go to link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
        */
    }

}

module.exports = new MailService();
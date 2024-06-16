import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: +process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    async sendMail (to: string, subject: string, text: string) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to,
            subject,
            text
        };

        await this.transporter.sendMail(mailOptions);
    }
}
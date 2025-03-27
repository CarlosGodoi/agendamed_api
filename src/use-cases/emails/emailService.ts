import SMTP_CONFIG from '../../config/smtp';
import nodemailer, { Transporter } from 'nodemailer';


interface EmailData {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export class EmailService {
    private transporter!: Transporter;

    constructor() {
        this.configureTransporter();
    }

    private configureTransporter(): void {
        this.transporter = nodemailer.createTransport(SMTP_CONFIG);
    }

    async sendEmail({ to, subject, text, html }: EmailData): Promise<{ messageId: string }> {
        try {
            if (!this.transporter) {
                throw new Error('Transporter não configurado');
            }

            const mailOptions = {
                from: 'Agenda_Med <agendamed@test.com>',
                to,
                subject,
                text,
                html
            };

            const info = await this.transporter.sendMail(mailOptions);
            return { messageId: info.messageId };

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao enviar email: ${error.message}`);
            }
            throw new Error('Erro desconhecido ao enviar email');
        }
    }

    async verifyConnection(): Promise<boolean> {
        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.error('Erro na verificação da conexão:', error);
            return false;
        }
    }
}
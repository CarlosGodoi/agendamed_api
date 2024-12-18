import { env } from "."

const SMTP_CONFIG = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
        user: env.USER_MAIL,
        pass: env.USER_PASS_MAIL
    },
    debug: true,
    logger: true,
}

export default SMTP_CONFIG
import { EmailService } from "./emailService";


async function testEmailService() {
    const emailService = new EmailService();

    // Primeiro, verifica a conexão
    console.log('Verificando conexão com o servidor SMTP...');
    const isConnected = await emailService.verifyConnection();

    if (!isConnected) {
        console.error('❌ Falha na conexão com o servidor SMTP');
        return;
    }

    console.log('✅ Conexão SMTP estabelecida com sucesso');

    // Tenta enviar um email de teste
    try {
        const result = await emailService.sendEmail({
            to: 'edu85godoi@gmail.com', // Coloque aqui o email que receberá o teste
            subject: 'Teste de Envio de Email',
            text: 'Este é um email de teste enviado através do Mailtrap',
            html: `
                <h1>Email de Teste</h1>
                <p>Este é um email de teste enviado através do Mailtrap.</p>
                <p>Se você está vendo esta mensagem, o serviço está funcionando corretamente!</p>
                <br>
                <p>Enviado em: ${new Date().toLocaleString()}</p>
            `
        });

        console.log('✅ Email enviado com sucesso!');
        console.log('ID da mensagem:', result.messageId);
    } catch (error) {
        console.error('❌ Erro ao enviar email:', error);
    }
}

// Executa o teste
testEmailService()
    .then(() => console.log('Teste finalizado'))
    .catch(console.error);
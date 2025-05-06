using BookLib.Models;
using MailKit.Net.Smtp;
using MimeKit;


namespace BookLib.Application.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;

        public EmailService(EmailSettings settings)
        {
            _settings = settings;
        }

        public async Task SendEmail(EmailMessage emailMessage)
        {
            var email = CreateEmailMessage(emailMessage);
            await Send(email);
        }

        private MimeMessage CreateEmailMessage(EmailMessage message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_settings.DisplayName, _settings.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };

            return emailMessage;
        }

        private async Task Send(MimeMessage mailMessage)
        {
            using var client = new SmtpClient();
            try
            {
                client.Connect(_settings.SmtpServer, _settings.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_settings.Username, _settings.Password);

                client.Send(mailMessage);
            }
            catch (Exception ex)
            {
                client.Disconnect(true);
                client.Dispose();
                //   _logger.LogError(ex);
                throw new Exception("Could not send email", ex);
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }

    }
}

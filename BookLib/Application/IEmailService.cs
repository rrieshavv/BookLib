using BookLib.Models;

namespace BookLib.Application
{
    public interface IEmailService
    {
        void SendEmail(EmailMessage emailMessage);
    }
}

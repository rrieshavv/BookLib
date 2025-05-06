using BookLib.Models;

namespace BookLib.Application
{
    public interface IEmailService
    {
        Task SendEmail(EmailMessage emailMessage);
    }
}

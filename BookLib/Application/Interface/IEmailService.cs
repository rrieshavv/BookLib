using BookLib.Infrastructure.Common;

namespace BookLib.Application.Interface
{
    public interface IEmailService
    {
        Task SendEmail(EmailMessage emailMessage);
    }
}

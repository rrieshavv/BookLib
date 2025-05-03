using BookLib.Application.DTOs.Auth;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IUserService
    {
        Task<CommonResponse<LoginResponse>> Login (string username, string password);


    }
}

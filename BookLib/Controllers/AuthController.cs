using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : Controller
    {
        [HttpPost("login")]
        public IActionResult Login()
        {
            return Ok();
        }


        [HttpPost("register")]
        public IActionResult Register()
        {
            return Ok();
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword()
        {
            return Ok();
        }

        [HttpGet("forgot-password")]
        public IActionResult ForgotPassword()
        {
            return Ok();
        }

    }
}

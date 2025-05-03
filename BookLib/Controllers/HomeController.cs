using BookLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            CommonResponse response = new CommonResponse();
            return Ok(response);
        }
    }
}

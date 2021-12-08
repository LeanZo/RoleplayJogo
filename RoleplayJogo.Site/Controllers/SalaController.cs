using Microsoft.AspNetCore.Mvc;

namespace RoleplayJogo.Site.Controllers
{
    public class SalaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

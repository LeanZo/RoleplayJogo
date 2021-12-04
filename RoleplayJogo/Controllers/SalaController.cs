using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RoleplayJogo.Controllers
{
    public class SalaController : Controller
    {
        // GET: Sala
        public ActionResult Index(int id)
        {
            return View();
        }
    }
}
using RoleplayJogo.Database;
using RoleplayJogo.Database.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace RoleplayJogo.Controllers
{
    public class AutenticacaoController : Controller
    {
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");
            else
                return RedirectToAction("Login");

        }

        public ActionResult Login(bool ExibirConfirmacaoEmail = false, bool ExibirErroDeLogin = false)
        {
            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            TempData["ExibirConfirmacaoEmail"] = ExibirConfirmacaoEmail;
            TempData["ExibirErroDeLogin"] = ExibirErroDeLogin;

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Usuario usuario)
        {
            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool IsValidUser = new UsuarioCore().VerificarUsuarioValido(usuario);

                if (IsValidUser)
                {
                    FormsAuthentication.SetAuthCookie(usuario.USU_LOGIN, true);
                    return RedirectToAction("Index", "Home");
                }
            }
            ModelState.AddModelError("", "invalid Username or Password");
            return RedirectToAction("Login");
        }

        public ActionResult Registrar()
        {
            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Home");

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Registrar(Usuario usuario)
        {
            var sucesso = false;
            var erroAoCadastrar = false;
            var usuarioJaExiste = false;

            if (ModelState.IsValid)
            {
                var usuarioCore = new UsuarioCore();

                if (!usuarioCore.VerificarSeUsuarioExistePorLogin(usuario.USU_LOGIN))
                {
                    try
                    {
                        usuario.USU_SENHA = BCrypt.Net.BCrypt.HashPassword(usuario.USU_SENHA);
                        usuarioCore.Inserir(usuario);
                        sucesso = true;
                    } 
                    catch(Exception)
                    {
                        erroAoCadastrar = true;
                    }
                }
                else
                {
                    usuarioJaExiste = true;
                }
            }
            else
            {
                erroAoCadastrar = true;
            }

            var resposta = new
            {
                sucesso,
                erroAoCadastrar,
                usuarioJaExiste
            };

            var json_result = Json(resposta, JsonRequestBehavior.AllowGet);
            json_result.MaxJsonLength = int.MaxValue;
            return json_result;
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }
    }
}
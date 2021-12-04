using System.Linq;

namespace RoleplayJogo.Database.Core
{
    public class UsuarioCore : DefaultCore<Usuario>
    {
        public bool VerificarUsuarioValido(Usuario usuario)
        {
            string hashedPassword;
            hashedPassword = (from usu in Contexto
                              where usu.USU_LOGIN.ToLower() == usuario.USU_LOGIN.ToLower()
                              select usu.USU_SENHA).FirstOrDefault();

            if (string.IsNullOrEmpty(hashedPassword))
                return false;
            else
                return BCrypt.Net.BCrypt.Verify(usuario.USU_SENHA, hashedPassword);
        }

        public bool VerificarSeUsuarioExistePorLogin(string login)
        {
            return (from usu in Contexto select usu)
                   .Any(u => u.USU_LOGIN.ToLower() == login.ToLower());
        }
    }
}

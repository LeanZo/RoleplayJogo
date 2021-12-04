using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoleplayJogo.Database.Core
{
    public abstract class DefaultCore<T> where T : class, IBaseClass
    {
        protected readonly RoleplayJogoEntities Context;

        public DefaultCore()
        {
            Context = new RoleplayJogoEntities();
        }

        public IQueryable<T> Contexto
        {
            get { return (IQueryable<T>)Context.Set(typeof(T)).AsQueryable(); }
        }

        public T RetornarPorId(int Id)
        {
            return (from c in Contexto
                    where c.ID == Id
                    select c).FirstOrDefault();
        }

        public List<T> RetornarTodos()
        {
            return (from c in Contexto
                    select c).ToList();
        }

        public long Inserir(T objeto)
        {
            try
            {
                Context.Set(typeof(T)).Add(objeto);
                Context.SaveChanges();

                return objeto.ID;
            }
            catch(Exception)
            {
                return -1;
            }

        }
    }
}

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RoleplayJogo.Database
{
    using System;
    using System.Collections.Generic;
    
    using RoleplayJogo.Database.Core;
    
    public partial class Ficha : IBaseClass
    {
        public long ID { get; set; }
        public Nullable<long> FIC_SAL_ID { get; set; }
        public Nullable<long> FIC_USU_ID { get; set; }
        public Nullable<bool> FIC_ATIVO { get; set; }
        public Nullable<System.DateTime> FIC_DATA_CRIACAO { get; set; }
    
        public virtual Sala Sala { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}

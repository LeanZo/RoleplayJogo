using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RoleplayJogo
{
    public class DiceHub : Hub
    {
        public void RollDice(string Notation)
        {
            Clients.All.rollDice(Notation);
        }
    }
}
using Microsoft.AspNetCore.SignalR;

namespace RoleplayJogo.Site.Hubs
{
    public class DiceHub : Hub
    {
        public void RollDice(string Notation)
        {
            Clients.All.SendAsync("rollDice", Notation);
        }
    }
}

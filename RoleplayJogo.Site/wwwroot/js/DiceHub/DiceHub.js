$(function () {
    // Reference the auto-generated proxy for the hub.
    DiceHub = new signalR.HubConnectionBuilder().withUrl("/diceHub").build();

    // Create a function that the hub can call back to display messages.
    DiceHub.on("rollDice", function (notation) { RollDice(false, notation) });

    // Start the connection.
    DiceHub.start().then(function () {
        // Call the Send method on the hub.
        //DiceHub.server.rollDice();
    }).catch(function (err) {
        return console.error(err.toString());
    });

    //document.getElementById("sendButton").addEventListener("click", function (event) {
    //    var user = document.getElementById("userInput").value;
    //    var message = document.getElementById("messageInput").value;
    //    DiceHub.invoke("SendMessage", user, message).catch(function (err) {
    //        return console.error(err.toString());
    //    });
    //    event.preventDefault();
    //});
});

$(function () {
    // Reference the auto-generated proxy for the hub.
    DiceHub = $.connection.diceHub;
    // Create a function that the hub can call back to display messages.
    DiceHub.client.rollDice = function (notation) { RollDice(false, notation) };

    // Start the connection.
    $.connection.hub.start().done(function () {
            // Call the Send method on the hub.
            //DiceHub.server.rollDice();
    });
});

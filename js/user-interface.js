/**
 * JQUERY
 */
 
$(document).ready(function() {

  // Initialize a new game
  var game = new Game();

  $('.square').click(function() {
    $(this).text(game.currentPlayer.mark);
    game.switchPlayer();
  });
});
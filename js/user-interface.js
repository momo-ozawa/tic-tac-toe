/**
 * JAVASCRIPT
 */


/**
 * JQUERY
 */
 
$(document).ready(function() {

  // Initialize a new game
  var game = new Game();

  $('.square').click(function() {
    if (!($(this).hasClass('marked'))) {
      $(this).text(game.currentPlayer.mark);
      $(this).addClass('marked');
      game.switchPlayer();
    }
  });
});
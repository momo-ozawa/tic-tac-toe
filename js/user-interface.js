/**
 * JAVASCRIPT
 */

function convertValueToIntArray(value) {
  return value.split('').map(
    function(n) { return parseInt(n) }
  );
}

/**
 * JQUERY
 */
 
$(document).ready(function() {

  // Initialize a new game
  var game = new Game();

  $('.square').click(function() {
    if (!($(this).hasClass('marked'))) {
      // Mark space in game.board as taken by current player
      var selectedSquare = $(this).attr('id');
      var coordinates = convertValueToIntArray(selectedSquare);
      var xCoordinate = coordinates[0];
      var yCoordinate = coordinates[1];
      game.board.find(xCoordinate, yCoordinate).takenBy(game.currentPlayer);
      console.log(game.board.groups());

      // Mark a square on the web app
      $(this).text(game.currentPlayer.mark);
      $(this).addClass('marked');

      // Check if game is over; if not, switch player
      if (game.isGameOver()) {
        alert(game.gameOverMessage());
      } else {
        game.switchPlayer();
      }
    }
  });
});
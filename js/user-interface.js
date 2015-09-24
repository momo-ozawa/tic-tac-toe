/**
 * JAVASCRIPT
 */

function showWhosTurn(currentGame) {
  $('span#commentary').text(currentGame.currentPlayer.mark + "'s turn.").show();
}

function markSpaceAsTaken(currentGame, squareId) {
  var coordinates = convertValueToIntArray(squareId);
  var xCoordinate = coordinates[0];
  var yCoordinate = coordinates[1];
  currentGame.board.find(xCoordinate, yCoordinate).takenBy(currentGame.currentPlayer);
  console.log(currentGame.board.groups());
}

function convertValueToIntArray(value) {
  return value.split('').map(
    function(n) { return parseInt(n) }
  );
}

function gameOverActions(currentGame) {
  alert(currentGame.gameOverMessage());

  // Update scores
  $('span#player1score').text(currentGame.player1.score);
  $('span#player2score').text(currentGame.player2.score);
  
  // Clear board in web app
  clearBoard();

  // Start new round
  currentGame.newRound();
  showWhosTurn(currentGame);
}

function clearBoard() {
  $('.square').removeClass('marked');
  $('.square').text('');
}


/**
 * JQUERY
 */
 
$(document).ready(function() {

  // Initialize a new game
  var myGame = new Game();
  showWhosTurn(myGame);

  $('.square').click(function() {
    if (!($(this).hasClass('marked'))) {
      // Grab selected square's id
      var selectedSquareId = $(this).attr('id');

      // Mark space in game.board as taken by current player
      markSpaceAsTaken(myGame, selectedSquareId);

      // Mark a square on the web app
      $(this).text(myGame.currentPlayer.mark);
      $(this).addClass('marked');

      // Check if game is over; if not, switch player
      if (myGame.isGameOver()) {
        gameOverActions(myGame);
      } else {
        myGame.switchPlayer();
        showWhosTurn(myGame);
      }
    }
  });
});
/**
 * JAVASCRIPT
 */

function playerTakesATurn(currentGame, square) {
   if (!(square.hasClass('marked'))) {
      // Grab selected square's id
      var selectedSquareId = square.attr('id');

      // Mark space in game.board as taken by current player
      markSpaceAsTaken(currentGame, selectedSquareId);

      // Mark a square on the web app
      square.text(currentGame.currentPlayer.getSymbol());
      square.addClass('marked');

      // Check if game is over; if not, switch player
      if (currentGame.isGameOver()) {
        gameOverActions(currentGame);
      } else {
        currentGame.switchPlayer();
        showWhosTurn(currentGame);
      }
    }
}

function getSquareId(space) {
  return space.xCoordinate.toString() + space.yCoordinate.toString();
}

function markSquare(currentGame, space) {
  var squareId = getSquareId(space);
  $('#' + squareId).text(currentGame.currentPlayer.getSymbol()).addClass('marked').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(200);
}

function computerTakesATurn(currentGame) {
  var unmarkedSquares = currentGame.board.getAllUnmarked();
  var randomUnmarkedSquare = currentGame.board.getRandomUnmarkedSpace(unmarkedSquares);
  var computerWinningSpace = currentGame.findWinningSpace(currentGame.player2);
  var opponentWinningSpace = currentGame.findWinningSpace(currentGame.player1);

  if (computerWinningSpace) {
    // Mark winning space
    computerWinningSpace.takenBy(currentGame.player2);
    // Mark a square in the web app
    markSquare(currentGame, computerWinningSpace);
  } else if (opponentWinningSpace) {
    // Block opponent
    opponentWinningSpace.takenBy(currentGame.player2);
    // Mark a square in the web app
    markSquare(currentGame, opponentWinningSpace);
  } else {
    // Mark random space
    randomUnmarkedSquare.takenBy(currentGame.player2);
    // Mark a square in the web app
    markSquare(currentGame, randomUnmarkedSquare);
  }

  // Check if game is over; if not, switch player
  if (currentGame.isGameOver()) {
    gameOverActions(currentGame);
  } else {
    currentGame.switchPlayer();
    showWhosTurn(currentGame);
  }
}

function convertValueToIntArray(value) {
  return value.split('').map(
    function(n) { return parseInt(n) }
  );
}

function markSpaceAsTaken(currentGame, squareId) {
  var coordinates = convertValueToIntArray(squareId);
  var xCoordinate = coordinates[0];
  var yCoordinate = coordinates[1];
  currentGame.board.find(xCoordinate, yCoordinate).takenBy(currentGame.currentPlayer);
  console.log(currentGame.board.groups());
}

function showWhosTurn(currentGame) {
  var commentary = currentGame.currentPlayer.getSymbol() + "'s turn."
  if (currentGame.mode === "Player vs. Computer" && currentGame.currentPlayer === currentGame.player2) {
    commentary += " (Press space bar)";
  }
  $('span#commentary').text(commentary).hide().delay(300).fadeIn();
}

function gameOverActions(currentGame) {
  alert(currentGame.gameOverMessage());

  // Update scores
  $('span#player1score').text(currentGame.player1.score).hide().fadeIn();
  $('span#player2score').text(currentGame.player2.score).hide().fadeIn();
  
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

function displayMode(mode) {
  $('span#currentMode').text(mode);
}


/**
 * JQUERY
 */
 
$(document).ready(function() {
  var mode;
  var currentPlayer; 

  $('#modeSubmit').click(function() {
    $('#selectMode').hide();
    $('#playGame').fadeIn();
    mode = $('#whichMode').val();
    displayMode(mode);

    // Initialize a new game
    var game = new Game(mode);
    showWhosTurn(game);

    if (mode === 'Player vs. Computer') {   
      // Player
      $('.square').click(function() {
        if (game.currentPlayer === game.player1) {
          playerTakesATurn(game, $(this));
        }
      });
      // Computer
      $(document).keypress(function(e) {
        // If user pressed space bar
        if (game.currentPlayer === game.player2 && e.keyCode == 32) {
          computerTakesATurn(game);
        }
      });
    } else {
      $('.square').click(function() {
        playerTakesATurn(game, $(this));
      });
    }
  });
});
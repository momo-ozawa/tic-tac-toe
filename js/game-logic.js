/**
 * JAVASCRIPT
 */

/* PLAYER */

function Player(mark) {
  this.mark = mark;
  this.score = 0;
}

/* SPACE */

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.markedBy = undefined;
}

Space.prototype.takenBy = function(player) {
  this.markedBy = player;
}

/* BOARD */

function Board() {
  // Initialize a 3 x 3 array of spaces
  this.board = [];
  for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
    var row = [];
    for (var colIndex = 0; colIndex < 3; colIndex++) {
      row.push(new Space(rowIndex, colIndex));
    }
    this.board.push(row);
  }
}

Board.prototype.find = function(xCoordinate, yCoordinate) {
  return this.board[xCoordinate][yCoordinate];
}

Board.prototype.groups = function() {
  // Groups consist of rows, columns, and diagonals
  // ***Comes into use for Game.prototype.isGameOver***
  var groups = [];

  // Add rows to groups
  groups.push([this.find(0,0), this.find(0,1), this.find(0,2)]);
  groups.push([this.find(1,0), this.find(1,1), this.find(1,2)]);
  groups.push([this.find(2,0), this.find(2,1), this.find(2,2)]);

  // Add columns to groups
  groups.push([this.find(0,0), this.find(1,0), this.find(2,0)]);
  groups.push([this.find(0,1), this.find(1,1), this.find(2,1)]);
  groups.push([this.find(0,2), this.find(1,2), this.find(2,2)]);

  // Add diagonals to groups
  groups.push([this.find(0,0), this.find(1,1), this.find(2,2)]);
  groups.push([this.find(2,0), this.find(1,1), this.find(0,2)]);

  return groups;
}

Board.prototype.getAllUnmarked = function() {
  var unmarkedSpaces = [];
  for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
    for (var colIndex = 0; colIndex < 3; colIndex++) {
      var space = this.find(rowIndex, colIndex);
      if (space.markedBy === undefined) {
        unmarkedSpaces.push(space);
      }
    }
  }
  return unmarkedSpaces;
}

Board.prototype.getRandomUnmarkedSpace = function(unmarkedSpaceArray) {
  var randomIndex = Math.floor(Math.random() * (unmarkedSpaceArray.length));
  return unmarkedSpaceArray[randomIndex];
}

/* GAME */

function Game(mode) {
  this.board = new Board();
  this.player1 = new Player('X');
  this.player2 = new Player('O');
  this.currentPlayer = this.player1;
  this.winner = undefined;
  this.mode = mode;
}

Game.prototype.switchPlayer = function() {
  if (this.currentPlayer === this.player1) {
    this.currentPlayer = this.player2;
  } else {
    this.currentPlayer = this.player1;
  }
}

// /* Find and return a 'winning' space*/
// Game.prototype.findWinningSpace = function(player) {
//   oneAwayFromWinning = [player, player, undefined];
//   var groups = this.board.groups();
//   for (var i = 0; i < groups.length; i++) {
//     if (_.isEqual(oneAwayFromWinning, groups[i].sort())) {
//
//     }
//   }
// }

function getFirstElementInSet(set) {
  return set.values().next().value;
}

Game.prototype.isThreeInARow = function() {
  var groups = this.board.groups();
  for (var i = 0; i < groups.length; i++) {
    var markSet = new Set(groups[i].map(space => space.markedBy));
    if (markSet.size === 1 && !(markSet.has(undefined))) {
      this.winner = getFirstElementInSet(markSet);
      this.winner.score += 1;
      return true;
    }
  }
  return false;
}

Game.prototype.isAllMarked = function() {
  return this.board.getAllUnmarked().length === 0;
}

Game.prototype.isGameOver = function() {
  // Game is over is there is a three in a row or if there is a stale mate
  return (this.isThreeInARow() || (this.isAllMarked() && this.winner === undefined));
}

Game.prototype.gameOverMessage = function() {
  if (this.winner === undefined) {
    return 'Tie game!';
  } else {
    return this.winner.mark + ' wins!';
  }
}

Game.prototype.newRound = function() {
  // Reset board
  this.board = new Board();

  // Loser gets to go first; if it was a tie game, player1 defaults to going first
  if (this.winner !== undefined) {
    this.switchPlayer();
  } else {
    this.currentPlayer = this.player1;
  }

  // Reset winner
  this.winner = undefined;
}

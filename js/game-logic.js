/**
 * JAVASCRIPT
 */

/* PLAYER */

function Player(mark) {
  this.mark = mark;
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
  groups.push([this.find(0,0).markedBy, this.find(0,1).markedBy, this.find(0,2).markedBy]);
  groups.push([this.find(1,0).markedBy, this.find(1,1).markedBy, this.find(1,2).markedBy]);
  groups.push([this.find(2,0).markedBy, this.find(2,1).markedBy, this.find(2,2).markedBy]);

  // Add columns to groups
  groups.push([this.find(0,0).markedBy, this.find(1,0).markedBy, this.find(2,0).markedBy]);
  groups.push([this.find(0,1).markedBy, this.find(1,1).markedBy, this.find(2,1).markedBy]);
  groups.push([this.find(0,2).markedBy, this.find(1,2).markedBy, this.find(2,2).markedBy]);

  // Add diagonals to groups
  groups.push([this.find(0,0).markedBy, this.find(1,1).markedBy, this.find(2,2).markedBy]);
  groups.push([this.find(2,0).markedBy, this.find(1,1).markedBy, this.find(0,2).markedBy]);

  return groups;
}

/* GAME*/

function Game() {
  this.board = new Board();
  this.player1 = new Player('X');
  this.player2 = new Player('O');
  this.winner = undefined;
  this.currentPlayer = this.player1; 
}

Game.prototype.switchPlayer = function() {
  if (this.currentPlayer === this.player1) {
    this.currentPlayer = this.player2;
  } else {
    this.currentPlayer = this.player1;
  }
}

function getFirstElementInSet(set) {
  return set.values().next().value;
}

Game.prototype.isThreeInARow = function() {
  var groups = this.board.groups();
  for (var i = 0; i < groups.length; i++) {
    var markSet = new Set(groups[i]);
    if (markSet.size === 1 && !(markSet.has(undefined))) {
      this.winner = getFirstElementInSet(markSet);
      return true;
    }
  }
  return false;
}

Game.prototype.isAllMarked = function() {
  var groups = this.board.groups();
  for (var i = 0; i < groups.length; i++) {
    var markSet = new Set(groups[i]);
    if (markSet.has(undefined)) {
      return false;
    }
  }
  return true;
}

// game is over is there is a winner or if there is a stale mate
Game.prototype.isGameOver = function() {
  return this.isThreeInARow();
}

Game.prototype.winnerMessage = function() {
  return this.winner.mark + ' wins!';
}







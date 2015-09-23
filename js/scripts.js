/**
 * JAVASCRIPT
 */

function Player(mark) {
  this.mark = mark;
}

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.markedBy = undefined;
} 

Space.prototype.takenBy = function(player) {
  this.markedBy = player;
}

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

Board.prototype.find = function(x, y) {
  return this.board[x][y];
}

Board.prototype.groups = function() {
  // Groups consist of rows, columns, and diagonals
  // ***Comes into use for Game.prototype.isGameOver***
  groups = [];

  // Add rows to groups
  groups.push([this.board[0][0].takenBy(), this.board[0][1].takenBy(), this.board[0][2].takenBy()]);

  // Add columns to groups
  groups.push([this.board[0][0].takenBy(), this.board[1][0].takenBy(), this.board[2][0].takenBy()]);
  groups.push([this.board[0][1].takenBy(), this.board[1][1].takenBy(), this.board[2][1].takenBy()]);
  groups.push([this.board[0][2].takenBy(), this.board[1][2].takenBy(), this.board[2][2].takenBy()]);

  // Add diagonals to groups
  groups.push([this.board[0][0].takenBy(), this.board[1][1].takenBy(), this.board[2][2].takenBy()]);
  groups.push([this.board[2][0].takenBy(), this.board[1][1].takenBy(), this.board[0][2].takenBy()]);

  return groups;
}

function filterOutUndefined(array) {
  var filteredArray = array.filter(
    function(element) {return element !== undefined}
  );
  return filteredArray;
}

Board.prototype.threeInARow = function() {
  var groups = this.board.groups();
  for (group in groups) {
    var filteredGroup = filterOutUndefined(group);
    var markSet = new Set(filteredGroup);
    if (markSet.size === 1) {
      return true;
    }
  }
  return false;
}

function Game() {
  this.board = new Board();
  this.player1 = new Player('X');
  this.player2 = new Player('O');
  this.currentPlayer = this.player1; 
}

Game.prototype.switchPlayer = function() {
  if (this.currentPlayer === this.player1) {
    this.currentPlayer = this.player2;
  } else {
    this.currentPlayer = this.player1;
  }
}

Game.prototype.isGameOver = function() {
}


/**
 * JQUERY
 */

$(document).ready(function() {
  $('form#beer').submit(function(event) {
    var beerNumber = parseInt($('select#1-99').val());
    var songArray = beerSongArray(beerNumber);

    $("ul").empty();

    for (var i = 0; i < songArray.length; i++) {
      $("ul").append("<li>" + songArray[i] + "</li>");
    }

    $('#result').show();
    event.preventDefault();
  });
});
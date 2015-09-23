/**
 * JAVASCRIPT
 */

function Player(mark) {
  this.mark = mark;
}

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.markedBy;
} 

Space.prototype.takenBy = function(player) {
  this.markedBy = player;
}

function Board() {
  var boardArray = [];
  for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
    var rowArray = [];
    for (var colIndex = 0; colIndex < 3; colIndex++) {
      rowArray.push(new Space(rowIndex, colIndex));
    }
    boardArray.push(rowArray);
  }
  return boardArray;
}

function Game() {
  var board = Board();
  var player1 = Player('X');
  var player2 = Player('O');
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
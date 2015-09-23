/**
 * JAVASCRIPT
 */

var beerSongArray = function(n) {
  var beerSong = beerOnTheWall(n);
  return beerSong.split(";");
}

var beerOnTheWall = function(n) {
  if (n === 0) {
    return "No more bottles of beer on the wall, no more bottles of beer. Go to the store and buy some more, 99 bottles of beer on the wall.";
  } else {
    var chant = sprintf("%1$d bottles of beer on the wall, %1$d bottles of beer. Take one down and pass it around, %2$d bottles of beer on the wall.", n, n-1);
    return chant + ";" + beerOnTheWall(n - 1);
  }
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
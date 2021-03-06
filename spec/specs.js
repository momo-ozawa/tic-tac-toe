/* PLAYER */

describe('Player', function() {
  it("'Player.mark' returns the player's mark", function() {
    var testPlayer = new Player(1);
    expect(testPlayer.mark).to.equal(1);
  });

  it("'Player.getSymbol()' returns an 'X' for Player(1)", function() {
    var testPlayer = new Player(1);
    expect(testPlayer.getSymbol()).to.equal('X');
  });

  it("'Player.getSymbol()' returns an 'O' for Player(-1)", function() {
    var testPlayer = new Player(-1);
    expect(testPlayer.getSymbol()).to.equal('O');
  });
});

/* SPACE */

describe('Space', function() {
  it("'Space.xCoordinate' returns the space's x-coordinate", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoordinate).to.equal(1);
  });

  it("'Space.yCoordinate' returns the space's y-coordinate", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.yCoordinate).to.equal(2);
  });

  it("'Space.takenBy' returns the spaces's mark", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.markedBy).to.equal(0);
  });

  it("'Space.takenBy(Player)' lets a player mark a space", function() {
    var testPlayer = new Player(1);
    var testSpace = new Space(1,2);
    testSpace.takenBy(testPlayer);
    expect(testSpace.markedBy).to.eql(1);
  });
});

/* BOARD */

describe('Board', function() {
  it("'Board()' creates 9 spaces when initialized", function() {
    var testBoard = new Board();
    var expectedBoardArray = [
      [new Space(0,0), new Space(0,1), new Space(0, 2)],
      [new Space(1,0), new Space(1,1), new Space(1, 2)],
      [new Space(2,0), new Space(2,1), new Space(2, 2)]
    ];
  expect(testBoard.board).to.eql(expectedBoardArray);
  });

  it("'Board.find(x,y)' finds and returns a space by its coordinates", function() {
    var testBoard = new Board();
    expect(testBoard.find(0,0)).to.eql(new Space(0,0));
  });

  it("'Board.groups()'creates and returns groups with correct info", function() {
    var testBoard = new Board();
    var testPlayer = new Player(1);
    testBoard.find(0,0).takenBy(testPlayer);
    expect(testBoard.groups()[0].map(space => space.markedBy)).to.eql([1,0,0]);
    expect(testBoard.groups()[1].map(space => space.markedBy)).to.eql([0,0,0]);
    expect(testBoard.groups()[2].map(space => space.markedBy)).to.eql([0,0,0]);
    expect(testBoard.groups()[3].map(space => space.markedBy)).to.eql([1,0,0]);
    expect(testBoard.groups()[4].map(space => space.markedBy)).to.eql([0,0,0]);
    expect(testBoard.groups()[5].map(space => space.markedBy)).to.eql([0,0,0]);
    expect(testBoard.groups()[6].map(space => space.markedBy)).to.eql([1,0,0]);
    expect(testBoard.groups()[7].map(space => space.markedBy)).to.eql([0,0,0]);
  });

  it("'Board.getAllUnmarked()' returns all unmarked spaces", function() {
    var testBoard = new Board();
    expect(testBoard.getAllUnmarked().length).to.equal(9);
  });

  it("'Board.getRandomUnmarkedSpace(array) returns an unmarked space", function() {
    var testBoard = new Board();
    var unmarkedArray = testBoard.getAllUnmarked();
    var randomUnmarkedSpace = testBoard.getRandomUnmarkedSpace(unmarkedArray);
    expect(randomUnmarkedSpace.markedBy).to.equal(0);
  })
});

/* GAME */

describe('Game', function() {
  it("'Game.currentPlayer' returns correct current player", function() {
    var testGame = new Game();
    var testPlayer = new Player(1);
    expect(testGame.currentPlayer).to.eql(testPlayer);
  });

  it("'Game.switchPlayer()' switches players", function() {
    var testGame = new Game();
    testGame.switchPlayer();
    expect(testGame.currentPlayer).to.eql(testGame.player2);
  });

  it("'Game.findWinningSpace(player)' returns winning space if one exists for a player", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(0,1).takenBy(testGame.player1);
    expect(testGame.findWinningSpace(testGame.player1)).to.eql(new Space(0,2));
  });

  it("'Game.findWinningSpace(player)' returns undefined if no winning spaces exist for a player", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(2,1).takenBy(testGame.player1);
    expect(testGame.findWinningSpace(testGame.player1)).to.equal(undefined);
  });

  it("'Game.isThreeInARow()' returns true if a player has three marks in a row", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(0,1).takenBy(testGame.player1);
    testGame.board.find(0,2).takenBy(testGame.player1);
    expect(testGame.isThreeInARow()).to.equal(true);
  });

  it("'Game.isThreeInARow()' returns false if no player has three marks in a row", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(0,1).takenBy(testGame.player1);
    expect(testGame.isThreeInARow()).to.equal(false);
  });

  it("'Game.isAllMarked()' returns true if everything is marked", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(0,1).takenBy(testGame.player2);
    testGame.board.find(0,2).takenBy(testGame.player1);
    testGame.board.find(1,0).takenBy(testGame.player2);
    testGame.board.find(1,1).takenBy(testGame.player1);
    testGame.board.find(1,2).takenBy(testGame.player2);
    testGame.board.find(2,0).takenBy(testGame.player1);
    testGame.board.find(2,1).takenBy(testGame.player2);
    testGame.board.find(2,2).takenBy(testGame.player1);
    expect(testGame.isAllMarked()).to.equal(true);
  });

  it("'Game.isAllMarked()' returns false if board still has unmarked spaces", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(0,1).takenBy(testGame.player1);
    expect(testGame.isAllMarked()).to.equal(false);
  });

  it("'Game.isGameOver()' returns true if game is over", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(0,1).takenBy(testGame.player1);
    testGame.board.find(0,2).takenBy(testGame.player1);
    expect(testGame.isGameOver()).to.equal(true);
  });

  it("'Game.isGameOver()' returns false if game is not over", function() {
    var testGame = new Game();
    expect(testGame.isGameOver()).to.equal(false);
  });

  it("'Game.winnerMessage()' returns correct winner message", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(0,1).takenBy(testGame.player1);
    testGame.board.find(0,2).takenBy(testGame.player1);
    testGame.isThreeInARow();
    expect(testGame.gameOverMessage()).to.equal('X wins!')
  });
});




















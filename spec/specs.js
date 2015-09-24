/* PLAYER */

describe('Player', function() {
  it("'Player.mark' returns the player's mark", function() {
    var testPlayer = new Player('X');
    expect(testPlayer.mark).to.equal('X');
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

  it("'Space.takenBy(Player)' lets a player mark a space", function() {
    var testPlayer = new Player('X');
    var testSpace = new Space(1,2);
    testSpace.takenBy(testPlayer);
    expect(testSpace.markedBy).to.eql(testPlayer);
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
    var testPlayer = new Player('X');
    testBoard.find(0,0).takenBy(testPlayer);
    var expectedBoardArray = [
      [testPlayer, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [testPlayer, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [testPlayer, undefined, undefined],
      [undefined, undefined, undefined]
    ]
    expect(testBoard.groups()).to.eql(expectedBoardArray);
  });
});

/* GAME */

describe('Game', function() {
  it("'Game.currentPlayer' returns correct current player", function() {
    var testGame = new Game();
    var testPlayer = new Player('X');
    expect(testGame.currentPlayer).to.eql(testPlayer);
  });

  it("'Game.switchPlayer()' switches players", function() {
    var testGame = new Game();
    testGame.switchPlayer();
    expect(testGame.currentPlayer).to.eql(testGame.player2);
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

  it("'Game.isAllMarked()' returns true if it's a tie", function() {
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
    expect(testGame.isThreeInARow()).to.equal(true);
  });

  it("'Game.isAllMarked()' returns false if board still has unmarked spaces", function() {
    var testGame = new Game();
    testGame.board.find(0,0).takenBy(testGame.player1);
    testGame.board.find(0,1).takenBy(testGame.player1);
    expect(testGame.isThreeInARow()).to.equal(false);
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
    expect(testGame.winnerMessage()).to.equal('X wins!')
  });
});




















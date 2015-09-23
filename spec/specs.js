describe('Player', function() {
  it("returns the player's mark", function() {
    var testPlayer = new Player('X');
    expect(testPlayer.mark).to.equal('X');
  });
});

describe('Space', function() {
  it("returns the space's x-coordinate", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoordinate).to.equal(1);
  });

  it("returns the space's y-coordinate", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.yCoordinate).to.equal(2);
  });

  it("lets a player mark a space", function() {
    var testPlayer = new Player('X');
    var testSpace = new Space(1,2);
    testSpace.takenBy(testPlayer);
    expect(testSpace.markedBy).to.eql(testPlayer);
  });
});

describe('Board', function() {
  it("creates 9 spaces when initialized", function() {
    var testBoard = new Board();
    var expectedBoardArray = [
      [new Space(0,0), new Space(0,1), new Space(0, 2)],
      [new Space(1,0), new Space(1,1), new Space(1, 2)],
      [new Space(2,0), new Space(2,1), new Space(2, 2)]
    ];
  expect(testBoard.board).to.eql(expectedBoardArray);
  });

  it("finds and returns a space by its coordinates", function() {
    var testBoard = new Board();
    expect(testBoard.find(0,0)).to.eql(new Space(0,0));
  });

  it("creates groups", function() {
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
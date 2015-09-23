describe('Player', function() {
  it("returns the player's mark", function() {
    var testPlayer = new Player('X');
    expect(testPlayer.mark()).to.equal('X');
  });
});

describe('Space', function() {
  it("returns the player's x-coordinate", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoordinate).to.equal(1);
  });

  it("returns the player's y-coordinate", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.yCoordinate).to.equal(2);
  });

  // it("lets a player mark a space", funciton() {
  //   var testPlayer = new Player('X');
  //   var testSpace = new Space(1,2);
  //   testSpace.mark(testPlayer);
  //   expect(testSpace.markedBy()).to.equal(testPlayer);
  // });
});
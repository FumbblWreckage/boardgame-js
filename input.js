function initMouseInput(game) {
  // Set up highlight toggling
  game.board.eachSquare(function() {
    $(this.el).click(this.reveal.bind(this));
    $(this.el).mouseover(function() {
      game.cursor.to(this.x, this.y);
      game.cursor.render();
    }.bind(this));
  });
  game.board.parent.click(function() {
    game.board.render();
  });
  $('#new-game').click(function() {
    game.startGame();
  })
}

function initKeyboardInput(game) {
  $('body').keydown(function(e) {
    switch (e.which) {
    // WASD
    case 38:
      e.preventDefault();
      game.cursor.up();
      game.cursor.render();
      break;
    case 37:
      e.preventDefault();
      game.cursor.left();
      game.cursor.render();
      break;
    case 40:
      e.preventDefault();
      game.cursor.down();
      game.cursor.render();
      break;
    case 39:
      e.preventDefault();
      game.cursor.right();
      game.cursor.render();
      break;

    // Spacebar
    case 32:
      e.preventDefault();
      game.cursor.square().reveal();
      game.board.render();
      break;
    }
  });
}

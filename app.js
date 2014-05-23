// ============================================================

// Square
// ------
// The Square object is just a plain JavaScript object
// and hence its prototype can be assigned any number
// of custom properties.

// Custom properties on the square
// -------------------------------
// `toggle` is a function that flips a `selected` property.
// Both of these are custom properties on the Square object.
Square.prototype.toggle = function() {
  this.selected = !this.selected;
}

// beforeRender()
// --------------
// `beforeRender` is a special property of the Square
// object that is called in the square's `render` function
// just before it is appended to the DOM. In this sense, it
// acts as a "pre-hook" to the render function. Here, we are
// performing some CSS decisions based on the state of a square
// before it is rendered.

Square.prototype.beforeRender = function() {
  if (this.selected) {
    $(this.el).addClass('selected');
  } else {
    $(this.el).removeClass('selected');
  }
}

// ============================================================

$(document).ready(function() {

  // OBJECT CREATION
  var board = new Board({
    width: 10,
    height: 10,
    parent: $('#board-container')
  });

  var cursor = new Cursor({
    board: board,
    x: 0,
    y: 0
  });
  cursor.visible = true;

  board.render();

  // MOUSE INPUT
  // Cursor follows mouse
  board.eachSquare(function() {
    $(this.el).click(this.toggle.bind(this));
    $(this.el).mouseover(function() {
      cursor.to(this.x, this.y);
      cursor.render();
    }.bind(this));
  });

  // Board re-renders on any click
  board.parent.click(function() {
    board.render();
  });

  // KEYBOARD INPUT
  $('body').keydown(function(e) {
    switch (e.which) {

    // Up Down Left Right
    case 38:
      e.preventDefault();
      cursor.up();
      cursor.render();
      break;
    case 37:
      e.preventDefault();
      cursor.left();
      cursor.render();
      break;
    case 40:
      e.preventDefault();
      cursor.down();
      cursor.render();
      break;
    case 39:
      e.preventDefault();
      cursor.right();
      cursor.render();
      break;

    // Spacebar
    case 32:
      e.preventDefault();
      cursor.square().toggle();
      board.render();
      break;
    }
  });
});

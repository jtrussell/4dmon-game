var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render })
  , player
  , enemies, pokeballs, greatballs, ultraballs, masterballs
  , currentSpeed = 0
  , maximumSpeed = 200;


function preload() {
  game.load.image('arrow', 'assets/arrow.png');
}

function create() {
  // Use Arcade physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // Add the player sprite to the game, set the anchor point at its center
  player = game.add.sprite(400, 300, 'arrow');
  player.anchor.setTo(0.5, 0.5);

  // All enemies
  enemies = game.add.group();

  // Specific enemies
  pokeballs = game.add.group(enemies);
  greatballs = game.add.group(enemies);
  ultraballs = game.add.group(enemies);
  masterballs = game.add.group(enemies);

  // Maybe just create an emitter at one of the corners?

  // Enable physics on the player
  game.physics.enable(player, Phaser.Physics.ARCADE);
}

function update() {
  // Reset the player's velocities
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  player.body.angularVelocity = 0;

  // Apply an angular velocity (turning the player) when pressing 'A'or 'D'
  if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    player.body.angularVelocity = -200;
  }
  else if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.body.angularVelocity = 200;
  }

  // Accelerate up to a max speed while holding down 'W', deccelerate when
  // not pressed
  if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    if(currentSpeed < maximumSpeed) {
      currentSpeed += 5;
    }
  }
  else {
    if(currentSpeed > 0) {
      currentSpeed -= 3;
    }
  }

  // Apply velocity based on the current angle when moving forward
  game.physics.arcade.velocityFromAngle(player.angle, currentSpeed, player.body.velocity);

  // Make the player wrap around the screen
  if(player.body.x < 0) {
    player.body.x = 800;
  }
  else if(player.body.x > 800) {
    player.body.x = 0;
  }

  if(player.body.y < 0) {
    player.body.y = 600;
  }
  else if(player.body.y > 600) {
    player.body.y = 0;
  }
}

function render() {
  // Debugging info about the player sprite
  game.debug.spriteInfo(player, 30, 30);
}

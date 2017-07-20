import 'pixi';
import 'p2';
import 'phaser';

import pkg from '../package.json';

// This is the entry point of your game.

const config = {
  width: 800,
  height: 600,
  renderer: Phaser.AUTO,
  parent: '',
  state: {
    preload,
    create,
    update
  },
  transparent: false,
  antialias: true,
  physicsConfig: { arcade: true },
};

const game = new Phaser.Game(config);


function preload() {
  this.game.load.image('background', 'assets/img/background.png')
  this.game.load.image('fighter', 'assets/img/fighter.png');
}

function create() {
  const { game } = this;

  const objects = [
    game.add.sprite(game.world.centerX, game.world.centerY, 'background'),
    game.add.text(game.world.centerX, game.world.centerY * 0.8, `Welcome to Big Fight`, { font: "bold 19px Arial", fill: "#fff" })
  ];

  objects.forEach(obj => obj.anchor.setTo(0.5, 0.5));

  this.player = game.add.sprite(32, game.world.height - 150, 'fighter')
  
  const player = this.player;
  game.physics.arcade.enable(player)
  game.physics.arcade.applyGravity = false
  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 0;

  player.body.collideWorldBounds = true;
  this.cursors = game.input.keyboard.createCursorKeys();

}

function update() {
    const player = this.player
    const cursors = this.cursors
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

    }

    else if (cursors.up.isDown)
    {
      player.body.velocity.y = -150;
    }

    else if (cursors.down.isDown)
    {
      player.body.velocity.y = 150;
    }

    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }



}
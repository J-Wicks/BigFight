import 'pixi';
import 'p2';
import 'phaser';
import {createPlayer, showInventory} from './player'
import pkg from '../package.json';
import {collectWeapon, equipWeapon} from './weapons'

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
  this.game.load.image('sword', 'assets/img/sword.png');
  this.game.load.image('axe', 'assets/img/axe.png');
  this.game.load.image('bow', 'assets/img/bow_0.png');
  this.game.load.image('staff', 'assets/img/staff.png');
  this.game.load.image('bottombar', 'assets/img/platform.png');
  this.game.load.image('reticle', 'assets/img/reticle.png');
  this.game.load.spritesheet('cloud', 'assets/img/CloudKH.png', 50, 50);
}

function create() {
  const { game } = this;


  const objects = [
  game.add.sprite(game.world.centerX, game.world.centerY, 'background'),
  game.add.text(game.world.centerX, game.world.centerY * 0.8, `Welcome to Big Fight`, { font: "bold 19px Arial", fill: "#fff" })
  ];
  
  this.weapons = game.add.group();
  this.weapons.enableBody = true;
  this.platforms = game.add.group();
  this.reticle = game.add.group();
  
  const ground = this.platforms.create(0, game.world.height - 50, 'bottombar');
  const sword = this.weapons.create(0, 0, 'sword')
  const axe = this.weapons.create(game.world.centerX * 2 - 100, 0, 'axe')
  const bow = this.weapons.create(0, game.world.centerY, 'bow')
  const wand = this.weapons.create(game.world.centerX*2 - 100, game.world.centerY, 'staff')

  objects.forEach(obj => obj.anchor.setTo(0.5, 0.5));
  
  
  this.player = createPlayer(game);

  const player = this.player;
  const platforms = this.platforms;

  ground.enableBody = true
  game.physics.arcade.enable(player);
  game.physics.arcade.enable(platforms)
  ground.body.immovable = true;
  game.physics.arcade.applyGravity = false;

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.collideWorldBounds = true;

  player.animations.add('left', [2, 3], 10, true)
  player.animations.add('right', [4, 5], 10, true)
  player.animations.add('down', [0, 1], 10, true)
  player.animations.add('up', [6, 7], 10, true)
 
  this.cursors = game.input.keyboard.createCursorKeys();

}

function update() {
    const player = this.player
    const cursors = this.cursors
    const platforms = this.platforms

    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.overlap(player, this.weapons, collectWeapon, null, this);
    showInventory(this);
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left')
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right')

    }

    else if (cursors.up.isDown)
    {
      player.body.velocity.y = -150;
      player.animations.play('up')
    }

    else if (cursors.down.isDown)
    {
      player.body.velocity.y = 150;
      player.animations.play('down')
    }

    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }



}
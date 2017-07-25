import {equipWeapon} from './weapons'
let hasAttacked = false
let facing 
export const createPlayer = function(game){
	const player = game.add.sprite(game.world.centerX, game.world.centerY,'cloud')
	player.inventory = [];
	player.equippedWeapon = {}
	return player
}

export const damageEnemy = function(player, enemy){
	enemy.tint = Math.random() * 0xffffff;
}

export const showInventory = function(game){
	const inventory = game.player.inventory
	game.reticle.removeAll();
	inventory.map((item, index) => {
		if(item.name === game.player.equippedWeapon.name){
			game.reticle.create(50*index, game.world.height - 50, 'reticle')
	
		}
		const inventoryItem = game.add.sprite(50*index, game.world.height - 50, item.name)
		inventoryItem.inputEnabled = true
		inventoryItem.events.onInputDown.add( function() { equipWeapon(game.player, item)}, this)
		return inventoryItem
	})
}

export const attack = function(game){
	const player = game.player
	if(!hasAttacked){
		let attack = game.attacks.create(game.player.x + 20, game.player.y, player.equippedWeapon.name)
		attack.enableBody = true
		hasAttacked = true
	}

	setTimeout(function(){
		hasAttacked = false
		game.attacks.removeAll()
	}, 50)
}

export const move = function(player, cursors){
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
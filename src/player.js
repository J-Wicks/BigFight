import {equipWeapon} from './weapons'

export const createPlayer = function(game){
	const player = game.add.sprite(game.world.centerX, game.world.centerY,'cloud')
	player.inventory = [];
	player.equippedWeapon = {}
	return player
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
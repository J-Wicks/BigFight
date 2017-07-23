export const weaponStats = [
	{name: 'sword',
	source: '../public/assets/img/sword.png',
	power: 75},
	{name: 'axe',
	source: '../public/assets/img/axe.png',
	power: 100},
	{name: 'staff',
	source: '../public/assets/img/staff.png',
	power: 20},
	{name: 'bow',
	source: '../public/assets/img/bow_0.png',
	power: 75},
]

export const equipWeapon = function(player, weapon) {
	player.equippedWeapon = weapon
	console.log('equipped ', player.equippedWeapon)
}

export const collectWeapon = function(player, weapon) {
	const newWeapon = weaponStats.filter( equipment => { 
		return equipment.name === weapon.key;
	});

	player.equippedWeapon.name ? null : 	equipWeapon(player, newWeapon[0])
	
	player.inventory.push(newWeapon[0])
	weapon.kill();

}


let region = 'en';
let url = 'https://api.bandori.ga/v1/' + region + '/';
let resurl = 'https://res.bandori.ga/assets-' + region + '/thumb/chara/card'

export async function getFromGacha(rar, focus=false, gach) {
	let response = await fetch(url + 'gacha/' + gach.toString());
	let gachData = await response.json();

	let cardList = gachData.details.filter(function (card) {
		if (focus) {return card.rarityIndex===rar && card.pickup===true;}
		else {return card.rarityIndex===rar && card.pickup===false;}
	});
	let id = Math.floor(Math.random() * (cardList.length));
	// console.log(cardList.length, id)
	let card = cardList[id];
	// console.log(card, rar, focus);

	let response2 = await fetch(url + 'card/' + card.situationId);
	let cardData = await response2.json();

	let imgurl = resurl + cardGroup(card.situationId) + '_rip/' + cardData.cardRes + '_normal.png';

	return [imgurl, cardData.attr, Math.floor((cardData.characterId - 1) / 5) + 1, cardData.title, card.situationId];
}

function cardGroup(id) {
	const groupId = Math.trunc(id / 50).toString()
    return '0'.repeat(5 - groupId.length) + groupId;
}

// export async function get(rng, rar) {
// 	let response = await fetch(url + 'card/');
// 	let cardData = await response.json();

// 	let cardList = cardData.data.filter(function (card) {
// 		if (rar >= 3) {
// 			return card.rarity === rar && card.hasOwnProperty('gachaText');
// 		} else {
// 			return card.rarity === rar;
// 		}
		
// 	});
// 	// console.log(cardList.length)
// 	let id = Math.floor(rng * cardList.length);
// 	// console.log(id)
// 	let card = cardList[id];
// 	console.log(card.cardId);

// 	let imgurl = resurl + cardGroup(card.cardId) + '_rip/' + card.cardRes + '_normal.png';
// 	// let charname = charList[card.characterId - 1].characterName;

// 	return [imgurl];
// }
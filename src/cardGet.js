export async function getFromGacha(rar, focus=false, gach, region='en') {
	// calls to bandori.ga api to retrieve cards
	let url = 'https://api.bandori.top/v2/' + region + '/';
	// let resurl = 'https://res.bandori.top/assets-' + region + '/thumb/chara/card'
	let resurl = 'https://res.bandori.top/file/bandori-assets/' + 'jp' + '/thumb/chara/card'
	// console.log(rar, focus, gach, region);

	// find all cards available in selected gacha & filter out focus cards if needed
	let response = await fetch(url + 'gacha/' + gach.toString());
	let gachData = await response.json();
	let cardList = gachData.details.filter(function (card) {
		if (focus) {return card.rarityIndex===rar && card.pickup===true;}
		else {return card.rarityIndex===rar && (card.pickup===false || card.pickup==undefined);}
	});
	// console.log(cardList);
	
	// get a single card from the generated list
	let id = Math.floor(Math.random() * (cardList.length));
	// console.log(id);
	let card = cardList[id];
	// console.log(card);
	let response2 = await fetch(url + 'card/' + card.situationId);
	let cardData = await response2.json();
	console.log(cardData);

	// get img resource for card
	let imgurl = resurl + cardGroup(card.situationId) + '_rip/' + cardData.resourceSetName + '_normal.webp';

	return [imgurl, cardData.attribute, Math.floor((cardData.characterId - 1) / 5) + 1, cardData.title, card.situationId];
}

function cardGroup(id) {
	const groupId = Math.trunc(id / 50).toString()
    return '0'.repeat(5 - groupId.length) + groupId;
}
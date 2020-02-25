export async function getFromGacha(rar, focus=false, gach, region='en') {
	// calls to bandori.ga api to retrieve cards
	let url = 'https://api.bandori.ga/v1/' + region + '/';
	let resurl = 'https://res.bandori.ga/assets-' + region + '/thumb/chara/card'

	// find all cards available in selected gacha & filter out focus cards if needed
	let response = await fetch(url + 'gacha/' + gach.toString());
	let gachData = await response.json();
	let cardList = gachData.details.filter(function (card) {
		if (focus) {return card.rarityIndex===rar && card.pickup===true;}
		else {return card.rarityIndex===rar && card.pickup===false;}
	});
	
	// get a single card from the generated list
	let id = Math.floor(Math.random() * (cardList.length));
	let card = cardList[id];
	let response2 = await fetch(url + 'card/' + card.situationId);
	let cardData = await response2.json();

	// get img resource for card
	let imgurl = resurl + cardGroup(card.situationId) + '_rip/' + cardData.cardRes + '_normal.png';

	return [imgurl, cardData.attr, Math.floor((cardData.characterId - 1) / 5) + 1, cardData.title, card.situationId];
}

function cardGroup(id) {
	const groupId = Math.trunc(id / 50).toString()
    return '0'.repeat(5 - groupId.length) + groupId;
}
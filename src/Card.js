import React from 'react';
import './App.css';

class Card extends React.Component {
	constructor(props) {
		super(props)
		// determine how many stars to display on card thumbnail
		var stars;
    if (this.props.rarity === 4) {
      stars = <div><div className='thumb-rarity-0-1'> </div>
            <div className='thumb-rarity-0-2'> </div>
            <div className='thumb-rarity-0-3'> </div>
            <div className='thumb-rarity-0-4'> </div></div>;
    } else if (this.props.rarity === 3) {
      stars = <div><div className='thumb-rarity-0-1'> </div>
            <div className='thumb-rarity-0-2'> </div>
            <div className='thumb-rarity-0-3'> </div></div>;
    } else if (this.props.rarity === 2) {
      stars = <div><div className='thumb-rarity-0-1'> </div>
            <div className='thumb-rarity-0-2'> </div></div>;
    } else {
      stars = <div></div>;
    }
    this.state = {stars: stars};
	}

	render() {
		return (
			<a href={'https://bestdori.com/info/cards/' + this.props.id} target='_blank' rel="noopener noreferrer">
        <div className='thumb-parent' title={this.props.name}>
          <img src={this.props.image} height='100' width='100' alt=''/>
          <div className={'thumb-frame-' + this.props.rarity.toString()}> </div>
          <div className={'thumb-attr-' + this.props.attr}> </div>
          <div className={'thumb-band-' + this.props.band}> </div>
          {this.state.stars}
        </div>
      </a>
		)
	}
}

export default Card;

// Old Code
// <a href={'https://bestdori.com/info/cards/' + url[4]} target='_blank' rel="noopener noreferrer">
  // <div className='thumb-parent' title={url[3]}>
    // <img src={url[0]} height='100' width='100' alt=''/>
    // <div className={'thumb-frame-' + rarity.toString()}> </div>
    // <div className={'thumb-attr-' + url[1]}> </div>
    // <div className={'thumb-band-' + url[2]}> </div>
    // {stars}
  // </div>
// </a>
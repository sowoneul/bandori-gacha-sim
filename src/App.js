import React from 'react';
import whale from './img/whale.gif'
import './App.css';
import {getFromGacha} from './cardGet';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      rate: 0.03,
      two: 0,
      three: 0,
      four: 0,
      focus4: 0,
      focus3: 0,
      focus2: 0,
      q: [],
      whale: '',
      gachaList: [{display: 'Loading Gacha List...'}],
      selectedGacha: 5,
      focusAmount: [0, 0, 0]
    }
    this.state = this.initialState
  }

  componentDidMount = () => {
    fetch('https://api.bandori.ga/v1/en/gacha')
      .then((response) => {
        return response.json();
      })
      .then(resp => {
        let list = resp.data.filter(gach => {
          if (gach.gachaName.includes('Ticket') || gach.gachaName.includes('Type') || 
            gach.gachaName.includes('Step Up') || gach.paymentMethods.length < 2) {
            return false;
          }
          return true;
        });

        let gacha = list.slice(0).reverse().map(gach => {
          let two = 0;
          let three = 0;
          let four = 0;

          let focus = gach.details.filter(card => {
            return card.pickup === true;
          })
          for (var i = 0; i < focus.length; i++) {
            if (focus[i].rarityIndex === 2) {two++;}
            else if (focus[i].rarityIndex === 3) {three++;}
            else {four++;}
          }

          return {value: gach.gachaId, display: gach.gachaName, focus: [two, three, four]}
        });
        
        this.setState({
          gachaList: gacha,
          selectedGacha: gacha[0].value,
          focusAmount: gacha[0].focus
        });
      }).catch(error => {
        console.log(error);
      })
  }

  handleGacha = (e) => {
    this.setState({
      selectedGacha: parseInt(e.target.value.slice(6)), 
      focusAmount: [parseInt(e.target.value[0]), parseInt(e.target.value[2]), parseInt(e.target.value[4])]
    });
  }

  handleRoll = (e) => {
    var random = Math.random();
    var res = '';

    if (random <= this.state.rate) {
      if (this.focusRoll(4, random)) {this.getCard(4, true);}
      else {this.getCard(4);}
      res = '4'
      this.setState(state => {return {four: state.four + 1}});
    } else if (random > this.state.rate && random <= this.state.rate + 0.085) {
      if (this.focusRoll(3, random)) {this.getCard(3, true);}
      else {this.getCard(3)};
      res = '3'
      this.setState(state => {return {three: state.three + 1}});
    } else {
      if (this.focusRoll(2, random)) {this.getCard(2, true);}
      else {this.getCard(2);}
      res = '2';
      this.setState(state => {return {two: state.two + 1}});
    }

    if (this.state.two + this.state.three + this.state.four === 100) {
      this.setState({whale: <img src={whale} width='20px' height='20px'/>})
    }
    return res;
  }

  handleRollTen = async (e) => {
    await this.setState(state => {return {q: []}});
    this.rollTen();
  }

  rollTen = () => {
    var res = '';
    for (var i = 0; i < 9; i++) {
      res = res + ' ' + this.handleRoll();
    }

    if (res.includes('3') || res.includes('4')) {res = this.handleRoll() + res;} 
    else {
      var random = Math.random();    
      if (random <= this.state.rate) {
        if (this.focusRoll(4, random)) {this.getCard(4, true);} 
        else {this.getCard(4);}
        this.setState(state => {return {four: state.four + 1}});
      } else {
        if (this.focusRoll(3, random, 0.13695)) {this.getCard(3, true);}
        else {this.getCard(3);}
        this.setState(state => {return {three: state.three + 1}});
      }
    }
  }

  focusRoll = (n, r, m = 0.012) => {
    // n: rarity, r = rng, m = focus rate for 3* (primarily for guaranteed 3* roll)
    var rate = 0;
    var focus = 'focus' + n.toString();

    if (n === 4) {rate = 0.005 * this.state.focusAmount[2];} 
    else if (n === 3) {rate = (this.state.rate + m) * this.state.focusAmount[1];} 
    else {rate = (this.state.rate + 0.085 + 0.096) * this.state.focusAmount[0];}

    if (r <= rate) {
      this.setState(state => {
        var x;
        if (n === 4) {x = state.focus4;}
        else if (n === 3) {x = state.focus3;}
        else {x = state.focus2;}
        return {[focus]: x + 1}}
        )
      return true;
    } else {return false;}
  }

  handleDF = (e) => {
    var checked = e.target.checked;
    if (checked) {this.setState(state => {return {rate: 0.06}});}
    else {this.setState(state => {return {rate: 0.03}});}
  }

  handleReset = (e) => {
    let df = this.state.rate;
    let gachList = this.state.gachaList;
    let selected = this.state.selectedGacha;
    let focus = this.state.focusAmount;
    this.setState(state => {
      return this.initialState;
    });
    this.setState({
      q: [],
      gachaList: gachList,
      selectedGacha: selected,
      focusAmount: focus
    })
    if (df === 0.06) {
      this.setState(state => {return {rate: 0.06}});
    }
  }

  // spark = (e) => {
  //   for (var i = 0; i < 30; i++) {
  //     this.handleRollTen();
  //   }
  //   this.setState(state => {return {rng: 'Sparked!'}});
  // }

  getCard = (rarity, focus) => {
    var queue = this.state.q;
    var stars = <div></div>;

    if (rarity === 4) {
      stars = <div><div className='thumb-rarity-0-1'> </div>
            <div className='thumb-rarity-0-2'> </div>
            <div className='thumb-rarity-0-3'> </div>
            <div className='thumb-rarity-0-4'> </div></div>;
    } else if (rarity === 3) {
      stars = <div><div className='thumb-rarity-0-1'> </div>
            <div className='thumb-rarity-0-2'> </div>
            <div className='thumb-rarity-0-3'> </div></div>;
    } else if (rarity === 2) {
      stars = <div><div className='thumb-rarity-0-1'> </div>
            <div className='thumb-rarity-0-2'> </div></div>;
    } else {
      stars = <div></div>;
    }

    getFromGacha(rarity, focus, this.state.selectedGacha)
      .then(url => {
        if (queue.length === 10) {queue.shift()};
        queue.push(
          <a href={'https://bestdori.com/info/cards/' + url[4]} target='_blank'>
            <div className='thumb-parent' title={url[3]}>
              <img src={url[0]} height='100' width='100'/>
              <div className={'thumb-frame-' + rarity.toString()}> </div>
              <div className={'thumb-attr-' + url[1]}> </div>
              <div className={'thumb-band-' + url[2]}> </div>
              {stars}
            </div>
          </a>
          );

        this.setState({
          q:queue
        })
      }
    );
  }
  
  render() {
    return (
      <div className="App">
        <div className='parent'>
          <h3>Total: {this.state.two + this.state.three + this.state.four} ({this.state.focus2 + this.state.focus3 + this.state.focus4})</h3>
          <div>4☆: {this.state.four} ({this.state.focus4})  3☆: {this.state.three} ({this.state.focus3})  2☆: {this.state.two} ({this.state.focus2})</div>

          <div className='results'>{this.state.q}</div>
          
          <div>
            Total stars spent: {(this.state.two + this.state.three + this.state.four) * 250}
            &#160;{this.state.whale}<br/>
            Current 4☆ rate is {this.state.rate * 100}%
          </div>

          <div>
            <select className='btn btn-sm gachalist' onChange={this.handleGacha}>
              {this.state.gachaList.map((gach) => 
                <option key={gach.value} value={[gach.focus, gach.value]}>{gach.display}</option>
                )}
            </select>
          </div>
          <div>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="defaultUnchecked" onClick={this.handleDF}/>
                <label className="custom-control-label" for="defaultUnchecked">DreamFes</label>
            </div>
          </div>
          <div>
            <button className='btn rollbutton' onClick={this.handleRoll}> Roll </button>
            <button className='btn rollbutton' onClick={this.handleRollTen}> Roll 10 </button>
            {/*<button onClick={this.spark}> Spark! </button><br/>*/}
            <br/>
            <button className='btn btn-secondary' onClick={this.handleReset}> Reset </button>
          </div>       
        </div>
      </div>
    );
  }
}

export default App;
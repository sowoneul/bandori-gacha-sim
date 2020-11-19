import React from 'react';
import Card from './Card';
import {getFromGacha} from './cardGet';
import './App.css';
import whale from './img/whale.gif'
import tsugu from './img/tsugunomoney.gif'
import tsugumoney from './img/tsugumoney.gif'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0.03,
      two: 0,
      three: 0,
      four: 0,
      total: 0,
      focus4: 0,
      focus3: 0,
      focus2: 0,
      q: [],
      region: 'en',
      gachaList: [{display: 'Loading Gacha List...'}],
      selectedGacha: 5,
      focusAmount: [0, 0, 0],
      gachaimg: '',
      whale: '',
      tsugu: tsugu
    }
  }

  componentDidMount = () => {
    this.getGachaList(this.state.region);
  }

  handleRegion = (e) => {
    // change between server regions
    this.handleReset();
    this.setState({region: e.target.value});
    this.getGachaList(e.target.value);
  }

  getGachaList = (region) => {
    // build gacha dropdown list
    fetch('https://api.bandori.top/v2/' + region + '/gacha')
      .then((response) => {
        return response.json();
      })
      .then(resp => {
        // filter out special gachas
        let list = resp.data.filter(gach => {
          if (gach.gachaName.includes('★') || gach.gachaName.includes('Type') || 
            gach.gachaName.includes('Step Up') ||  gach.gachaName.includes('タイプ') ||
            gach.paymentMethods.length < 2) {
            return false;
          }
          if (!gach.details || !gach) {return false;}
          return true;
        });

        // find # of focus cards in each gacha, add ID tag, convert to new object
        let gacha = list.slice(0).reverse().map(gach => {          
          let two = 0;
          let three = 0;
          let four = 0;

          let focus = gach.details.filter(card => {
            return card.pickup === true;
          })
          for (let i = 0; i < focus.length; i++) {
            if (focus[i].rarityIndex === 2) {two++;}
            else if (focus[i].rarityIndex === 3) {three++;}
            else {four++;}
          }

          let disp
          if (region === 'jp') {
            disp = gach.gachaId.toString() + ' - ' + gach.gachaName;
          } else {
            disp = gach.gachaName
          }

          return {value: gach.gachaId, display: disp, focus: [two, three, four]}
        });
        
        // store newly created gacha database in state
        this.setState({
          gachaList: gacha,
          selectedGacha: gacha[0].value,
          focusAmount: gacha[0].focus,
          gachaimg: 'https://bestdori.com/assets/' + this.state.region + '/homebanner_rip/banner_gacha' + gacha[0].value + '.png'
        });
      }).catch(error => {
        console.log(error);
      })
  }

  handleGacha = (e) => {
    // switch current gacha banner
    let gachId = parseInt(e.target.value.slice(6));
    this.setState({
      selectedGacha: gachId, 
      focusAmount: [parseInt(e.target.value[0]), parseInt(e.target.value[2]), parseInt(e.target.value[4])],
      gachaimg: 'https://bestdori.com/assets/' + this.state.region + '/homebanner_rip/banner_gacha' + gachId + '.png'
    });
  }

  handleRoll = (e) => {
    let random = Math.random();
    let res = '';

    if (random <= this.state.rate) {
      this.getCard(4, this.focusRoll(4, random));
      res = '4'
      this.setState(state => {return {four: state.four + 1, total: state.total + 1}});
    } else if (random > this.state.rate && random <= this.state.rate + 0.085) {
      this.getCard(3, this.focusRoll(3, random));
      res = '3'
      this.setState(state => {return {three: state.three + 1, total: state.total + 1}});
    } else {
      this.getCard(2, this.focusRoll(2, random));
      res = '2';
      this.setState(state => {return {two: state.two + 1, total: state.total + 1}});
    }

    // easter eggs
    if (this.state.total === 9) {
      this.setState({tsugu: tsugumoney});
    }
    if (this.state.total === 100) {
      this.setState({whale: <img src={whale} width='20px' height='20px' alt=''/>});
    }

    return res;
  }

  handleRollTen = async (e) => {
    await this.setState(state => {return {q: []}});
    this.rollTen();
  }

  rollTen = () => {
    // calls the roll function 10 times
    let res = '';
    for (let i = 0; i < 9; i++) {
      res = res + ' ' + this.handleRoll();
    }

    // if there was already a 3*, there is no need to give a guaranteed 3*
    if (res.includes('3') || res.includes('4')) {res = this.handleRoll() + res;} 
    else {
      let random = Math.random();    
      if (random <= this.state.rate) {
        this.getCard(4, this.focusRoll(4, random));
        this.setState(state => {return {four: state.four + 1, total: state.total + 1}});
      } else {
        this.getCard(3, this.focusRoll(3, random, 0.13695));
        this.setState(state => {return {three: state.three + 1, total: state.total + 1}});
      }
    }
  }

  focusRoll = (n, r, m = 0.012) => {
    // handle case where a focus card is rolled
    // n: rarity, r = rng, m = focus rate for 3* (primarily for guaranteed 3* roll)
    let rate = 0;
    let focus = 'focus' + n.toString();

    if (n === 4) {rate = 0.005 * this.state.focusAmount[2];} 
    else if (n === 3) {rate = (this.state.rate + m) * this.state.focusAmount[1];} 
    else {rate = (this.state.rate + 0.085 + 0.096) * this.state.focusAmount[0];}

    if (r <= rate) {
      this.setState(state => {
        let x;
        if (n === 4) {x = state.focus4;}
        else if (n === 3) {x = state.focus3;}
        else {x = state.focus2;}
        return {[focus]: x + 1}}
        )
      return true;
    } else {return false;}
  }

  handleDF = (e) => {
    // double rates for dreamfes (user controlled)
    let checked = e.target.checked;
    if (checked) {this.setState(state => {return {rate: 0.06}});}
    else {this.setState(state => {return {rate: 0.03}});}
  }

  handleReset = (e) => {
    // reset state
    this.setState({
      two: 0,
      three: 0,
      four: 0,
      total: 0,
      focus4: 0,
      focus3: 0,
      focus2: 0,
      q: [],
      whale: '',
      tsugu: tsugu
    });
  }

  getCard = (rarity, focus) => {
    // main function for card getting 
    let queue = this.state.q;

    getFromGacha(rarity, focus, this.state.selectedGacha, this.state.region)
      .then(url => {
        if (queue.length === 10) {queue.shift()};
        queue.push(
          <Card image={url[0]} id={url[4]} name={url[3]} rarity={rarity} attr={url[1]} band={url[2]} />
          );
        this.setState({
          q:queue
        })
      }
    );
  }

  handleHoverIn = (e) => {
    // show % rates of card rarities pulled
    if (this.state.total !== 0) {
      this.setState(state => {return {
        two: state.two / state.total,
        three: state.three / state.total,
        four: state.four / state.total
      }});
    }
    
  }

  handleHoverOut = (e) => {
    this.setState(state => {return {
      two: state.two * state.total,
      three: state.three * state.total,
      four: state.four * state.total
    }})
  }
  
  render() {
    return (
      <div className={"App"}>
        <div className='parent'>
          <div className='container stats'>
            <div className='row'>
              <div className='col-sm'>
                <img src={this.state.tsugu} alt='' height={'75px'} />
              </div>
              <div className='col-5 total'>
                <div>Total: {this.state.total} ({this.state.focus2 + this.state.focus3 + this.state.focus4})</div>
                <div>Stars spent: {(this.state.total) * 250}&#160;{this.state.whale}</div>
              </div>
              <div className='col individual' onMouseEnter={this.handleHoverIn} onMouseLeave={this.handleHoverOut}>
                <div>4☆: {Math.round(this.state.four * 100) / 100} ({this.state.focus4})</div>
                <div>3☆: {Math.round(this.state.three * 100) / 100} ({this.state.focus3})</div>
                <div>2☆: {Math.round(this.state.two * 100) / 100} ({this.state.focus2})</div>
              </div>
            </div>
          </div>

          <div className='container'>
            <div className='results'>{this.state.q}</div>
          </div>

          <div className='container gacha'>
            <div className='row'>
              <div className='col-sm gachabanner'>
                <a href={'https://bestdori.com/info/gacha/' + this.state.selectedGacha} target='_blank' rel="noopener noreferrer">
                  <img src={this.state.gachaimg} alt='' height='100px' />
                </a>
              </div>
              <div className='col gachaoptions'>
                Gacha:<br/>
                <select className='btn btn-sm gachalist' onChange={this.handleGacha}>
                  {this.state.gachaList.map((gach) => 
                    <option key={gach.value} value={[gach.focus, gach.value]}>{gach.display}</option>
                    )}
                </select>
                <br/>Server:<br/>
                <select className='btn btn-sm gachalist' onChange={this.handleRegion}>
                  <option value='en'>WW</option>
                  <option value='jp'>JP</option>
                </select>
              </div>
            </div>
          </div>

          <div className='container controls'>
            <div className="custom-switch dreamfes">
              <input type="checkbox" className="custom-control-input" id="defaultUnchecked" onClick={this.handleDF}/>
              <label className="custom-control-label unselectable" htmlFor="defaultUnchecked">DreamFes</label>
            </div>
            <button className='btn rollbutton' onClick={this.handleRoll}> Roll </button>
            <button className='btn rollbutton' onClick={this.handleRollTen}> Roll 10 </button>
            <button className='btn btn-secondary' onClick={this.handleReset}> Reset </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// Old Code used in development
/*<button onClick={this.spark}> Spark! </button><br/>*/
// spark = (e) => {
//   for (var i = 0; i < 30; i++) {
//     this.handleRollTen();
//   }
//   this.setState(state => {return {rng: 'Sparked!'}});
// }
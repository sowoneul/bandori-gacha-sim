(this["webpackJsonpbandori-gacha-sim"]=this["webpackJsonpbandori-gacha-sim"]||[]).push([[0],[,,,,,,,,function(t,e,a){t.exports=a.p+"static/media/tsugunomoney.a698363a.gif"},,function(t,e,a){},,,function(t,e,a){t.exports=a.p+"static/media/whale.17edc0ad.gif"},function(t,e,a){t.exports=a.p+"static/media/tsugumoney.0eee08a4.gif"},function(t,e,a){t.exports=a(22)},,,,,function(t,e,a){},,function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),s=a(11),c=a.n(s),o=(a(20),a(12)),l=a(1),i=a.n(l),u=a(2),h=a(3),m=a(4),d=a(6),f=a(5),g=a(7),p=(a(10),function(t){function e(t){var a,n;return Object(h.a)(this,e),n=4===(a=Object(d.a)(this,Object(f.a)(e).call(this,t))).props.rarity?r.a.createElement("div",null,r.a.createElement("div",{className:"thumb-rarity-0-1"}," "),r.a.createElement("div",{className:"thumb-rarity-0-2"}," "),r.a.createElement("div",{className:"thumb-rarity-0-3"}," "),r.a.createElement("div",{className:"thumb-rarity-0-4"}," ")):3===a.props.rarity?r.a.createElement("div",null,r.a.createElement("div",{className:"thumb-rarity-0-1"}," "),r.a.createElement("div",{className:"thumb-rarity-0-2"}," "),r.a.createElement("div",{className:"thumb-rarity-0-3"}," ")):2===a.props.rarity?r.a.createElement("div",null,r.a.createElement("div",{className:"thumb-rarity-0-1"}," "),r.a.createElement("div",{className:"thumb-rarity-0-2"}," ")):r.a.createElement("div",null),a.state={stars:n},a}return Object(g.a)(e,t),Object(m.a)(e,[{key:"render",value:function(){return r.a.createElement("a",{href:"https://bestdori.com/info/cards/"+this.props.id,target:"_blank",rel:"noopener noreferrer"},r.a.createElement("div",{className:"thumb-parent",title:this.props.name},r.a.createElement("img",{src:this.props.image,className:"thumb-img",alt:""}),r.a.createElement("div",{className:"thumb-frame-"+this.props.rarity.toString()}," "),r.a.createElement("div",{className:"thumb-attr-"+this.props.attr}," "),r.a.createElement("div",{className:"thumb-band-"+this.props.band}," "),this.state.stars))}}]),e}(r.a.Component));function v(){return(v=Object(u.a)(i.a.mark((function t(e){var a,n,r,s,c,o,l,u,h,m,d,f,g,p=arguments;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=p.length>1&&void 0!==p[1]&&p[1],n=p.length>2?p[2]:void 0,r=p.length>3&&void 0!==p[3]?p[3]:"en",s="https://api.bandori.ga/v1/"+r+"/",c="https://res.bandori.ga/assets-"+r+"/thumb/chara/card",t.next=7,fetch(s+"gacha/"+n.toString());case 7:return o=t.sent,t.next=10,o.json();case 10:return l=t.sent,u=l.details.filter((function(t){return a?t.rarityIndex===e&&!0===t.pickup:t.rarityIndex===e&&!1===t.pickup})),h=Math.floor(Math.random()*u.length),m=u[h],t.next=16,fetch(s+"card/"+m.situationId);case 16:return d=t.sent,t.next=19,d.json();case 19:return f=t.sent,g=c+b(m.situationId)+"_rip/"+f.cardRes+"_normal.png",t.abrupt("return",[g,f.attr,Math.floor((f.characterId-1)/5)+1,f.title,m.situationId]);case 22:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function b(t){var e=Math.trunc(t/50).toString();return"0".repeat(5-e.length)+e}var E=a(13),N=a.n(E),y=a(8),w=a.n(y),S=a(14),k=a.n(S),R=function(t){function e(t){var a;return Object(h.a)(this,e),(a=Object(d.a)(this,Object(f.a)(e).call(this,t))).componentDidMount=function(){a.getGachaList(a.state.region)},a.handleRegion=function(t){a.handleReset(),a.setState({region:t.target.value}),a.getGachaList(t.target.value)},a.getGachaList=function(t){fetch("https://api.bandori.ga/v1/"+t+"/gacha").then((function(t){return t.json()})).then((function(e){var n=e.data.filter((function(t){return!(t.gachaName.includes("\u2605")||t.gachaName.includes("Type")||t.gachaName.includes("Step Up")||t.gachaName.includes("\u30bf\u30a4\u30d7")||t.paymentMethods.length<2)&&!(!t.details||!t)})).slice(0).reverse().map((function(e){for(var a,n=0,r=0,s=0,c=e.details.filter((function(t){return!0===t.pickup})),o=0;o<c.length;o++)2===c[o].rarityIndex?n++:3===c[o].rarityIndex?r++:s++;return a="jp"===t?e.gachaId.toString()+" - "+e.gachaName:e.gachaName,{value:e.gachaId,display:a,focus:[n,r,s]}}));a.setState({gachaList:n,selectedGacha:n[0].value,focusAmount:n[0].focus,gachaimg:"https://bestdori.com/assets/"+a.state.region+"/homebanner_rip/banner_gacha"+n[0].value+".png"})})).catch((function(t){console.log(t)}))},a.handleGacha=function(t){var e=parseInt(t.target.value.slice(6));a.setState({selectedGacha:e,focusAmount:[parseInt(t.target.value[0]),parseInt(t.target.value[2]),parseInt(t.target.value[4])],gachaimg:"https://bestdori.com/assets/"+a.state.region+"/homebanner_rip/banner_gacha"+e+".png"})},a.handleRoll=function(t){var e=Math.random(),n="";return e<=a.state.rate?(a.getCard(4,a.focusRoll(4,e)),n="4",a.setState((function(t){return{four:t.four+1,total:t.total+1}}))):e>a.state.rate&&e<=a.state.rate+.085?(a.getCard(3,a.focusRoll(3,e)),n="3",a.setState((function(t){return{three:t.three+1,total:t.total+1}}))):(a.getCard(2,a.focusRoll(2,e)),n="2",a.setState((function(t){return{two:t.two+1,total:t.total+1}}))),9===a.state.total&&a.setState({tsugu:k.a}),100===a.state.total&&a.setState({whale:r.a.createElement("img",{src:N.a,width:"20px",height:"20px",alt:""})}),n},a.handleRollTen=function(){var t=Object(u.a)(i.a.mark((function t(e){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.setState((function(t){return{q:[]}}));case 2:a.rollTen();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),a.rollTen=function(){for(var t="",e=0;e<9;e++)t=t+" "+a.handleRoll();if(t.includes("3")||t.includes("4"))t=a.handleRoll()+t;else{var n=Math.random();n<=a.state.rate?(a.getCard(4,a.focusRoll(4,n)),a.setState((function(t){return{four:t.four+1,total:t.total+1}}))):(a.getCard(3,a.focusRoll(3,n,.13695)),a.setState((function(t){return{three:t.three+1,total:t.total+1}})))}},a.focusRoll=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.012,r="focus"+t.toString();return e<=(4===t?.005*a.state.focusAmount[2]:3===t?(a.state.rate+n)*a.state.focusAmount[1]:(a.state.rate+.085+.096)*a.state.focusAmount[0])&&(a.setState((function(e){var a;return a=4===t?e.focus4:3===t?e.focus3:e.focus2,Object(o.a)({},r,a+1)})),!0)},a.handleDF=function(t){t.target.checked?a.setState((function(t){return{rate:.06}})):a.setState((function(t){return{rate:.03}}))},a.handleReset=function(t){a.setState({two:0,three:0,four:0,total:0,focus4:0,focus3:0,focus2:0,q:[],whale:"",tsugu:w.a})},a.getCard=function(t,e){var n=a.state.q;(function(t){return v.apply(this,arguments)})(t,e,a.state.selectedGacha,a.state.region).then((function(e){10===n.length&&n.shift(),n.push(r.a.createElement(p,{image:e[0],id:e[4],name:e[3],rarity:t,attr:e[1],band:e[2]})),a.setState({q:n})}))},a.handleHoverIn=function(t){0!==a.state.total&&a.setState((function(t){return{two:t.two/t.total,three:t.three/t.total,four:t.four/t.total}}))},a.handleHoverOut=function(t){a.setState((function(t){return{two:t.two*t.total,three:t.three*t.total,four:t.four*t.total}}))},a.state={rate:.03,two:0,three:0,four:0,total:0,focus4:0,focus3:0,focus2:0,q:[],region:"en",gachaList:[{display:"Loading Gacha List..."}],selectedGacha:5,focusAmount:[0,0,0],gachaimg:"",whale:"",tsugu:w.a},a}return Object(g.a)(e,t),Object(m.a)(e,[{key:"render",value:function(){return r.a.createElement("div",{className:"App "+this.state.dark},r.a.createElement("div",{className:"parent"},r.a.createElement("div",{className:"container stats"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm"},r.a.createElement("img",{src:this.state.tsugu,alt:"",height:"75px"})),r.a.createElement("div",{className:"col total"},r.a.createElement("div",null,"Total: ",this.state.total," (",this.state.focus2+this.state.focus3+this.state.focus4,")"),r.a.createElement("div",null,"Stars spent: ",250*this.state.total,"\xa0",this.state.whale)),r.a.createElement("div",{className:"col individual",onMouseEnter:this.handleHoverIn,onMouseLeave:this.handleHoverOut},r.a.createElement("div",null,"4\u2606: ",Math.round(100*this.state.four)/100," (",this.state.focus4,")"),r.a.createElement("div",null,"3\u2606: ",Math.round(100*this.state.three)/100," (",this.state.focus3,")"),r.a.createElement("div",null,"2\u2606: ",Math.round(100*this.state.two)/100," (",this.state.focus2,")")))),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"results"},this.state.q)),r.a.createElement("div",{className:"container gacha"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm gachabanner"},r.a.createElement("a",{href:"https://bestdori.com/info/gacha/"+this.state.selectedGacha,target:"_blank",rel:"noopener noreferrer"},r.a.createElement("img",{src:this.state.gachaimg,alt:"",height:"100px"}))),r.a.createElement("div",{className:"col gachaoptions"},"Gacha:",r.a.createElement("br",null),r.a.createElement("select",{className:"btn btn-sm gachalist",onChange:this.handleGacha},this.state.gachaList.map((function(t){return r.a.createElement("option",{key:t.value,value:[t.focus,t.value]},t.display)}))),r.a.createElement("br",null),"Server:",r.a.createElement("br",null),r.a.createElement("select",{className:"btn btn-sm gachalist",onChange:this.handleRegion},r.a.createElement("option",{value:"en"},"WW"),r.a.createElement("option",{value:"jp"},"JP"))))),r.a.createElement("div",{className:"container controls"},r.a.createElement("div",{className:"custom-switch dreamfes"},r.a.createElement("input",{type:"checkbox",className:"custom-control-input",id:"defaultUnchecked",onClick:this.handleDF}),r.a.createElement("label",{className:"custom-control-label unselectable",htmlFor:"defaultUnchecked"},"DreamFes")),r.a.createElement("button",{className:"btn rollbutton",onClick:this.handleRoll}," Roll "),r.a.createElement("button",{className:"btn rollbutton",onClick:this.handleRollTen}," Roll 10 "),r.a.createElement("button",{className:"btn btn-secondary",onClick:this.handleReset}," Reset "))))}}]),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[15,1,2]]]);
//# sourceMappingURL=main.f84dcfcc.chunk.js.map
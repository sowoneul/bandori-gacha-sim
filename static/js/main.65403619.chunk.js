(this["webpackJsonpbandori-gacha-sim"]=this["webpackJsonpbandori-gacha-sim"]||[]).push([[0],{12:function(t,e,a){t.exports=a(20)},17:function(t,e,a){},19:function(t,e,a){},20:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),s=a(4),c=a.n(s),l=(a(17),a(5)),i=a(1),o=a.n(i),u=a(2),h=a(6),d=a(7),m=a(10),f=a(8),v=a(11),p=a(9),g=a.n(p),b=(a(19),"https://api.bandori.ga/v1/en/"),E="https://res.bandori.ga/assets-en/thumb/chara/card";function y(){return(y=Object(u.a)(o.a.mark((function t(e){var a,n,r,s,c,l,i,u,h,d,m=arguments;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=m.length>1&&void 0!==m[1]&&m[1],n=m.length>2?m[2]:void 0,t.next=4,fetch(b+"gacha/"+n.toString());case 4:return r=t.sent,t.next=7,r.json();case 7:return s=t.sent,c=s.details.filter((function(t){return a?t.rarityIndex===e&&!0===t.pickup:t.rarityIndex===e&&!1===t.pickup})),l=Math.floor(Math.random()*c.length),i=c[l],t.next=13,fetch(b+"card/"+i.situationId);case 13:return u=t.sent,t.next=16,u.json();case 16:return h=t.sent,d=E+N(i.situationId)+"_rip/"+h.cardRes+"_normal.png",t.abrupt("return",[d,h.attr,Math.floor((h.characterId-1)/5)+1,h.title,i.situationId]);case 19:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function N(t){var e=Math.trunc(t/50).toString();return"0".repeat(5-e.length)+e}var w=function(t){function e(t){var a;return Object(h.a)(this,e),(a=Object(m.a)(this,Object(f.a)(e).call(this,t))).componentDidMount=function(){fetch("https://api.bandori.ga/v1/en/gacha").then((function(t){return t.json()})).then((function(t){var e=t.data.filter((function(t){return!(t.gachaName.includes("Ticket")||t.gachaName.includes("Type")||t.gachaName.includes("Step Up")||t.paymentMethods.length<2)})).slice(0).reverse().map((function(t){for(var e=0,a=0,n=0,r=t.details.filter((function(t){return!0===t.pickup})),s=0;s<r.length;s++)2===r[s].rarityIndex?e++:3===r[s].rarityIndex?a++:n++;return{value:t.gachaId,display:t.gachaName,focus:[e,a,n]}}));a.setState({gachaList:e,selectedGacha:e[0].value,focusAmount:e[0].focus})})).catch((function(t){console.log(t)}))},a.handleGacha=function(t){a.setState({selectedGacha:parseInt(t.target.value.slice(6)),focusAmount:[parseInt(t.target.value[0]),parseInt(t.target.value[2]),parseInt(t.target.value[4])]})},a.handleRoll=function(t){var e=Math.random(),n="";return e<=a.state.rate?(a.focusRoll(4,e)?a.getCard(4,!0):a.getCard(4),n="4",a.setState((function(t){return{four:t.four+1}}))):e>a.state.rate&&e<=a.state.rate+.085?(a.focusRoll(3,e)?a.getCard(3,!0):a.getCard(3),n="3",a.setState((function(t){return{three:t.three+1}}))):(a.focusRoll(2,e)?a.getCard(2,!0):a.getCard(2),n="2",a.setState((function(t){return{two:t.two+1}}))),a.state.two+a.state.three+a.state.four===100&&a.setState({whale:r.a.createElement("img",{src:g.a,width:"20px",height:"20px"})}),n},a.handleRollTen=function(){var t=Object(u.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.setState((function(t){return{q:[]}}));case 2:a.rollTen();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),a.rollTen=function(){for(var t="",e=0;e<9;e++)t=t+" "+a.handleRoll();if(t.includes("3")||t.includes("4"))t=a.handleRoll()+t;else{var n=Math.random();n<=a.state.rate?(a.focusRoll(4,n)?a.getCard(4,!0):a.getCard(4),a.setState((function(t){return{four:t.four+1}}))):(a.focusRoll(3,n,.13695)?a.getCard(3,!0):a.getCard(3),a.setState((function(t){return{three:t.three+1}})))}},a.focusRoll=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.012,r="focus"+t.toString();return e<=(4===t?.005*a.state.focusAmount[2]:3===t?(a.state.rate+n)*a.state.focusAmount[1]:(a.state.rate+.085+.096)*a.state.focusAmount[0])&&(a.setState((function(e){var a;return a=4===t?e.focus4:3===t?e.focus3:e.focus2,Object(l.a)({},r,a+1)})),!0)},a.handleDF=function(t){t.target.checked?a.setState((function(t){return{rate:.06}})):a.setState((function(t){return{rate:.03}}))},a.handleReset=function(t){var e=a.state.rate,n=a.state.gachaList,r=a.state.selectedGacha,s=a.state.focusAmount;a.setState((function(t){return a.initialState})),a.setState({q:[],gachaList:n,selectedGacha:r,focusAmount:s}),.06===e&&a.setState((function(t){return{rate:.06}}))},a.getCard=function(t,e){var n=a.state.q,s=r.a.createElement("div",null);s=4===t?r.a.createElement("div",null,r.a.createElement("div",{className:"thumb-rarity-0-1"}," "),r.a.createElement("div",{className:"thumb-rarity-0-2"}," "),r.a.createElement("div",{className:"thumb-rarity-0-3"}," "),r.a.createElement("div",{className:"thumb-rarity-0-4"}," ")):3===t?r.a.createElement("div",null,r.a.createElement("div",{className:"thumb-rarity-0-1"}," "),r.a.createElement("div",{className:"thumb-rarity-0-2"}," "),r.a.createElement("div",{className:"thumb-rarity-0-3"}," ")):2===t?r.a.createElement("div",null,r.a.createElement("div",{className:"thumb-rarity-0-1"}," "),r.a.createElement("div",{className:"thumb-rarity-0-2"}," ")):r.a.createElement("div",null),function(t){return y.apply(this,arguments)}(t,e,a.state.selectedGacha).then((function(e){10===n.length&&n.shift(),n.push(r.a.createElement("a",{href:"https://bestdori.com/info/cards/"+e[4],target:"_blank"},r.a.createElement("div",{className:"thumb-parent",title:e[3]},r.a.createElement("img",{src:e[0],height:"100",width:"100"}),r.a.createElement("div",{className:"thumb-frame-"+t.toString()}," "),r.a.createElement("div",{className:"thumb-attr-"+e[1]}," "),r.a.createElement("div",{className:"thumb-band-"+e[2]}," "),s))),a.setState({q:n})}))},a.initialState={rate:.03,two:0,three:0,four:0,focus4:0,focus3:0,focus2:0,q:[],whale:"",gachaList:[{display:"Loading Gacha List..."}],selectedGacha:5,focusAmount:[0,0,0]},a.state=a.initialState,a}return Object(v.a)(e,t),Object(d.a)(e,[{key:"render",value:function(){return r.a.createElement("div",{className:"App "+this.state.dark},r.a.createElement("div",{className:"parent"},r.a.createElement("h3",null,"Total: ",this.state.two+this.state.three+this.state.four," (",this.state.focus2+this.state.focus3+this.state.focus4,")"),r.a.createElement("h5",null,"4\u2606: ",this.state.four," (",this.state.focus4,")  3\u2606: ",this.state.three," (",this.state.focus3,")  2\u2606: ",this.state.two," (",this.state.focus2,")"),r.a.createElement("div",null,"Total stars spent: ",250*(this.state.two+this.state.three+this.state.four),"\xa0",this.state.whale),r.a.createElement("div",{className:"results"},this.state.q),r.a.createElement("div",null,r.a.createElement("select",{className:"btn btn-sm gachalist",onChange:this.handleGacha},this.state.gachaList.map((function(t){return r.a.createElement("option",{key:t.value,value:[t.focus,t.value]},t.display)})))),r.a.createElement("div",null,"Current 4\u2606 rate is ",100*this.state.rate,"%"),r.a.createElement("div",null,r.a.createElement("div",{className:"custom-switch dreamfes"},r.a.createElement("input",{type:"checkbox",className:"custom-control-input",id:"defaultUnchecked",onClick:this.handleDF}),r.a.createElement("label",{className:"custom-control-label unselectable",for:"defaultUnchecked"},"DreamFes"))),r.a.createElement("div",null,r.a.createElement("button",{className:"btn rollbutton",onClick:this.handleRoll}," Roll "),r.a.createElement("button",{className:"btn rollbutton",onClick:this.handleRollTen}," Roll 10 "),r.a.createElement("br",null),r.a.createElement("button",{className:"btn btn-secondary",onClick:this.handleReset}," Reset "))))}}]),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},9:function(t,e,a){t.exports=a.p+"static/media/whale.17edc0ad.gif"}},[[12,1,2]]]);
//# sourceMappingURL=main.65403619.chunk.js.map
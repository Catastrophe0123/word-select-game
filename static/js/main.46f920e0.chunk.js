(this["webpackJsonpword-select-game"]=this["webpackJsonpword-select-game"]||[]).push([[0],{230:function(e,t,n){},232:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(38),s=n.n(o),c=(n(75),n(3)),l=n(4),i=n(5),d=n(7),u=n(6),h=n(16),m=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={letters:{},selectedLetters:new Set},e.onLetterClickHandler=function(t){var n=t.target.value,r=parseInt(t.target.name);e.setState((function(e){return{selectedLetters:e.selectedLetters.add(r)}})),e.props.setSelectedHandler(n)},e.generateButtons=function(){return e.props.jumbledWord.map((function(t,n){return a.a.createElement("div",{className:"flex mb-4"},a.a.createElement("button",{className:"center inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ",key:n,value:t,name:n,onClick:e.onLetterClickHandler,disabled:e.state.selectedLetters.has(n)},t))}))},e.backSpaceHandler=function(){e.props.backSpace(),e.setState((function(e){var t=Object(h.a)(e.selectedLetters);return t.pop(),t=new Set(t),Object(c.a)(Object(c.a)({},e),{},{selectedLetters:t})}))},e.onClearHandler=function(){e.setState({selectedLetters:new Set}),e.props.setUnderscores()},e.jumbleAgain=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];e.props.jumbleWord(e.props.selectedWord);var n={};e.props.jumbledWord.forEach((function(e,t){n[t]=e})),t&&e.onClearHandler(),e.setState({letters:n})},e.componentDidMount=function(){e.jumbleAgain()},e}return Object(i.a)(n,[{key:"render",value:function(){if(0===Object.keys(this.state.letters).length){var e={};this.props.jumbledWord.forEach((function(t,n){e[n]=t})),this.setState({letters:e})}return a.a.createElement("div",null,a.a.createElement("div",{className:"flex flex-wrap center"},this.generateButtons()),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("button",{className:"center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",onClick:this.backSpaceHandler},"Backspace"),a.a.createElement("button",{className:"center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",onClick:this.onClearHandler},"Clear"),a.a.createElement("button",{className:"center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",onClick:this.props.onCheckHandler.bind(this,this.onClearHandler)},"Check"),a.a.createElement("button",{onClick:this.jumbleAgain.bind(this,!0),className:"center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"},"Jumble Again"))}}]),n}(r.Component),p=(n(76),function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).classifyLength=function(){var t={};return e.props.usedWords.forEach((function(e,n){var r=e.length;t[r]||(t[r]=[]),t[r].push(e)})),a.a.createElement("div",{className:"table center flex"},Object.values(t).map((function(e,t){return a.a.createElement("div",{className:"tracking-wide p-1 relative"},a.a.createElement("h2",null,e[0].length," letter words "),e.map((function(e){return a.a.createElement("div",{className:"",key:t},e)})))})))},e}return Object(i.a)(n,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("h1",null,"Your words : "),this.classifyLength())}}]),n}(r.Component)),b=n(66),f=n.n(b),v=n(67),g=n.n(v),j=(n(77),n(39)),k=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).jumbleWord=function(e){e=(e=e.toLowerCase()).split(""),r.shuffleArray(e),r.setState({jumbledWord:e},(function(){this.setUnderscores()}))},r.getRandomInt=function(e){return Math.floor(Math.random()*Math.floor(e))},r.selectWord=function(e){var t=Object.keys(j).filter((function(t){return t.length===e})),n=t[r.getRandomInt(t.length)],a=j[n];r.setState({validWords:new Set(a),selectedWord:n})},r.shuffleArray=function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),r=[e[n],e[t]];e[t]=r[0],e[n]=r[1]}},r.setSelectedHandler=function(e){r.setState((function(t){var n=Object(h.a)(t.selectedLetters),r=n.findIndex((function(e){return"_"===e}));return n[r]=e,Object(c.a)(Object(c.a)({},t),{},{selectedLetters:n})}))},r.setUnderscores=function(){var e="";r.state.jumbledWord.forEach((function(t){e+="_"})),r.setState({selectedLetters:e.split(""),error:null})},r.backSpace=function(){r.setState((function(e){var t=Object(h.a)(e.selectedLetters),n=t.findIndex((function(e){return"_"===e}));-1===n?t[t.length-1]="_":t[n-1]="_";return Object(c.a)(Object(c.a)({},e),{},{selectedLetters:t,error:null})}))},r.onCheckHandler=function(e){var t=r.state.selectedLetters.join("").split("_")[0];if(t.length<=2)return r.setState({error:"Two letter words don't count"});if(t=t.toLowerCase(),r.state.validWords.has(t)&&!r.state.usedWords.has(t))r.setState((function(n){var a=t.length,o=r.props.score;3===a&&(o+=5),4===a&&(o+=10),5===a&&(o+=20),6===a&&(o+=50),7===a&&(o+=75),8===a&&(o+=100),9===a&&(o+=150),10===a&&(o+=200);var s=new Set(n.usedWords);return s.add(t),e(),r.props.setScore(o),Object(c.a)(Object(c.a)({},n),{},{error:null,usedWords:s})}));else{if(!r.state.usedWords.has(t))return void r.setState({error:"Thats not english"});r.setState({error:"We have been through this before"})}},r.componentDidMount=function(){r.selectWord(r.props.wordLength)},r.state={selectedWord:null,jumbledWord:[],validWords:new Set,usedWords:new Set,selectedLetters:[],error:null},r}return Object(i.a)(n,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("header",{className:"flex text-center text-2xl"},a.a.createElement(f.a,{className:"inline-flex pl-4 Tilt br2 shadow-2",options:{max:55},style:{height:150,width:150}},a.a.createElement("div",{className:"Tilt-inner pa3"},a.a.createElement("img",{style:{paddingTop:"5px"},alt:"logo",src:g.a}))),a.a.createElement("h1",{className:"head1 center inline-flex text-white-400 "},"Word Game")),a.a.createElement("div",{class:"box transition container clearfix mx-auto border-2 rounded-none"},a.a.createElement("h1",{className:"text-right"},"SCORE : ",this.props.score),a.a.createElement("h2",{className:"text-center"},this.state.jumbledWord.join("")),a.a.createElement("h1",{className:"center tracking-widest"}," ",this.state.selectedLetters," "),this.state.selectedWord?a.a.createElement(m,{className:"center",setSelectedHandler:this.setSelectedHandler,jumbledWord:this.state.jumbledWord,jumbleWord:this.jumbleWord,selectedWord:this.state.selectedWord,backSpace:this.backSpace,setUnderscores:this.setUnderscores,onCheckHandler:this.onCheckHandler}):null,this.state.error?a.a.createElement("p",null,this.state.error):null,a.a.createElement(p,{usedWords:Object(h.a)(this.state.usedWords)})))}}]),n}(r.Component),E=(n(78),function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"Modal"},this.props.children)}}]),n}(r.Component)),y=(n(79),function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{onClick:this.props.onclick,className:"BackDrop"})}}]),n}(r.Component)),O=n(68),w=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement(O.a,{autoStart:!0,onTick:this.props.setTimeHandler,date:Date.now()+this.props.seconds,onComplete:this.props.onTimerEndHandler,renderer:function(e){e.hours;var t=e.minutes,n=e.seconds;e.completed;return a.a.createElement("span",null,"0",t," : ",n)}}))}}]),n}(r.Component),S=n(69),x=n.n(S),C=(n(230),{particles:{number:{value:30,density:{enable:!0,value_area:800}}}}),W=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={score:0,key:1,seconds:12e4,key1:0,showModal:!1,level:1,wordLength:6,scoreToBeat:100},e.setScore=function(t){e.setState({score:t})},e.rerenderGame=function(){e.setState((function(e){return Object(c.a)(Object(c.a)({},e),{},{key:e.key++,seconds:12e4,key1:e.key1++,level:e.level++,scoreToBeat:e.scoreToBeat+50,wordLength:e.wordLength++})}))},e.onContinueHandler=function(){e.setState((function(e){return Object(c.a)(Object(c.a)({},e),{},{key:e.key++,score:0,showModal:!1,seconds:12e4,key1:e.key1++,level:1,scoreToBeat:100,wordLength:6})}))},e.displayModal=function(){if(e.state.showModal)return a.a.createElement("div",null,a.a.createElement(E,{className:""},a.a.createElement("h4",null,"GAME OVER"),a.a.createElement("button",{onClick:e.onContinueHandler},"Continue")),a.a.createElement(y,{onclick:e.onContinueHandler}))},e.onTimerEndHandler=function(){e.state.score>=e.state.scoreToBeat?e.rerenderGame():e.setState({showModal:!0})},e.setTimeHandler=function(t){e.setState((function(e){return{seconds:t.total}}))},e}return Object(i.a)(n,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",{className:"text-right"},"Timer:",a.a.createElement(w,{className:"cover-right",key:this.state.key1,seconds:this.state.seconds,onTimerEndHandler:this.onTimerEndHandler,setTimeHandler:this.setTimeHandler})),a.a.createElement(k,{level:this.state.level,wordLength:this.state.wordLength,key:this.state.key,rerenderGame:this.rerenderGame,score:this.state.score,setScore:this.setScore,onContinueHandler:this.onContinueHandler,scoreToBeat:this.state.scoreToBeat}),a.a.createElement(x.a,{className:"particles",params:{particlesOptions:C}}),this.displayModal())}}]),n}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(231);s.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},39:function(e){e.exports=JSON.parse('{"orange":["age","nor","range","gore","gear","rage","gone","near","era","ogre","ore","ran","orange"],"element":["melt","meet","element","net","met","let","ten"],"contempt":["tempt","contempt","pet","met","tent","net","pot","not"],"candidate":["date","candidate","did","ate","can","tan","candid"],"goalkeeper":["goal","keeper","goalkeeper","keep","peek","reek","reap","peer","pear","peak","rake","gap"]}')},67:function(e,t,n){e.exports=n.p+"static/media/logo.bc47f899.png"},70:function(e,t,n){e.exports=n(232)},75:function(e,t,n){},76:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){}},[[70,1,2]]]);
//# sourceMappingURL=main.46f920e0.chunk.js.map
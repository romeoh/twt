var ua=navigator.userAgent,os=/iphone|ipad|ipod/gi.test(ua)?"ios":/android/gi.test(ua)?"android":/mac/gi.test(ua)?"macOS":/windows/gi.test(ua)?"Windows":"other",teamArr=[{key:"A",logo:"team_a.png",name:"\uae30\uc544 \ud0c0\uc774\uac70\uc988"},{key:"B",logo:"team_b.png",name:"\ub125\uc13c \ud788\uc5b4\ub85c\uc988"},{key:"C",logo:"team_c.png",name:"\ub450\uc0b0 \ubca0\uc5b4\uc2a4 "},{key:"D",logo:"team_d.png",name:"\ub86f\ub370 \uc790\uc774\uc5b8\uce20"},{key:"E",logo:"team_e.png",name:"\uc0bc\uc131 \ub77c\uc774\uc628\uc988"},
{key:"F",logo:"team_f.png",name:"SK \uc640\uc774\ubc88\uc2a4 "},{key:"G",logo:"team_g.png",name:"NC \ub2e4\uc774\ub178\uc2a4 "},{key:"H",logo:"team_h.png",name:"LG \ud2b8\uc708\uc2a4  "},{key:"I",logo:"team_i.png",name:"\ud55c\ud654 \uc774\uae00\uc2a4 "}],myTeam,yourTeam,correct=[],myAnswer=[],round,strike,ball,out,ranking=[];if("ios"!=os&&"android"!=os)var adTop=document.querySelector("#adTop"),adBottom=document.querySelector("#adBottom"),adMiddle=document.querySelector("#adMiddle");
window.addEventListener("DOMContentLoaded",function(){M("[data-sel-team]").on("click",function(a,b){toStep2(b)});M("#btnPlay").on("click",function(){toStep3()});M("#btnStory").on("click",function(a,b){executeKakaoStoryLink(b)});M("#btnKakao").on("click",function(a){executeURLLink(a)})},!1);
function toStep2(a){myTeam=parseInt(a.data("sel-team"),10);M('[data-match-team="1"] img').attr("src","../imgApp/"+teamArr[myTeam].logo);M('[data-match-team="1"] p').text(teamArr[myTeam].name);yourTeam=getYourTeam();randomTeam();M("#step1").css("display","none");M("#step2").css("display","block")}function getYourTeam(){var a=getRandom(0,8);return myTeam===a?getYourTeam():a}
function randomTeam(){var a=0,b;b=setInterval(function(){8==a?a=0:a++;M('[data-match-team="0"] img').attr("src","../imgApp/"+teamArr[a].logo);M('[data-match-team="0"] p').text(teamArr[a].name)},100);setTimeout(function(){clearInterval(b);b=null;M('[data-match-team="0"] img').attr("src","../imgApp/"+teamArr[yourTeam].logo);M('[data-match-team="0"] p').text(teamArr[yourTeam].name);M("#btnPlayBox").css("display","block")},2E3)}
function toStep3(a){M("#step2").css("display","none");M("#step3").css("display","block");M("#vsMyTeam").attr("src","../imgApp/"+teamArr[myTeam].logo);M("#vsYourTeam").attr("src","../imgApp/"+teamArr[yourTeam].logo);round=0;getCorrect(10);nextRound(round)}
function getCorrect(a){var b=Math.floor(Math.random()*a);void 0==correct[0]&&correct.push(b);void 0==correct[1]&&(correct[0]==b?getCorrect(a):correct.push(b));if(void 0==correct[2])if(correct[0]==b||correct[1]==b)getCorrect(a);else return correct.push(b),correct}
function nextRound(){var a;round++;a=""+('<span class="roundIdx">'+round+"\ud68c </span>");a+='<div class="numberLists"><button data-number="-1" data-disable="true" class="number" data-first></button></div><div class="numberLists"><button data-number="-1" data-disable="true" class="number" data-second></button></div>';a+='<div class="numberLists"><button data-number="-1" data-disable="true" class="number" data-third></button></div>';a+='<p data-result class="result"></p>';a+='<button data-play="'+
round+'" class="button submit">\ud655\uc778</button>';M("#roundCount").append("li",{"data-count":round});M('[data-count="'+round+'"]').html(a);selNumbers();M("#roundInfo").text(10-round+"\ud68c \ub0a8\uc558\uc2b5\ub2c8\ub2e4.");M('[data-play="'+round+'"]').on("click",function(a,f){var e=parseInt(M('[data-count="'+round+'"] [data-first]').data("number"),10),c=parseInt(M('[data-count="'+round+'"] [data-second]').data("number"),10),d=parseInt(M('[data-count="'+round+'"] [data-third]').data("number"),
10);if(-1===e||-1===c||-1===d)return alert("\uc22b\uc790\ub97c \ubaa8\ub450 \uc785\ub825\ud558\uc138\uc694."),!1;if(e===c||e===d||c===d)return alert("\uc911\ubcf5\ub418\ub294 \uc22b\uc790\ub97c \uc0ac\uc6a9\ud560\uc218 \uc5c6\uc2b5\ub2c8\ub2e4."),!1;f.css("display","none").parent().find("[data-number]").data("disable","false");myAnswer.length=0;myAnswer.push(e);myAnswer.push(c);myAnswer.push(d);checkNumber(myAnswer,correct);3===out?(e="\uacb0\uacfc: 3O",9===round?youLost():nextRound()):3===strike?
(e="\uacb0\uacfc: "+strike+"S",youWin()):(e="\uacb0\uacfc: "+strike+"S "+ball+"B",9===round?youLost():nextRound());f.prev().css("display","block").text(e)})}
function youWin(){var a={};a.win=teamArr[myTeam].key;a.lost=teamArr[yourTeam].key;console.log("\uc2b9\ub9ac");bodyData={body:a,head:{}};$.ajax({url:"http://romeoh78.appspot.com/api/baseball/add",contentType:"text/plain",data:M.json(bodyData),type:"POST",success:function(a){M("#roundCount").append("li",{"data-text":""});str="<p>"+teamArr[myTeam].name+"\uc774(\uac00) "+teamArr[yourTeam].name+"\uc744(\ub97c) \uc774\uacbc\uc2b5\ub2c8\ub2e4. <br>\uc21c\uc704\uc5d0 \ubc18\uc601\ub418\uc5c8\uc2b5\ub2c8\ub2e4.</p>";
M("[data-text]").html(str)}})}
function youLost(){var a={};a.win=teamArr[yourTeam].key;a.lost=teamArr[myTeam].key;console.log("\ud328\ubc30");bodyData={body:a,head:{}};$.ajax({url:"http://romeoh78.appspot.com/api/baseball/add",contentType:"text/plain",data:M.json(bodyData),type:"POST",success:function(a){M("#roundCount").append("li",{"data-text":""});str="<p>"+teamArr[myTeam].name+"\uc774(\uac00) "+teamArr[yourTeam].name+"\uc5d0\uac8c \ud328\ubc30\ud588\uc2b5\ub2c8\ub2e4. <br>\uc21c\uc704\uc5d0 \ubc18\uc601\ub418\uc5c8\uc2b5\ub2c8\ub2e4.</p>";M("[data-text]").html(str)}})}
function checkNumber(a,b){out=ball=strike=0;a[0]===b[0]&&strike++;a[1]===b[1]&&strike++;a[2]===b[2]&&strike++;a[0]===b[1]&&ball++;a[0]===b[2]&&ball++;a[1]===b[0]&&ball++;a[1]===b[2]&&ball++;a[2]===b[0]&&ball++;a[2]===b[1]&&ball++;0===strike&&0===ball&&(out=3);console.log(b,myAnswer);console.log(strike,ball,out)}function getRandom(a,b){return Math.floor(Math.random()*(b-a)+a)}
function executeKakaoStoryLink(a){var b="";if("\ud300\uc21c\uc704 \ubcf4\uae30"!=a.text()){b+="[ \ub9c8\uad6c! \ub9c8\uad6c! \uc22b\uc790\uc57c\uad6c ]\n\n* \uad6c\ub2e8\uc21c\uc704 *\n";for(a=0;a<ranking.length;a++)b+=ranking[a].idx+"\uc704: "+ranking[a].teamName+" "+ranking[a].win+"\uc2b9 "+ranking[a].lost+"\ud328 \uc2b9\ub960:"+ranking[a].pct+"\n";b+="\n\uac8c\uc784\ucc38\uc5ec: http://goo.gl/GZRBR\n";encodeURIComponent(b);return!1}bodyData={body:{},head:{}};$.ajax({url:"http://romeoh78.appspot.com/api/baseball/ranking",
contentType:"text/plain",data:M.json(bodyData),type:"POST",success:function(a){a=M.json(a).body.ranking;var b="";M("#step4").css("display","block");for(var c=0;9>c;c++){var d={};d.idx=c+1;d.teamKey=a[c].team;d.teamName=getTeamName(d.teamKey).split(" ")[0];d.win=a[c].win;d.lost=a[c].lost;d.total=a[c].total;d.pct=Math.floor(100*a[c].pct)/100;b+="<tr>";b+="\t<td>"+d.idx+"</td>";b+="\t<td>"+d.teamName+"</td>";b+="\t<td>"+d.total+"</td>";b+="\t<td>"+d.win+"</td>";b+="\t<td>"+d.lost+"</td>";b+="\t<td>"+
d.pct+"</td>";b+="</tr>";ranking.push(d)}M("#ranking").html(b)}})}function executeURLLink(a){a="https://twitter.com/intent/tweet?text="+encodeURIComponent("\ub9c8\uad6c! \ub9c8\uad6c! \uc22b\uc790\uc57c\uad6c! \uc6b0\ub9ac \uad6c\ub2e8\uc758 \uc2b9\ub960\uc744 \uc62c\ub824\uc8fc\uc138\uc694..\n\uac8c\uc784\ucc38\uc5ec: http://goo.gl/sucy1");window.location.href=a}function getTeamName(a){for(var b=0;b<teamArr.length;b++)if(teamArr[b].key===a)return teamArr[b].name}
function selNumbers(){M("[data-number]").on("click",function(a,b){function f(a,b){setTimeout(function(){M("body").off("touchend");try{M('[data-id="selectNum"]').remove()}catch(a){}},10)}if("false"===b.data("disable"))return!1;setTimeout(function(){function a(b,c){var e=c.data("select-number"),f=c.parent();f.parent().first().data("number",e).text(e);f.remove()}var c;c='<li class="selNum" data-select-number="0">0</li><li class="selNum" data-select-number="1">1</li>';c+='<li class="selNum" data-select-number="2">2</li>';
c+='<li class="selNum" data-select-number="3">3</li>';c+='<li class="selNum" data-select-number="4">4</li>';c+='<li class="selNum" data-select-number="5">5</li>';c+='<li class="selNum" data-select-number="6">6</li>';c+='<li class="selNum" data-select-number="7">7</li>';c+='<li class="selNum" data-select-number="8">8</li>';c+='<li class="selNum" data-select-number="9">9</li>';b.parent().append("ul",{className:"selectNumbers","data-id":"selectNum"}).last().html(c);M("[data-select-number]").on("touchstart",
a);M("[data-select-number]").on("mousedown",a)},100);M("body").on("touchend",f);M("body").on("mouseup",f)})};
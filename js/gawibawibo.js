var ua = navigator.userAgent
	,os = (/iphone|ipad|ipod/gi).test(ua) ? "ios" : 
		(/android/gi).test(ua) ? "android" :
		(/mac/gi).test(ua) ? "macOS" : 
		(/windows/gi).test(ua) ? "Windows" : "other"
	,login = 'o_2i5b4gmien'
	,api_key = 'R_866372890d3c61b40dcf2f91c0f5ba8f'
	,gbb
	,answer1, answer2, answer3
	,cbCount
	,lastGong
	,postMsg
	,hash = window.location.hash

	,answerUrl
	,idx
	,questionIdx
	,selectAnswer
	,perIdx
	,count = 5
	,intervalID
	,quiz
	,qid = getRandId()
	

if (os == 'ios' || os == 'android') {
	//init();
} else {
	var  adTop = document.querySelector('#adTop')
		,adBottom = document.querySelector('#adBottom')
		,adMiddle = document.querySelector('#adMiddle')
	//document.querySelector('body').removeChild(adTop)
	//document.querySelector('body').removeChild(adBottom)
	//document.querySelector('body').removeChild(adMiddle)
}

window.addEventListener('DOMContentLoaded', function(){
	if (M.storage('io.github.romeoh.twt.id')) {
		M('#userName').val( M.storage('io.github.romeoh.twt.id') )
		M('#myName').val( M.storage('io.github.romeoh.twt.id') )
	}
	M('[type="text"]').on('blur', function(evt, mp){
		M.storage('io.github.romeoh.twt.id', mp.val())
	})

	// 공격
	M('#g0Box a').on('click', function(){
		M('#g0Box a').addClass('checked')
		M('#g1Box a').removeClass('checked')
		M('#g2Box a').removeClass('checked')
		gbb = 1
	})
	M('#g1Box a').on('click', function(){
		M('#g0Box a').removeClass('checked')
		M('#g1Box a').addClass('checked')
		M('#g2Box a').removeClass('checked')
		gbb = 2
	})
	M('#g2Box a').on('click', function(){
		M('#g0Box a').removeClass('checked')
		M('#g1Box a').removeClass('checked')
		M('#g2Box a').addClass('checked')
		gbb = 3
	})
	M('#gongyak').on('change', function(evt, mp){
		if (mp.val() == '기타'){
			M('#gongValue').css('display', '')
		} else {
			M('#gongValue')
				.css('display', 'none')
				.val('')
		}
	})

	M('#btnStory').on('click', function(){
		executeKakaoStoryLink()
	})

	M('#btnGBB').on('click', function(){
		M('#attack').css('display', 'block')
		M('#dettack').css('display', 'none')
		M('#btnStory').css('display', 'block')
		M('#btnGBB').css('display', 'none')
	})

	// 수비
	if (hash !== '') {
		hash = hash.replace('#', '')
		hashArr = hash.split('&')
		var hashObj = {}
		for (var i=0; i<hashArr.length; i++) {
			hashKey = hashArr[i].split('=')[0]
			hashValue = hashArr[i].split('=')[1]
			hashObj[hashKey] = hashValue
		}
		if (hashObj['n']) {

			// key check
			if (M.storage(hashObj['idx']) == null) {

			} else {
				alert('가위! 바위! 보! 대결은 한번만 할수 있습니다.\n내가 "가위!바위!보!"를 제안해보세요.');
				window.location.href = 'http://goo.gl/sucy1'
				return false;
			}

			M('#dettack').css('display', 'block')
			
			if (hashObj['attach'] === '1') {
				youImg = '../imgApp/youg1.png'
			} else if (hashObj['attach'] === '2') {
				youImg = '../imgApp/youg2.png'
			} else if (hashObj['attach'] === '3') {
				youImg = '../imgApp/youg3.png'
			}
			M('#you img').attr('src', youImg)
			M('#you p').html( '<a href="http://www.twitter.com/' + decodeURIComponent(hashObj['n']) + '" target="_blank">@'+decodeURIComponent(hashObj['n']) +'</a>')

			if (hashObj['gbb'] === '1') {
				myImg = '../imgApp/myg1.png'
			} else if (hashObj['gbb'] === '2') {
				myImg = '../imgApp/myg2.png'
			} else if (hashObj['gbb'] === '3') {
				myImg = '../imgApp/myg3.png'
			}
			M('#my img').attr('src', myImg)

			if (hashObj['attach'] === '1') {
				if (hashObj['gbb'] === '1') {
					result = 'same'
				} else if (hashObj['gbb'] === '2') {
					result = 'win'
				} else if (hashObj['gbb'] === '3') {
					result = 'lost'
				}
			} else if (hashObj['attach'] === '2') {
				if (hashObj['gbb'] === '1') {
					result = 'lost'
				} else if (hashObj['gbb'] === '2') {
					result = 'same'
				} else if (hashObj['gbb'] === '3') {
					result = 'win'
				}
			} else if (hashObj['attach'] === '3') {
				if (hashObj['gbb'] === '1') {
					result = 'win'
				} else if (hashObj['gbb'] === '2') {
					result = 'lost'
				} else if (hashObj['gbb'] === '3') {
					result = 'same'
				}
			}
			if (result === 'win') {
				M('#msg').text('이겼습니다.');
				M('#gong').html('인증샷을 카스에 올려서<br><a href="http://www.twitter.com/' + decodeURIComponent(hashObj['n']) + '" target="_blank">@'+decodeURIComponent(hashObj['n']) +'</a>님의 공약인<br>“' + decodeURIComponent(hashObj['g']) + '”.<br>소원을 들어달라고 조르세요!!');
				M('#btnCerti').css('display', 'block')
				M('#myName').css('display', 'inline-block')
				
				M('#btnCerti').on('click', function(){
					var  myName = M('#myName').val()
						,postMsg = ''
						,urlMsg

					if (!myName) {
						alert('트위터 아이디를 입력해주세요.')
						return;
					}
					postMsg += '[가위! 바위! 보!]\n';
					postMsg += '@' + decodeURIComponent(hashObj['n']) + '님과의 "가위! 바위! 보!" 게임에서 이겼습니다. \n';
					postMsg += '약속대로 "' + decodeURIComponent(hashObj['g']) + '"\n';
					postMsg += '했던 소원을 들어주시기 바랍니다.\n\n';

					postMsg += 'http://goo.gl/sucy1 \n';

					var str = ''
					str += 'https://twitter.com/intent/tweet?text=';
					str += encodeURIComponent(postMsg)
					
					window.location.href = str;
				})

			} else if (result === 'lost') {
				M('#msg').text('졌습니다.');
				M('#gong').html('아쉽네요.<br>내가 먼저 "가위! 바위! 보!를 제안 해봐요~"');
				M('#btnGBB').css('display', 'block')
			} else if (result === 'same') {
				M('#msg').text('비겼습니다.');
				M('#gong').html('아~ 정말 아쉽네요.<br>내가 먼저 "가위! 바위! 보!를 제안 해봐요~"');
				M('#btnGBB').css('display', 'block')
			}
			M.storage(hashObj['idx'], 'true')
			//console.log(hashObj)
		}

	// 공격
	} else {
		M('#attack').css('display', 'block')
		M('#btnStory').css('display', 'block')
	}

}, false);



//btnStory.addEventListener('click', executeKakaoStoryLink, false);
//btnKakao.addEventListener('click', executeURLLink, false);

//  카카오 스토리
function executeKakaoStoryLink(){
	var  userName = M('#userName').val()
		,gongyak = M('#gongyak').val()
		
	postMsg = ''
	cbCount = 0
	if (!userName) {
		alert('이름을 입력하세요.');
		return false;
	}
	if (!gbb) {
		alert('"가위, 바위, 보" 중에 하나를 고르세요.');
		return false;
	}
	if (gongyak == '-1') {
		alert('상대가 가위바위보를 이겼을때 공약을 선택하세요.');
		return false;
	}
	if (gongyak == '기타' && gongValue == '') {
		alert('공약을 직접 입력하세요.');
		return false;
	}
	if (gongyak == '기타') {
		lastGong = gongValue
	} else {
		lastGong = gongyak
	}

	idkey = getRandId()
	getUrl('n=' + userName + '&attach=' + gbb + '&gbb=1&idx=gbb' + idkey + '&g=' + lastGong, 1);
	getUrl('n=' + userName + '&attach=' + gbb + '&gbb=2&idx=gbb' + idkey + '&g=' + lastGong, 2);
	getUrl('n=' + userName + '&attach=' + gbb + '&gbb=3&idx=gbb' + idkey + '&g=' + lastGong, 3);
}

function sendToKakao() {
	cbCount++
	if (cbCount == 3) {
		postMsg += '[가위!바위!보!]\n';
		postMsg += '가위,바위,보 이기는 사람에게 ' + lastGong + '\n';

		postMsg += '① 가위 (선택: ' + answer1 + ')\n';
		postMsg += '② 바위 (선택: ' + answer2 + ')\n';
		postMsg += '③ 보 (선택: ' + answer3 + ')\n';
		//postMsg += '정답: ' + quiz.idx + quiz.ans + qid + '\n';

		var str = ''
		str += 'https://twitter.com/intent/tweet?text=';
		str += encodeURIComponent(postMsg)
		
		window.location.href = str;
	}
}

function getRand(data){
	var  dataLength = data.length
		,ran = Math.floor(Math.random() * dataLength);
	return data[ran];
}

function getRandId(){
	return Math.floor(Math.random() * 99999999)
}



function getUrl(hash, idx) {
	var url = 'http://romeoh.github.io/twt/html/gawibawibo.html#' + hash
	get_short_url(url, login, api_key, function(short_url) {
		if (idx == '1') {
			answer1 = short_url
		} else if (idx == '2') {
			answer2 = short_url
		} else if (idx == '3') {
			answer3 = short_url
		}
		sendToKakao();
	});
	
}

function get_short_url(long_url, login, api_key, func){
	$.getJSON(
		"http://api.bitly.com/v3/shorten?callback=?", 
		{ 
			"format": "json",
			"apiKey": api_key,
			"login": login,
			"longUrl": long_url
		},
		function(response){
			func(response.data.url);
		}
	);
}




































var appList = ''
appList += '<li data-app="3"><a href="http://goo.gl/GZRBR">마구!마구! 숫자야구</a></li>';
appList += '<li data-app="2"><a href="http://goo.gl/qYVOp">탭! 탭! 탭!</a></li>';
appList += '<li data-app="1"><a href="http://goo.gl/sucy1">가위! 바위! 보!</a></li>';

if (M('[data-list]').selector.length > 0) {
	var currentApp = M('[data-list]').data('list')
	M('[data-list]').html(appList);
	M('[data-app="' + currentApp + '"]').remove();
}


var bannerData;
function showad() {
	function getRandom(min, max){
		return Math.floor(Math.random() * (max-min) + min)
	}
	if ( getRandom(0, 5) !== 0) {
		return false
	}
	
	if (os === 'ios') {
		return false;
	}
	bannerData = dataBanner[Math.floor(Math.random() * dataBanner.length)]
	if (M('#goStore').selector.length != 0) {
		return false;
	}
	M('body').append('div', {
		'id': 'goStore'
	})
	M('#goStore')
		.css('left', M.screen().width/2 - 150 + 'px')
		.html('<iframe src="'+bannerData['url']+'"></iframe>')
}

function closeBanner(){
	M('#goStore').animate({
		 'opacity':'0'
		,'time': '.3s'
	}, function(evt, mp){
		mp.css('display', 'none')
	})
	console.log('closeBanner()')
}

function goStore() {
	/*M('#goStore').animate({
		 'opacity':'0'
		,'time': '.3s'
	}, function(evt, mp){
		mp.css('display', 'none')
	})*/
	window.location.href = bannerData['link']
	console.log('goStore()')
}

dataBanner = [
	{'url': 'bnnr_hippop.html', 'link': 'http://goo.gl/BNYgT'},
	{'url': 'bnnr_buam.html', 'link': 'http://goo.gl/WrRJr'},
	{'url': 'bnnr_dance.html', 'link': 'http://goo.gl/otEy6'},
	{'url': 'bnnr_alice.html', 'link': 'http://goo.gl/qldVb'}
]

/* 
http://goo.gl/BNYgT
http://romeoh.github.io/kakaoStory/html/applink.html#com.hetory.kakao.hippop
market://details?id=com.hetory.kakao.hippop


http://goo.gl/WrRJr
http://romeoh.github.io/kakaoStory/html/applink.html#com.hetory.kakao.buam
market://details?id=com.hetory.kakao.buam

http://goo.gl/otEy6
http://romeoh.github.io/kakaoStory/html/applink.html#com.hetory.kakao.dance
market://details?id=com.hetory.kakao.dance

http://goo.gl/qldVb
http://romeoh.github.io/kakaoStory/html/applink.html#com.hetory.kakao.alice
market://details?id=com.hetory.kakao.alice

*/







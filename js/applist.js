var appListMin = ''


if (M('[data-list-min]').selector.length > 0) {
	var currentApp = M('[data-list-min]').data('list-min');
	M('[data-list-min]').html(appListMin);
	M('[data-app-min="' + currentApp + '"]').remove();
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







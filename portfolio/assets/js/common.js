Portfolio = {
    init: function () {
        this.splitText();
        this.updateDayTime();
        this.updateGeoLocation();
    },
    splitText: function() {
        const line = new SplitType('.split-line', { types: 'lines' });
    },
    setDayTime: function() {
        let today = new Date();   
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let hours = today.getHours().toString().replaceAll("[^0-9]","");
        let minutes = today.getMinutes(); 
        let seconds = today.getSeconds(); 

        let time = year + '/' + month + '/' + date + '<br>' + hours + ':' + minutes + ':' + seconds;

        return time;
    },
    updateDayTime: function() {
        const $time = $('.sc-visual__time');

        setInterval(() => {
            $time.html(Portfolio.setDayTime());
        }, 1000);
    },
    setGeoLocation: function() {
        let lat, lon;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude}}) => {
			}, (error) => {
			});
		} else {
            
        }
        
        $.ajax({
            url : 'https://dapi.kakao.com/v2/local/geo/coord2address.json?x=' + lon +'&y=' + lat,
            type : 'GET',
            headers : {
                'Authorization' : 'KakaoAK {REST_API_KEY}'
            },
            success : function(data) {
                console.log(data);
            },
            error : function(e) {
                console.log(e);
            }
        });
    },
    updateGeoLocation: function() {
        Portfolio.setGeoLocation();
    }
}

$(() => {
    Portfolio.init();
});
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
        const $time = $('.sc-visual .time');

        setInterval(() => {
            $time.html(Portfolio.setDayTime());
        }, 1000);
        
    },
    setGeoLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
            });
        }
    },
    updateGeoLocation: function() {
        Portfolio.setGeoLocation();
    }
}

$(() => {
    Portfolio.init();
});
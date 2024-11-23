Enterprise = {
    init: function () {
        this.handleLang();
        this.swiper.init();
    },
    handleLang: function () {
        const navItem = $('#header .lang')
        const navLink = navItem.find('.link');
        const btnLang = navItem.find('li');

        navLink.on('click', function (e) {
            e.preventDefault();
            $(this).siblings().toggleClass('open');
        })

        btnLang.on('click', function (e) {
            e.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
        })
    },
    swiper: {
        init: function() {
            this.serviceSwiper();
        },
        serviceSwiper: function() {
            let swiperService = new Swiper('.service-swiper', {
                slidesPerView: 'auto'
            })
        }
    }
}

$(() => {
    Enterprise.init();
});
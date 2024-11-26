Enterprise = {
    init: function () {
        this.handleLang();
        this.swiper.init();
        this.scrollTop();
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

        $(window).on('click', function(e) {
            if (!$(e.target).closest(navItem).length) {
                navLink.siblings().removeClass('open')
            }
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
    },
    scrollTop: () => {
        $('.btn-top').on('click', function() {
            scrollbar.scrollTo(0, 0, 1000, {
                callback: () => {
                    $('#header').removeClass('theme-white');
                    ScrollTrigger.refresh(); 
                }
            });
        })
    }
}

$(() => {
    Enterprise.init();
    $(window).on('refresh', () => {
        $('#header').removeClass('theme-white')
    })
});
Enterprise = {
    init: function () {
        this.handleLang();
        this.swiper.init();
        this.scrollTop();
    },
    handleLang: function () {
        const navItem = $('#header .lang')
        const navLink = $('#header .lang > .link');
        const btnLang = navItem.find('li');
        navLink.on('click', function (e) {
            e.preventDefault();
            $(this).siblings().toggleClass('open');

            if ($(this).siblings().hasClass('open')) {
                $(this).attr('aria-expanded', true);
            } else {
                $(this).attr('aria-expanded', false);
            }
        })

        btnLang.on('click', function (e) {
            e.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
            if ($(this).hasClass('active')) {
                $(this).find('.link').attr('aria-selected', true);
                $(this).siblings().find('.link').attr('aria-selected', false);
            }
        })

        $(window).on('click', function(e) {
            if (!$(e.target).closest(navItem).length) {
                navLink.siblings().removeClass('open')
                navLink.attr('aria-expanded', false);
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
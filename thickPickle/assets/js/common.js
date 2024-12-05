ThickPickle = {
    init: function () {
        this.introAni();
        this.scrollHdrAni();
        this.handleCursor();
        this.handleSwiper();
        this.handleImgMove();
    },
    introAni: function() {
        const introIcon = $('.intro .ico-loader');
        $('#wrap').imagesLoaded()
        .done( function( instance ) {
            const heroTitle = $('.sc-hero .title');

            gsap.killTweensOf(introIcon, 'opacity');

            const introTl = gsap.timeline()
            .to(introIcon, { opacity: 0})
            .to('.intro', { yPercent: -100})
            .from(heroTitle, { autoAlpha: 0, yPercent: 100, rotateX: -90, scaleX: 0.75, duration: 1, delay: 0.1, stagger: { each: 0.1, ease: 'power4.in'}})
        })
        .progress( function() {
            gsap.from(introIcon, { opacity: 0, duration: 1, repeat: -1, yoyo: true})
        });
    },
    scrollHdrAni: function() {
        let lastScroll = 0;
        const logo = document.querySelector('#header .logo');
        const utilTxt = document.querySelectorAll('#header .link-utils .txt');

        $(window).on('scroll', function(e) {
            const curr = $(this).scrollTop();

            if (curr > lastScroll) {
                gsap.to(utilTxt, { yPercent: -100})
                gsap.to(logo, { xPercent: -50, scale: 0.75})
            } else {
                gsap.to(utilTxt, { yPercent: 0})
                gsap.to(logo, { xPercent: -50, scale: 1})
            }

            lastScroll = curr;
        });
    },
    handleCursor: function() {
        // quickTo: 성능최적화 유틸리티
        // transform: 순서대로 적용되는 변환 함수들의 조합.
        const cursor = $('.cursor');
        let xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'back(3)'})
        let yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'back(3)'})

        gsap.set(cursor, {xPercent: -50, yPercent: -50});

        $(window).on('mousemove', function({ clientX: x, clientY: y}) {
            xTo(x);
            yTo(y);
        })
    },
    handleSwiper: function() {
        const swiperSpecies = new Swiper('.species-swiper', {
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false,
            effect: "fade",
            navigation: {
                nextEl: ".species-swiper .swiper-button-next",
                prevEl: ".species-swiper .swiper-button-prev",
            },
            pagination: {
                el: ".species-swiper .swiper-pagination",
                clickable: true
            },
            on: {
                init: function() {
                    $('.swiper-slide').removeClass('swiper-slide-active')
                },
                click: function() {
                    let idx = swiperSpecies.realIndex;
                    if (idx < $('.species-swiper .swiper-slide').length - 1) {
                        swiperSpecies.slideToLoop(idx + 1);
                    } else {
                        swiperSpecies.slideToLoop(0);
                    }
                },
            }
        })
    },
    handleImgMove: function() {
        const images = document.querySelectorAll('.swiper-slide img');
        const animators = Array.from(images).map((img, idx) => {
            return {
                xTo: gsap.quickTo(img, 'x'),
                yTo: gsap.quickTo(img, 'y'),
            };
        });
        
        $('.species-swiper').on('mousemove', function({ clientX: x, clientY: y }) {
            animators.forEach(({ xTo, yTo }, idx) => {
                const moveAmount = idx % 2 === 0 ? 0.02 : 0.05;
                const multiplier = (idx === 1 || idx === 2) ? -1 : 1;
                
                xTo(x * moveAmount * multiplier);
                yTo(y * moveAmount * multiplier);
            });
        });
    }
}

$(() => {
    ThickPickle.init();
});
ThickPickle = {
    init: function () {
        this.introAni();
        this.scrollHdrAni();
        this.handleCursor();
        this.handleImgMove();
        this.handleSwiper();
        this.nav();
    },
    /**
     * 인트로 애니메이션
     */
    introAni: function() {
        const introIcon = $('.intro .ico-loader');

        $('html').css('overflow', 'hidden');
        gsap.from(introIcon, { 
            opacity: 0, 
            duration: 1,
            repeat: -1, 
            yoyo: true,
            ease: 'power2.inOut'
        })

        $(window).on('load', function() {
            const heroTitle = $('.sc-hero .title');
            
            gsap.killTweensOf(introIcon, 'opacity');
            const introTl = gsap.timeline()
            .to(introIcon, { 
                opacity: 0
            })
            .to('.intro', { 
                yPercent: -100
            })
            .from(heroTitle, { 
                autoAlpha: 0, 
                yPercent: 100, 
                rotateX: -90, 
                scaleX: 0.75, 
                duration: 1, 
                delay: 0.1,
                stagger: { 
                    each: 0.1, 
                    ease: 'power4.in'
                },
                onComplete: () => {
                    $('html').css('overflow', 'auto');
                }
            })
        })
    },
    /**
     * 헤더 스크롤 상하 애니메이션
     */
    scrollHdrAni: function() {
        let lastScroll = 0;
        const logo = document.querySelector('#header .logo');
        const utilTxt = document.querySelectorAll('#header .link-utils .txt');

        $(window).on('scroll', function(e) {
            const curr = $(this).scrollTop();

            if (curr > lastScroll) {
                gsap.to(utilTxt, { 
                    yPercent: -100
                })
                gsap.to(logo, { 
                    xPercent: -50, 
                    scale: 0.75
                })
            } else {
                gsap.to(utilTxt, { 
                    yPercent: 0
                })
                gsap.to(logo, { 
                    xPercent: -50, 
                    scale: 1
                })
            }

            lastScroll = curr;
        });
    },
    /**
     * 커서 컨트롤 함수
     */
    handleCursor: function() {
        const cursor = $('.cursor');

        let xTo = gsap.quickTo(cursor, 'x', { 
            duration: 0.4, 
            ease: 'back(3)'
        })

        let yTo = gsap.quickTo(cursor, 'y', { 
            duration: 0.4, 
            ease: 'back(3)'
        })

        gsap.set(cursor, {
            xPercent: -50, 
            yPercent: -50
        });

        $(window).on('mousemove', function({ clientX: x, clientY: y}) {
            xTo(x);
            yTo(y);
        })
    },
    /**
     * 스와이퍼
     * swiperSpecies: sc-species 영역 스와이퍼
     */
    handleSwiper: function() {
        const swiperSpecies = new Swiper('.species-swiper', {
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false,
            effect: "fade",
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".species-swiper .swiper-button-next",
                prevEl: ".species-swiper .swiper-button-prev",
            },
            pagination: {
                el: ".species-swiper .swiper-pagination",
                clickable: true
            },
            on: {
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
    /**
     * 마우스 이미지 컨트롤 애니메이션
     */
    handleImgMove: function() {
        $('.species-swiper').mousemove(function(e) {
            xVal = (1 - (e.clientX / (window.innerWidth / 2)));
            yVal = (1 - (e.clientY / (window.innerHeight / 2)));

            gsap.set('.sc-species', {
                '--x': xVal, 
                '--y': yVal
            })
        })
    },
    /**
     * 네비게이션 영역 스크롤 이동
     */
    nav: function() {
        const logo = $('#header .logo');
        const utils = $('#header .link-utils');

        scrollTo = (t1, t2) => {
            $(t1).on('click', (e) => {
                e.preventDefault();
                gsap.to('html, body', { duration: 1, scrollTo: t2})
            })
        }

        scrollTo(logo, 0);
        scrollTo(utils, '.sc-species');
    }
}

$(() => {
    ThickPickle.init();
});
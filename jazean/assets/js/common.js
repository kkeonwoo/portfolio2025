Jazean = {
    init: function () {
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ease: 'none'});

        // this.openingAni();
        this.setStrokeAnimation('.path');
        this.scrollAni();
        this.setSwiper();
    },
    openingAni: function() {
        $('#wrap').imagesLoaded()
        .done( function( instance ) {
            const opeingTl = gsap.timeline()
            .set('body', { onStart: () => {
                $('body').addClass('is-loaded');
            }})
            .to('.line-logo .path', { strokeDashoffset: 0})
            .to('.line-logo .logo-roots', { autoAlpha: 1})
            .from('.sc-visual .txt-area .char', { autoAlpha: 0, yPercent: 100, ease: 'linear', stagger: { amount: 2, ease: 'power2.in'}})
            .from('#header .link', { autoAlpha: 0, yPercent: -100, stagger: { amount: 1.5, from: 'end', ease: 'powe2.out'}})
            .to('.sc-visual .txt-area', { autoAlpha: 0, yPercent: 100}, '+=1')
            .to('.group-line', { y: -56}, '<')
            .from('.snb-item', { autoAlpha: 0, y: 100, stagger: { each: 0.2}})
            .from('.scroll-circle', { autoAlpha: 0}, '<')
            .set('body', { overflow: 'auto'})
        });
    },
    scrollAni: function() {
        // gsap.utils.toArray('section').forEach((sc, idx) => {
        //     let path = $(sc).find('.line:not(".line-logo") .path');
            
        //     const svgTl = gsap.timeline()
        //     .to(path, { strokeDashoffset: 0})
            
        //     ScrollTrigger.create({
        //         trigger: sc,
        //         start: 'top center',
        //         // endTrigger: '.sc-grain',
        //         end: 'bottom center',
        //         animation: svgTl,
        //         scrub: true,
        //         markers: true,
        //     })
        // })

        // 질문
        // [0] 과 .get(0)의 차이
        // 둘다 dom요소 반환하는게 아닌지?
        // video
        // const $techVideo = $('.sc-tech video');
        // const videoDuration = $techVideo.get(0).duration; // nan 오류
        
        // ScrollTrigger.create({
        //     trigger: '.sc-tech',
        //     start: 'top center',
        //     end: 'bottom center',
        //     scrub: true,
        //     markers: true,
        //     onUpdate: (self) => {
        //         $techVideo.get(0).currentTime = self.progress * videoDuration;
        //     }
        // })

        ScrollTrigger.create({
            trigger: '.sc-roast',
            start: 'top top',
            end: 'bottom bottom',
            // animation: ,
            markers: true,
            scrub: 0,
        })
    },
    setSwiper: function() {
        const swiperProduct = new Swiper('.sc-product .swiper-product', {
            loop: true,
            loopAdditionalSlides: 0,
            initialSlide: 1,
            slidesPerView: 4.5,
            centeredSlides: true,
            navigation: {
                nextEl: ".swiper-product .btn-next",
                prevEl: ".swiper-product .btn-prev",
           },
        })

        const swiperNews = new Swiper('.sc-news .swiper-news', {
            slidesPerView: 'auto',
            navigation: {
                nextEl: ".sc-news .btn-next",
                prevEl: ".sc-news .btn-prev",
           },
        })
    },
    getPathLength: function(t) {
        return $(t)[0].getTotalLength();
    },
    setStrokeAnimation: function(t) {
        $(t).each((_, path) => {
            const pathLength = this.getPathLength(path);
            gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength})
        })
    }
}

$(() => {
    Jazean.init();
});
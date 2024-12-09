Jazean = {
    init: function () {
        this.openingAni();
        this.setStrokeAnimation('.path');
        // this.scrollAni();
        this.setSwiper();
        this.handleCursor();
        this.handleSnb();
    },
    openingAni: function() {
        $('#wrap').imagesLoaded()
        .done( function( instance ) {
            const headTxt = new SplitType('.sc-visual .txt-area *', { types: 'chars', });

            const opeingTl = gsap.timeline()
            .set('body', { onStart: () => {
                $('body').addClass('is-loaded');
            }})
            .to('.line-logo .path', { strokeDashoffset: 0})
            .to('.line-logo .logo-roots', { autoAlpha: 1})
            // .from('.sc-visual .txt-area .char', { autoAlpha: 0, yPercent: 100, ease: 'linear', stagger: { amount: 2, ease: 'power2.in'}})
            // .from('#header .link', { autoAlpha: 0, yPercent: -100, stagger: { amount: 1.5, from: 'end', ease: 'powe2.out'}})
            // .to('.sc-visual .txt-area', { autoAlpha: 0, yPercent: 100}, '+=1')
            .to('.group-line', { y: -56}, '<')
            // .from('.snb-item', { autoAlpha: 0, y: 100, stagger: { each: 0.2}})
            // .from('.scroll-circle', { autoAlpha: 0}, '<')
            // .set('body', { overflow: 'auto'})
        });
    },
    scrollAni: function() {
        // const svgTl = gsap.timeline()
        // .to('.sc-visual .path', { strokeDashoffset: 0})
        // ScrollTrigger.create({
        //     trigger: '.sticky-wrap',
        //     start: 'top top',
        //     end: 'bottom bottom',
        //     animation: svgTl,
        //     scrub: true,
        //     markers:true,
        //     onUpdate:() => {
        //         console.log('aaa');
        //     }
        // })
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

        // ScrollTrigger.create({
        //     trigger: '.sc-roast',
        //     start: 'top top',
        //     end: 'bottom bottom',
        //     // animation: ,
        //     markers: true,
        //     scrub: 0,
        // })
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
    handleSnb: function() {
        const $linkSnb = $('.snb .link-snb');

        $linkSnb.each((idx, link) => {
            $(link).on('click', function(e) {
                e.preventDefault();
                let target = $(this).attr('href');
                
                lenis.scrollTo(target)
            })
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
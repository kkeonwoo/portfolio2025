Jazean = {
    init: function () {
        this.openingAni();
        this.setStrokeAnimation('.path');
        this.scrollAni();
        this.setSwiper();
        this.handleCursor();
        this.handleSnb();
        this.textSplit();
        this.mobileHdr();
    },
    openingAni: function() {
        $('#wrap').imagesLoaded()
        .done( function( instance ) {
            const headTxt = new SplitType('.sc-visual .txt-area *', { types: 'chars', });
            lenis.stop();
            const opeingTl = gsap.timeline()
            .set('body', { onStart: () => {
                $('body').addClass('is-loaded');
            }})
            .to('.line-logo .path', { strokeDashoffset: 0})
            .to('.line-logo .logo-roots', { autoAlpha: 1})
            .from('.sc-visual .txt-area .char', { autoAlpha: 0, yPercent: 100, ease: 'linear', stagger: { amount: 2, ease: 'power2.in'}})
            .from('#header .link', { autoAlpha: 0, yPercent: -100, stagger: { amount: 1.5, from: 'end', ease: 'powe2.out'}})
            .to('.sc-visual .txt-area', { autoAlpha: 0, yPercent: 100}, '+=1')
            .from('.group-line', { y: -156}, '<')
            .from('.snb-item', { autoAlpha: 0, y: 100, stagger: { each: 0.2}})
            .from('.scroll-circle', { autoAlpha: 0, onComplete: () => {
                lenis.start()
            }}, '<')
        });
    },
    scrollAni: function() {
        // 질문
        // [0] 과 .get(0)의 차이
        // .get(0) 비디오 객ㅊㅔ 접근 가능
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
        // let flag = false;
        // 질문
        // 아무리 해도 loop를 안쓰고
        // 슬라이드 양 끝에서 끝으로 이동하는 코드가 정상 작동하지 않습니다...
        const swiperProduct = new Swiper('.sc-product .swiper-product', {
            initialSlide: 1,
            slidesPerView: 1.2,
            centeredSlides: true,
            navigation: {
                nextEl: ".swiper-product .btn-next",
                prevEl: ".swiper-product .btn-prev",
            },
            on: {
                init: function() {
                    slidePosition(this);

                    if (this.isEnd) {
                    } 
                    
                    // $('.swiper-product .btn-prev').on('click', (e) => {
                    //     if (this.isBeginning) {
                    //         this.slideTo(this.slides.length - 1);
                    //     } 
                    // });
                },
                slideChange: function() {
                    slidePosition(this);
                    // const slides = this.slides;
                    
                    // slides.forEach((slide, idx) => {
                    //     if (idx < this.activeIndex) {
                    //         $(slide).addClass('before-slide');
                    //     } else if (idx > this.activeIndex) {
                    //         $(slide).addClass('after-slide');
                    //     }
                    // })
                },
                // slideChangeTransitionStart: function() {
                //     flag = true;
                // },
                // slideChangeTransitionEnd: function() {
                //     flag = false;
                // }
                // slideChangeTransitionStart: function (_, progress) {
                //     if (progress === 0) {
                //         $('.swiper-product .btn-prev').on('click', function() {
                //             console.log('click');
                //         })
                //         console.log(this.realIndex+'번째 slide입니다.');
                //     } else if (this.realIndex === this.slides.length - 1) {
                //         $('.swiper-product .btn-next').on('click', function() {
                //             console.log('click');
                //         })
                //         console.log(this.realIndex+'번째 slide입니다.');
                //     }
                // }
                // reachBeginning: function() {
                //     this.slideTo(this.slides.length - 1);
                // },
                // reachEnd: function() {
                //     console.log('click next');
                //     this.slideTo(0);
                // },
            },
            breakpoints: {
                960: {
                    slidesPerView: 5.05,
                },
            },
        })
        function slidePosition(swiper) {
            const slides = $('.sc-product .swiper-slide');
            let img = slides.find('img');
            gsap.utils.toArray('.sc-product .swiper-slide').forEach((slide, idx) => {
                if (idx < swiper.activeIndex) {
                    gsap.set(img[idx], { x: (idx, slide) => {
                        return (idx + 1) * 90;
                    }, scale: 0.46})
                } else if (idx > swiper.activeIndex) {
                    gsap.set(img[idx], { x: (idx, slide) => {
                        return (idx + 1) * 90 * -1;
                    }, scale: 0.46})
                } else {
                    gsap.set(img[idx], { x: (idx, slide) => {
                        return 0;
                    }, scale: 1})
                    
                }
            })
        }


        $('.swiper-product .swiper-button-disabled').on('click', () => {
            console.log('click');
            
            console.log(swiperProduct.activeIndex);
            
            // this.slideTo(0);
        });
        $('.swiper-product .btn-next').on('click', () => {
            console.log('click');
            
            console.log(swiperProduct.activeIndex);
            
            // this.slideTo(0);
        });
        // 버튼에 부모를 만들고 자식에 btn-disabled인 경우 체크 slideto(0)

        // $('.swiper-product .btn-next').on('click', () => {
            
        //     if (!flag) {
        //         console.log('bb');
        //         if (swiperProduct.isEnd) {
        //             swiperProduct.slideToLoop(0);
        //         }
        //     }
        // });

        // $('.swiper-product .btn-prev').on('click', () => {
        //     if (!flag) {
        //         if (swiperProduct.isBeginning) {
        //             swiperProduct.slideToLoop(swiperProduct.slides.length - 1);
        //         }
        //     }
        // });

        // 버튼 클릭 이벤트: 커스텀 루프 구현
        // document.querySelector('.swiper-product .btn-next').addEventListener('click', () => {
        //     if (swiperProduct.activeIndex === swiperProduct.slides.length - 1) {
        //     // 마지막 슬라이드에서 첫 슬라이드로 이동
        //     swiperProduct.slideTo(0); // 두 번째 매개변수: 0 (즉시 이동)
        //     }
        // });
        
        // document.querySelector('.swiper-product .btn-prev').addEventListener('click', () => {
        //     if (swiperProduct.activeIndex === 0) {
        //     // 첫 슬라이드에서 마지막 슬라이드로 이동
        //     swiperProduct.slideTo(swiperProduct.slides.length - 1, 0); // 두 번째 매개변수: 0 (즉시 이동)
        //     }
        // });

        // $('.swiper-product .btn-next').on('click', () => {
        //     if (swiperProduct.activeIndex === swiperProduct.slides.length) {
        //         swiperProduct.slideTo(0);
        //     }
        // });

        // $('.swiper-product .btn-prev').on('click', () => {
        //     if (swiperProduct.activeIndex === 1) {
        //         swiperProduct.slideTo(swiperProduct.slides.length);
        //     }
        // });

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
        let xTo = gsap.quickTo(cursor, '--x', { duration: 0.4, ease: 'back(3)'})
        let yTo = gsap.quickTo(cursor, '--y', { duration: 0.4, ease: 'back(3)'})
        // let xTo2 = gsap.quickTo(cursor, '--xBefore', { duration: 0.4})
        // let yTo2 = gsap.quickTo(cursor, '--yBefore', { duration: 0.4})
        
        // absolte로 offset

        gsap.set(cursor, {xPercent: -50, yPercent: -50});

        $(window).on('mousemove, pointermove', function({ clientX: x, clientY: y}) {
            xTo(x);
            yTo(y);
            // xTo2(x);
            // yTo2(y);
        })

        $('a, button').hover(function() {
            $(cursor).addClass('hover');
        }, function() {
            $(cursor).removeClass('hover');
        })

        $('.swiper-slide').hover(function() {
            const tl = gsap.timeline()
            .to('.cursor', { '--opacity': 0})
            .to('.cursor .ico-arw', { opacity: 1, x: 0}, '<')
            .to('.bg-circle-full .path', { strokeDashoffset: 0}, '<')
        }, function() {
            const tl = gsap.timeline()
            .to('.cursor .ico-arw-left', { opacity: 0, x: -20})
            .to('.cursor .ico-arw-right', { opacity: 0, x: 20}, '<')
            .to('.bg-circle-full .path', { strokeDashoffset: $('.bg-circle-full .path')[0].getTotalLength()}, '-=0.2')
            .to('.cursor', { '--opacity': 1})
        })
    },
    handleSnb: function() {
        const $linkSnb = $('.snb .link-snb');

        $linkSnb.each((idx, link) => {
            $(link).on('click', function(e) {
                e.preventDefault();
                let flavorTop;
                let href = $(this).attr('href');
                if (href === "#roast") {
                    flavorTop = $('.sc-roast').offset().top;
                    lenis.scrollTo(flavorTop)
                } else if (href === '#flavor') {
                    flavorTop = $('.sc-roast').offset().top + $('.sc-roast').height() / 2;
                    lenis.scrollTo(flavorTop)
                } else {
                    lenis.scrollTo(href)
                }
            })
        })
    },
    textSplit: function() {
        const splitTxt = new SplitType('.marquee .txt', { types: 'words' });

        gsap.utils.toArray('.marquee').forEach((marquee, idx) => {
            $(marquee).on('mouseenter', function() {
                let txt = $(marquee).find('.word');
                const tl = gsap.timeline()
                .to(txt, { autoAlpha: 0, yPercent: -100, duration: 0.3, ease: 'power2.inOut', stagger: {each: 0.1}})
                .set(txt, { yPercent: 100})
                .to(txt, { autoAlpha: 1, yPercent: 0, duration: 0.3, ease: 'power2.inOut', stagger: { each: 0.1}})
            })
        })
    },
    mobileHdr: function() {
        const hamburger = $('.btn-hamburger');
        let frag = false;

        hamburger.on('click', function() {
            if (!frag) {
                frag = true;
                $('#header').toggleClass('on');
                
                if ($('#header').hasClass('on')) {
                    lenis.stop();
                    const tl = gsap.timeline()
                    .set('.nav-item, #header .sns dt, #header .sns-item', { autoAlpha: 0, yPercent: 100 }) 
                    .to('.group-nav', { autoAlpha: 1})
                    .to('.nav-item, #header .sns dt, #header .sns-item', { autoAlpha: 1, yPercent: 0, stagger: { each: .3}, onComplete: () => {
                        frag = false;
                    }})
                } else {
                    const tl = gsap.timeline()
                    .to('.nav-item, #header .sns dt, #header .sns-item', { autoAlpha: 0, yPercent: 100, stagger: { each: .1, from: 'end'}})
                    .to('.group-nav', { autoAlpha: 0, onComplete: () => {
                        frag = false;
                    }})
                    lenis.start();
                }
            }
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
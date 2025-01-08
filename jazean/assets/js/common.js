Jazean = {
    init: function () {
        this.openingAni();
        this.setStrokeAnimation('.path');
        this.setSwiper();
        this.handleCursor();
        this.handleSnb();
        this.textSplit();
        this.mobileHdr();
    },
    openingAni: function() {
        lenis.stop();

        $(window).on('load', function() {
            $('body').addClass('is-loaded');

            const headTxt = new SplitType('.sc-visual .txt-area *', { types: 'chars', });
            const opeingTl = gsap.timeline({ paused: true})
            .to('.line-logo .path', { 
                strokeDashoffset: 0
            })
            .to('.line-logo .logo-roots', { 
                autoAlpha: 1
            })
            .from('.sc-visual .txt-area .char', { 
                autoAlpha: 0, 
                yPercent: 100, 
                ease: 'linear', 
                stagger: { 
                    amount: 2, 
                    ease: 'power2.in'
                }
            })
            .to('#header .link', { 
                y: 0, 
                autoAlpha: 1,
                stagger: { 
                    amount: 1.5, 
                    from: 'end', 
                    ease: 'powe2.out'
                }
            })
            .to('.sc-visual .txt-area', { 
                autoAlpha: 0, 
                yPercent: 100
            }, '+=1')
            .from('.group-line', {
                y: -156
            }, '<')
            .from('.snb-item', { 
                autoAlpha: 0, 
                y: 100, 
                stagger: { 
                    each: 0.2
                }
            })
            .from('.scroll-circle', { 
                autoAlpha: 0, 
                onComplete: () => {
                    lenis.start()
                }
            }, '<')

            if ($('body').hasClass('is-loaded')) {
                opeingTl.play();
            }
        })
    },
    setSwiper: function() {
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
                },
                slideChange: function() {
                    slidePosition(this);
                },
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

        let nextFlag = false;
        let prevFlag = false;

        $('.swiper-product .swiper-btn-wrap').on('click', function() {
            const isDisabled = $(this).find('.btn.swiper-button-disabled').length > 0;
            if ($(this).hasClass('next')) {
                if (isDisabled) {
                    if (!nextFlag) {
                        nextFlag = true;
                    } else {
                        swiperProduct.slideTo(0);
                        nextFlag = false;
                        prevFlag = true;
                    }
                } else {
                    nextFlag = false;
                }
            } else {
                if (isDisabled) {
                    if (!prevFlag) {
                        prevFlag = true;
                    } else {
                        swiperProduct.slideTo(swiperProduct.slides.length - 1);
                        prevFlag = false;
                        nextFlag = true;
                    }
                } else {
                    prevFlag = false;
                }
            }
        });

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
        const cursor = $('.cursor');
        let xTo = gsap.quickTo(cursor, '--x', { duration: 0.4, ease: 'back(3)'})
        let yTo = gsap.quickTo(cursor, '--y', { duration: 0.4, ease: 'back(3)'})

        gsap.set(cursor, {xPercent: -50, yPercent: -50});

        $(window).on('mousemove, pointermove', function({ clientX: x, clientY: y}) {
            xTo(x);
            yTo(y);
        })

        $('a, button').hover(function() {
            $(cursor).addClass('hover');
        }, function() {
            $(cursor).removeClass('hover');
        })

        $('.swiper-slide').hover(function() {
            const tl = gsap.timeline()
            .to('.cursor', { 
                '--opacity': 0
            })
            .to('.cursor .ico-arw', { 
                opacity: 1, 
                x: 0
            }, '<')
            .to('.bg-circle-full .path', { 
                strokeDashoffset: 0
            }, '<')
        }, function() {
            const tl = gsap.timeline()
            .to('.cursor .ico-arw-left', { 
                opacity: 0, 
                x: -20
            })
            .to('.cursor .ico-arw-right', { 
                opacity: 0, 
                x: 20
            }, '<')
            .to('.bg-circle-full .path', { 
                strokeDashoffset: $('.bg-circle-full .path')[0].getTotalLength()
            }, '-=0.2')
            .to('.cursor', { 
                '--opacity': 1
            })
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
            $(marquee).hover(function() {
                gsap.to($(this).find('.txt .word'), { 
                    yPercent: -100, 
                    stagger: { 
                        amount: 0.3
                    }
                })
            }, function() {
                gsap.to($(this).find('.txt .word'), { 
                    yPercent: 0, 
                    stagger: { 
                        amount: 0.3
                    }
                })
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
                    .set('.nav-item, #header .sns dt, #header .sns-item', { 
                        autoAlpha: 0, 
                        yPercent: 100 
                    }) 
                    .to('.group-nav', { 
                        autoAlpha: 1
                    })
                    .to('.nav-item, #header .sns dt, #header .sns-item', { 
                        autoAlpha: 1, 
                        yPercent: 0, 
                        stagger: { 
                            each: .3
                        }, 
                        onComplete: () => {
                            frag = false;
                        }
                    })
                } else {
                    const tl = gsap.timeline()
                    .to('.nav-item, #header .sns dt, #header .sns-item', { 
                        autoAlpha: 0, 
                        yPercent: 100, 
                        stagger: { 
                            each: .1, 
                            from: 'end'
                        }
                    })
                    .to('.group-nav', { 
                        autoAlpha: 0, 
                        onComplete: () => {
                        frag = false;
                        }
                    })
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
            
            gsap.set(path, { 
                strokeDasharray: pathLength, 
                strokeDashoffset: pathLength
            })
        })
    }
}

$(() => {
    Jazean.init();
});
Jazean = {
    init: function () {
        history.scrollRestoration = 'manual';
        this.openingAni();
        this.setStrokeAnimation('.path');
        this.setSwiper();
        this.handleCursor();
        this.handleSnb();
        this.textSplit();
        this.mobileHdr();
    },
    /**
     * 인트로 애니메이션
     */
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
            .to('#header .link, #header .btn-hamburger', { 
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
    /**
     * 스와이퍼
     * product section swiper
     * news section swiper
     */
    setSwiper: function() {
        const swiperProduct = new Swiper('.sc-product .swiper-product', {
            initialSlide: 1,
            slidesPerView: 1.4,
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
    /**
     * 마우스 이벤트
     */
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

        const $moveBtn = $('.btn-move');
        $moveBtn.each((idx, btn) => {
            $(window).on('mousemove', function(e) {
                const cursorRect = cursor[0].getBoundingClientRect(); /* 커서 사이즈 */
                const btnRect = $(btn)[0].getBoundingClientRect(); /* 버튼 사이즈 */
                const isHover = /* 겹치는 영역 */
                cursorRect.right > btnRect.left &&
                cursorRect.left < btnRect.right &&
                cursorRect.bottom > btnRect.top &&
                cursorRect.top < btnRect.bottom;
                
                if (isHover) {
                    // 버튼 중앙값
                    const btnCenterX = btnRect.left + btnRect.width / 2;
                    const btnCenterY = btnRect.top + btnRect.height / 2;
                    // 버튼 기준 커서 위치
                    const offsetX = (e.clientX - btnCenterX);
                    const offsetY = (e.clientY - btnCenterY);
                    // x, y 최대값
                    const rangeX = Math.max(-btnRect.width / 2, Math.min(btnRect.width / 2, offsetX));
                    const rangeY = Math.max(-btnRect.height / 2, Math.min(btnRect.height / 2, offsetY));
                    
                    gsap.to(btn, {
                        '--x': `${rangeX}px`,
                        '--y': `${rangeY}px`,
                        ease: 'none',
                    });
                } else {
                    gsap.to(btn, { 
                        '--x': 0, 
                        '--y': 0,
                        ease: 'none' 
                    });
                }
            })
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
    /**
     * 사이드 네비게이션
     */
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
    /**
     * 텍스트 marquee 효과 구현
     */
    textSplit: function() {
        const splitTxt = new SplitType('.marquee .txt', { types: 'words' });

        gsap.utils.toArray('.marquee').forEach((marquee, idx) => {
            $('.marquee-wrap').on('mouseenter', function() {
                gsap.fromTo($(this).find('.txt .word, svg'),{
                    yPercent: 0,
                }, { 
                    yPercent: -100, 
                    stagger: { 
                        amount: 0.3
                    }
                })
            })
        })
    },
    /**
     * 모바일 햄버거 메뉴, 애니메이션
     */
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
    /**
     * svg 길이
     * @param {*} t svg class path 
     * @returns path length
     */
    getPathLength: function(t) {
        return $(t)[0].getTotalLength();
    },
    /**
     * svg 초기값 세팅
     * @param {*} t svg class path 
     */
    setStrokeAnimation: function(t) {
        $(t).each((_, path) => {
            const pathLength = Math.floor(this.getPathLength(path) + 3);
            
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
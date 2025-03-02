Capsulin = {
    init: function () {
        this.introAni();
        this.customHTML();
        this.handleSwiper();
        this.handleMenu();
        this.handleMenuItem();
        this.textMarquee();
        this.handleTab();
        this.handleModal();
    },
    /**
     * 인트로 애니메이션
     */
    introAni: function() {
        $(window).on('load', function() {
            const num = $(".intro .num");
            const obj = { value: 0 };
            const tl = gsap.timeline()
            gsap.to(obj, {
                value: 100,
                ease: "none",
                onUpdate: () => {
                    num.text(`${Math.round(obj.value)}`);
                },
                onComplete: () => {
                    const introTl = gsap.timeline()
                    .to('.intro', { 
                        delay: .5, 
                        yPercent: -100
                    })
                    .add(Capsulin.aniHeroEnter())
                    .call(() => {
                        lenis.start()
                    })
                }
            });
        })
    },
    /**
     * custom 영역 DOM
     */
    customHTML: function() {
        const $titleArea = $('.color .title-area');
        const $bgArea = $('.color .bg-area');
        const $imgArea = $('.color .img-area');
        const $colorList = $('.color .color-list');
        const colors = [ 
            { rgb: 'rgb(20, 20, 20)', text:`Black`},
            { rgb: 'rgb(84, 90, 97)', text:`Dark<br/> Grey`},
            { rgb: 'rgb(240, 240, 240)', text:`Light<br/> Silver`},
            { rgb: 'rgb(107, 57, 51)', text:`Bronze`},
            { rgb: 'rgb(153, 103, 50)', text:`Golden<br/> Brown`},
            { rgb: 'rgb(255, 212, 241)', text:`Pink`},
            { rgb: 'rgb(224, 189, 112)', text:`Light<br/> Gold`},
            { rgb: 'rgb(222, 172, 87)', text:`Gold`},
            { rgb: 'rgb(173, 181, 127)', text:`Light<br/> Green`},
            { rgb: 'rgb(55, 130, 117)', text:`Dark<br/> Green`},
            { rgb: 'rgb(170, 130, 179)', text:`Light<br/> Purple`},
            { rgb: 'rgb(127, 75, 128)', text:`Dark<br/> Purple`},
            { rgb: 'rgb(201, 157, 52)', text:`Yellow`},
            { rgb: 'rgb(227, 119, 48)', text:`Light<br/> Orange`},
            { rgb: 'rgb(157, 72, 41)', text:`Dark<br/> Orange`},
            { rgb: 'rgb(176, 42, 40)', text:`Red`},
            { rgb: 'rgb(188, 232, 230)', text:`Light<br/> Blue`},
            { rgb: 'rgb(132, 191, 209)', text:`Blue`},
            { rgb: 'rgb(8, 48, 97)', text:`Dark<br/> Blue`},
            { rgb: 'rgb(227, 214, 188)', text:`Beige`}
        ]

        colors.forEach((color, idx) => {
            const titleHtml = `
                <strong class="split-txt title-box${idx === 0 ? ' active' : ''}"><span class="txt-area"><span class="split-line txt font-e">${color.text}</span></span></strong>
            `/* 제목 */
            const bgHtml = `
                <div class="bg${idx === 0 ? ' active' : ''}" style="--bg-color: ${color.rgb}"></div>
            `/* 배경 */
            const imgHtml = `
                <div class="tab-cont-wrap tab-cont${idx+1}${idx === 0 ? ' active' : ''}">
                    <div class="con color-con1 active">
                        <div class="img-box">
                            <img src="./assets/images/custom/custom${idx + 1}/img-capsule1.webp" alt="">
                        </div>
                    </div>
                    <div class="con color-con2">
                        <div class="img-box">
                            <img src="./assets/images/custom/custom${idx + 1}/img-capsule2.webp" alt="">
                        </div>
                    </div>
                    <div class="con color-con3">
                        <div class="img-box">
                            <img src="./assets/images/custom/custom${idx + 1}/img-capsule3.webp" alt="">
                        </div>
                    </div>
                </div>
            `/* 이미지 컨텐츠 */
            const colorHtml = `
                <li class="swiper-slide color-item${idx === 0 ? ' active' : ''}" style="--bg-color: ${color.rgb}">
                    <button class="btn btn-color" aria-label="color${idx + 1}"></button>
                </li>
            `/* 색상 아이템 */

            // HTML 업데이트
            $titleArea.append(titleHtml);
            $bgArea.append(bgHtml);
            $imgArea.append(imgHtml);
            $colorList.append(colorHtml);

            let activeIdx = 0; /* 현재 active 요소 인덱스 */
            let flag = false;

            const $colorItem = $(document).find('.color-item');
            const $bgItem = $(document).find('.color .sc-left .bg');
            const $bgItem2 = $(document).find('.color .sc-right .bg');
            const $conItem1 = $(document).find('.color .sc-left .tab-cont-wrap');
            const $titleItem = $(document).find('.color .title-box');

            $colorItem.on('click', function() {
                let idx = $(this).index();
                const dir = idx > activeIdx ? "up" : "down";
    
                if (idx === activeIdx || flag) return;
    
                flag = true;
                $(this).addClass('active').siblings().removeClass('active');
                
                const titleTl = gsap.timeline()
                .fromTo($('.color .title-box.active .char'), { 
                    yPercent: 0
                }, { 
                    yPercent: -120, 
                    duration: 0.3, 
                    stagger: {
                        amount: 0.2
                    }, 
                    onComplete: () => {
                        $titleItem.eq(idx).addClass('active').siblings().removeClass('active');
                    }
                })
                .fromTo($titleItem.eq(idx).find('.char'), { 
                    yPercent: 120
                }, { 
                    yPercent: 0, 
                    duration: 0.3, 
                    stagger: {
                        amount: 0.2
                    }
                }, '-=0.2')
                
                $bgItem.eq(idx).addClass('active').siblings().removeClass('active');
                $bgItem2.eq(idx).addClass('active').siblings().removeClass('active');
                $conItem1.eq(idx).addClass('active').siblings().removeClass('active');

                const bgTl = gsap.timeline()
                .fromTo([$bgItem.eq(activeIdx), $bgItem2.eq(activeIdx), $conItem1.eq(activeIdx)], { 
                    clipPath: "inset(0 0 0 0)"
                }, { 
                    clipPath: dir === "up" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)"
                })
                .fromTo([$bgItem.eq(idx), $bgItem2.eq(idx), $conItem1.eq(idx)], { 
                    clipPath: dir === "up" ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)" 
                }, { 
                    clipPath: 'inset(0% 0% 0% 0%)',
                    onComplete: () => {
                        return flag = false;
                    }
                },'<');
    
                activeIdx = idx; /* 클릭 요소로 activeIdx 업데이트 */
            })
        })
    },
    /**
     * swiper 관련 함수
     * color-swiper
     * process-swiper
     */
    handleSwiper: function() {
        // 모바일 컬러 리스트 스와이퍼
        let colorSwiper, processSwiper;
        let isPortrait = window.matchMedia("(orientation: portrait)");

        function initColorSwiper() {
            if (isPortrait) {
                colorSwiper = new Swiper(".color-swiper", {
                    slidesPerView: 'auto',
                });
                processSwiper = new Swiper('.process-swiper', {
                    slidesPerView: 'auto',
                    pagination: {
                        el: ".swiper-pagination",
                        type: "progressbar",
                    }
                })
            } else {
                colorSwiper.destroy();
                colorSwiper = undefined
                processSwiper.destroy();
                processSwiper = undefined
            }
        }

        initColorSwiper()
        $(window).on('resize', () => {
            initColorSwiper()
        })

    },
    /**
     * 메뉴
     * 햄버거 버튼 클릭 이벤트 관련 애니메이션
     */
    handleMenu: function() {
        const $btnMenu = $('.btn-hamburger');
        const $navNum = $('.nav-item .num');
        const $navTxt = $('.nav-item .txt');
        const $credit = $('.link-credit .txt:nth-child(1)');
        const $header = $('#header');
        $btnMenu.on('click', function() {
            $header.toggleClass('open');

            if ($header.hasClass('open')) {
                gsap.to('.menu', { autoAlpha: 1})
                Capsulin.fadeUp($navNum);
                Capsulin.fadeUp($navTxt);
                Capsulin.fadeUp($credit);
            } else {
                const tl = gsap.timeline()
                .add(Capsulin.fadeOut($navNum), '<')
                .add(Capsulin.fadeOut($navTxt), '<')
                .add(Capsulin.fadeOut($credit), '<')
                .to('.menu', { 
                    autoAlpha: 0
                })
            }
        })
    },
    /**
     * 메뉴 리스트
     * 메뉴 아이템 호버, 클릭 이벤트
     */
    handleMenuItem: function() {
        const $menuItem = $('.menu .nav-item');

        $menuItem.hover(function(e) {
            let t = e.currentTarget;
            gsap.to($menuItem, { 
                duration: .3, 
                opacity: 0.3})
            gsap.to(t, { 
                duration: .3, 
                opacity: 1})
        }, function() {
            gsap.to($menuItem, { 
                duration: .3, 
                opacity: 1
            })
        })

        const $navNum = $('.nav-item .num');
        const $navTxt = $('.nav-item .txt');
        const $credit = $('.link-credit .txt:nth-child(1)');

        $menuItem.each((idx, item) => {
            $(item).click(function() {
                let target = $(item).find('.link').attr('href');
                const tl = gsap.timeline()
                .add(Capsulin.fadeOut($navNum), '<')
                .add(Capsulin.fadeOut($navTxt), '<')
                .add(Capsulin.fadeOut($credit), '<')
                .to('.menu', { 
                    autoAlpha: 0,
                    onComplete: () => {
                        $('#header').removeClass('open')
                        lenis.scrollTo(`${target}`)
                    }
                })
            })
        })
    },
    /**
     * 텍스트 마퀴 애니메이션
     */
    textMarquee: function() {
        const $marquee = $('.ani-marquee');
        const text = new SplitType('.ani-marquee .txt', { types: 'chars' })

        $marquee.each((idx, m) => {
            $(m).hover(function() {
                gsap.to($(this).find('.txt .char'), { 
                    yPercent: -100,
                    stagger: { 
                        amount: 0.3
                    }
                })
            }, function() {
                gsap.to($(this).find('.txt .char'), { 
                    yPercent: 0,
                    stagger: { 
                        amount: 0.3
                    }
                })
            })
        })
    },
    /**
     * 탭 요소 클릭 이벤트
     */
    handleTab: function() {
        const $tabItem = $('.tab-list .tab-item');
        const $tabCont = $('.tab-cont');
        let activeIdx = 0;
        let flag = false;

        $tabItem.on('click', function() {
            let tabName = $(this).data('tab');
            let siblings = $(tabName).siblings();
            let idx = $(this).index();
            const dir = idx > activeIdx ? "up" : "down";

            if (idx === activeIdx || flag) return;

            flag = true;
            
            $(this).addClass('active').siblings().removeClass('active');

            gsap.to(siblings,{ 
                clipPath: dir === "up" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)"
            });
            gsap.fromTo($(tabName),{ 
                clipPath: dir === "up" ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)" 
            }, { 
                clipPath: 'inset(0% 0% 0% 0%)',
                onComplete: () => {
                    return flag = false;
                }
            });

            activeIdx = idx;
        })
    },
    /**
     * 모달 컨트롤
     */
    handleModal: function() {
        const btnModal = $('.btn-modal');

        btnModal.on('click', function() {
            $('.dimmed').addClass('active');
            $('.modal').toggleClass('modal-closed');
            if ($('.modal').hasClass('modal-closed')) {
                lenis.start();
            } else {
                lenis.stop();
            }
        });
        
        $('.dimmed').on('click', function() {
            $('.dimmed').removeClass('active');
            $('.modal').addClass('modal-closed');
            lenis.start();
        })
    },
    /**
     * 아래서 위로 나타나는 애니메이션
     * @param {*} t 애니메이션 타겟 
     * @param {*} amount 애니메이션 총 시간
     */
    fadeUp: function(t, amount) {
        lenis.stop();
        gsap.set(t, { yPercent: 130 })
        $(window).on('resize', function() {
            gsap.set(t, { yPercent: 130 })
        })
        let tween = gsap.to(t, { 
            yPercent: 0, 
            stagger: { 
                amount: amount ? amount : 0,
            },
            onComplete: () => {
                lenis.start()
            }
        })
    },
    /**
     * 아래서 위로 사라지는 애니메이션
     * @param {*} t 애니메이션 타겟
     * @param {*} dir 스크롤 방향
     * @param {*} amount 애니메이션 총 시간
    */
    fadeOut: function(t, dir, amount) {
        lenis.stop();
        gsap.set(t, { yPercent: 0 })
        $(window).on('resize', function() {
            gsap.set(t, { yPercent: 0 })
        })

        let tween = gsap.to(t, { 
            yPercent: () => {
                return dir < 0 ? 120 : -120
            }, 
            stagger: {
                amount: amount ? amount : 0,
            },
            onComplete: () => {
                lenis.start()
            }
        })
    },
    /**
     * hero 영역 애니메이션
     * @returns timeline 반환
     */
    aniHeroEnter: function() {
        const tl = gsap.timeline()
        .fromTo('.sc-hero .img-box', { 
            autoAlpha: 0,
            yPercent: -100
        }, { 
            autoAlpha: 1, 
            yPercent: 0
        })
        .fromTo('.sc-hero .title .char', { 
            yPercent: 100
        }, { 
            yPercent: 0, 
            stagger: { 
                amount: .3
            }
        }, '<')
        .fromTo('.sc-hero .scroll-down-area .txt', { 
            yPercent: -100
        }, { 
            yPercent: 0
        }, '<')
        .fromTo('.sc-hero .scroll-down-area .ico', { 
            yPercent: -100
        }, { 
            yPercent: 0
        }, '<')

        return tl;
    },
}

$(() => {
    Capsulin.init();
});
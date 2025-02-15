Portfolio = {
    init: function () {
        this.splitText();
        this.updateDayTime();
        this.setGeoLocation();
        this.handleNav();
        this.handleResize();
        // this.handleMatter();
        this.masterAni();
        this.workNav();

        $(window).on('resize', _.debounce(() => {
            SplitType.revert();
            this.handleResize();
        }, 100))
    },
    splitText: function() {
        const splits = [
            new SplitType('.split-all', { types: 'lines, words, chars' }),
            new SplitType('.split-word', { types: 'lines, words' }),
            new SplitType('.split-line', { types: 'lines' })
        ];
        
        splits.forEach(split => split.elements.forEach(el => {
            $(el).find('.txt-cover')?.unwrap()
            $(el).children().wrap('<div class="txt-cover"></div>')
        }))
    },
    setDayTime: function() {
        let today = new Date();   
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let hours = today.getHours().toString().replaceAll("[^0-9]","");
        let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes(); 
        let seconds = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds(); 

        let time = year + '/' + month + '/' + date + '<br>' + hours + ':' + minutes + ':' + seconds;

        return time;
    },
    updateDayTime: function() {
        const $time = $('.sc-visual__time');

        $time.html(Portfolio.setDayTime());
        setInterval(() => {
            $time.html(Portfolio.setDayTime());
        }, 1000);
    },
    setGeoLocation: function() {
        const $geo = $('.sc-visual__geo');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude }}) => {
                const lat = latitude; // 위도
                const lng = longitude; // 경도

                let geoText = lat + '°, &nbsp;' + lng + '°';

                $geo.html(geoText);

                // return geoText;
                // 카카오 API
                // const geocoder = new kakao.maps.services.Geocoder();
                // geocoder.coord2Address(lng, lat, (result, status) => {
                //     if (status === kakao.maps.services.Status.OK) {
                //         const address = result[0].address.address_name;
                //     }
                // })
            }, (error) => {
                $geo.html('37.5642135°, 127.0016985°');
            });
        } else {
            $geo.html('37.5642135°, 127.0016985°');
        }
    },
    handleMatter: function() {
        const container = document.querySelector("#container");

        const keywordTl = gsap.timeline()
        .to('.sc-about__top .keywords__item', { 
            autoAlpha: 1, 
            filter: 'blur(0px)', 
            ease: 'linear',
            duration: 1,
            stagger: {
                each: .2,
                from: "random",
            },
        })
        .to('.sc-about__top .keywords__item', { 
            autoAlpha: 0, 
            filter: 'blur(5px)', 
            ease: 'linear',
            duration: 1,
            stagger: {
                each: .2,
                from: "random",
            },
        })
        // about keyword 애니메이션
        const st = ScrollTrigger.create({
            trigger: '.sc-about__top',
            start: '0% 0%',
            end: '100% 100%',
            animation: keywordTl,
            scrub: 0,
        })

        gsap.utils.toArray(".keywords__txt").forEach((text) => {
            const anim = gsap.to(text, {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: true
                }
            });
    
            text.addEventListener("click", () => {
                console.log("텍스트 클릭됨, ScrollTrigger 제거");
    
                // 현재 애니메이션 완료된 상태로 설정
                gsap.set(text, { autoAlpha: 1, filter: 'blur(0)' });
    
                // ScrollTrigger 제거
                st.kill();
    
                // Matter.js 실행
                startMatter(text);
            });
        });

        let matterEngine = null; // 기존 엔진을 저장할 변수
        let matterRender = null; // 기존 렌더를 저장할 변수
        let matterRunner = null; // 기존 러너를 저장할 변수
        
        function startMatter(text) {
            const { Engine, Render, World, Bodies, Runner, Events } = Matter;
            const container = document.querySelector("#container");
        
            // 기존 엔진이 있으면 삭제 후 새로 생성
            if (matterEngine) {
                Matter.World.clear(matterEngine.world);
                Matter.Engine.clear(matterEngine);
                Matter.Render.stop(matterRender);
                Matter.Runner.stop(matterRunner);
                container.removeChild(matterRender.canvas); // 기존 캔버스 삭제
            }
        
            // 새로운 Matter.js 엔진 생성
            matterEngine = Engine.create();
            matterEngine.world.gravity.y = 1;
        
            // 새로운 렌더 생성
            matterRender = Render.create({
                element: container,
                engine: matterEngine,
                options: {
                    width: container.clientWidth,
                    height: container.clientHeight,
                    wireframes: false,
                    background: "transparent"
                }
            });
        
            // 러너 생성 (FPS 컨트롤)
            matterRunner = Runner.create();
        
            // 클릭한 텍스트의 위치 및 크기 가져오기
            const rect = text.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(text); // CSS 속성 가져오기
        
            // Matter.js 바디 생성 (CSS 속성 반영)
            const body = Bodies.rectangle(
                rect.left - container.offsetLeft + rect.width / 2,
                rect.top - container.offsetTop + rect.height / 2,
                rect.width,
                rect.height,
                {
                    restitution: 0.6,
                    friction: 0.5,
                    isStatic: false,
                    render: {
                        fillStyle: computedStyle.backgroundColor, // 배경색 유지
                        strokeStyle: computedStyle.borderColor, // 테두리 유지
                        lineWidth: parseFloat(computedStyle.borderWidth) || 2 // 보더 두께
                    }
                }
            );
        
            // 바닥 추가 (텍스트가 떨어질 수 있도록)
            const ground = Bodies.rectangle(
                container.clientWidth / 2,
                container.clientHeight,
                container.clientWidth,
                10,
                { isStatic: true }
            );
        
            // 월드에 추가
            World.add(matterEngine.world, [body, ground]);
        
            // 엔진 실행
            Engine.run(matterEngine);
            Runner.run(matterRunner, matterEngine);
            Render.run(matterRender);
        
            // 기존 HTML 요소 숨김 (Matter.js만 보이도록)
            text.style.visibility = "hidden";
        }
    },
    handleNav: function() {
        const $nav = $('.header .gnb');
        const $navLink = $nav.find('.gnb__link');

        // nav link 클릭 시
        $navLink.on('click', function(e) {
            e.preventDefault();
            
            let target = $(this).attr('href');
            let moveY = target !== "#home" ? $(target).offset().top : 0;

            $navLink.closest('.gnb__item').find('.gnb__link').removeClass('gnb__link--active');
            $(this).addClass('gnb__link--active');
            $('html, body').animate({ scrollTop: moveY}, 500);

            if(window.innerWidth < 769) {
                navTl.reverse();
            }
        })

        // 모바일 햄버거 버튼
        const $btnHamburger = $('.btn__hamburger');
        let flag = false;

        const navTl = gsap.timeline({ paused: true })
        .set($nav, { autoAlpha: 1})
        .to($nav, { 
            '--inset1': 0,
            onStart: () => {
                $('.header').addClass('open');
            },
            onReverseComplete: () => {
                $('.header').removeClass('open');
            }
        })
        .to($nav, { '--inset2': 0})
        .to($navLink, { 
            yPercent: 0, 
            ease: 'power2.inOut',
            stagger: {
                each: .1
            }
        })

        $btnHamburger.on('click', function() {
            flag = !flag;
            $btnHamburger.toggleClass('open', flag).attr('aria-expanded', flag);
            $nav.attr('aria-hidden', !flag);

            if (flag) {
                lenis.stop();
                navTl.play();
            } else {
                lenis.start();
                navTl.reverse();
            }
        })
    },
    handleResize: function() {
        const $nav = $('.header .gnb');
        const $navLink = $nav.find('.gnb__link');
        const isMobile = window.innerWidth < 769;

        gsap.set($nav, {autoAlpha: isMobile ? 0 : 1});
        gsap.set($navLink, { yPercent: isMobile ? 120 : 0 });
        $nav.attr('aria-hidden', isMobile);

        ScrollTrigger.refresh();
    },
    translateX: function() {
        const aniTarget = $('.ani-tx');
        
        aniTarget.each((_, ani) => {
            const $textTranslateX = $(ani).find('.line');
            
            ScrollTrigger.create({
                trigger: $(ani).closest('.section__title-area'),
                start: '0% 100%',
                end: '100% 100%',
                animation: gsap.to($textTranslateX, { xPercent: 0}),
                scrub: 0,
            })
        })
    },
    translateY: function(t, stagger) {
        const tl = gsap.timeline({ paused: true })
        .to(t, {
            autoAlpha: 1,
            yPercent: 0,
            duration: .3,
            stagger: stagger
        })

        return tl;
    },
    txtAniOpacity: function(t) {
        const tl = gsap.timeline()
        .to(t, { 
            opacity: 1, 
            stagger: {
                each: .1
            }
        })

        return tl;
    },
    textAniY: function() {
        // split text
        new SplitType('.txt-aniY', { types: 'chars' })

        const texts = $('.txt-aniY');
        
        texts.each((idx, text) => {
            // clone text
            const $cover = $(text).find('.txt-cover');
            const $clone = $(text).find('.word').clone();
            $($cover).append($clone);
            
            const $chars = $(text).find('.char');

            const tween = gsap.to($chars, { 
                duration: .3,
                yPercent: -100, 
                stagger: { 
                    amount: .3
                },
                paused: true,
            })

            $(text).hover(() => {
                tween.play();
            }, () => {
                tween.reverse();
            })
        })
    },
    introAni: function() {
        lenis.stop();

        const introTl = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'expo.inOut'
            }
        })
        .to('.intro__txt:nth-child(1) .line', { 
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
        })
        .to('.intro__txt:nth-child(1)', {
            clipPath: 'inset(0% 50% 0% 50%)',
        }, '-=.2')
        .to('.intro__txt:nth-child(2)', {
            clipPath: 'inset(0 0 100% 0)',
        })      
        .to('.intro__txt:nth-child(3)', {
            clipPath: 'inset(0 0 0 100%)',
        })      
        .to('.intro__txt:nth-child(4)', {
            clipPath: 'inset(50% 0 50% 0)',
        })      
        .to('.intro__txt:nth-child(5)', {
            autoAlpha: 0,
            scale: 2,
            duration: 1.5
        })     
        .from('.sc-visual__video', {
            scale: 2
        }, '-=0.6')
        .to('.sc-visual__info > *, .logo', {
            autoAlpha: 1,
            stagger: {
                each: .1
            },
            onComplete: () => {
                lenis.start();
            }
        }, '-=.6')

        // gsap.utils.toArray('.intro__txt').forEach((char, idx) => {
        //     introTl.to(`.intro__txt .char`, { 
        //         yPercent: -100 * idx, 
        //         duration: .3,
        //         stagger: { 
        //             amount: 1,
        //         },
        //     })
        // })

    },
    sectionAni: function() {
        gsap.utils.toArray('.section, .footer').forEach((sec, idx) => {
            ScrollTrigger.create({
                trigger: sec,
                start: '0% 100%',
                end: '100% 100%',
                animation: gsap.to('body', { '--scaleX': 1}),
            })
        })
    },
    visualAni: function() {
        // header logo 스크롤 애니메이션
        const visualVideoTl = gsap.timeline()
        .to('.header', { 
            top: 0
        })
        .to('.header .logo__link', { 
            scale: 1, 
            yPercent: 0
        }, '<')

        ScrollTrigger.create({
            trigger: '.sc-visual__video-area',
            start: '0% 0%',
            end: '100% 0%',
            animation: visualVideoTl,
            scrub: 0,
        })

        // header 애니메이션
        ScrollTrigger.create({
            trigger: '.sc-visual__title-area',
            start: '0% 0%',
            end: '100% 100%',
            endTrigger: '#footer',
            onUpdate: ({ direction }) => {
                if ( direction > 0) {// 내릴 때
                    if (!$('.btn__hamburger').hasClass('open')) {
                        gsap.to('.logo', { scale: 1.2})
                        gsap.to('.gnb, .header__utils, .btn__hamburger', { y: -70})
                    }
                } else { // 올릴 때 
                    if (!$('.btn__hamburger').hasClass('open')) {
                        gsap.to('.logo', { scale: 1})
                        gsap.to('.gnb, .header__utils, .btn__hamburger', { y: 0})
                    }
                }
            }
        })

        // title 스크롤 애니메이션
        const visualTitleTl = gsap.timeline()
        .add(titleAni())
        .fromTo('.sc-visual', { 
            '--y': '150%', 
            '--opacity': 0
        }, { 
            '--y' : '0%', 
            '--opacity': 1 
        }, '-=.3')

        function titleAni() {
            const tl = gsap.timeline()

            gsap.utils.toArray('.sc-visual__title-area .line').forEach((line, idx) => {
                tl.to(line, { 
                    xPercent: 0
                })
            })

            return tl;
        }

        ScrollTrigger.create({
            trigger: '.sc-visual__title-area',
            start: '0% 50%',
            end: '100% 100%',
            animation: visualTitleTl,
            scrub: 0,
        })
    },
    aboutAni: function() {
        const keywordTl = gsap.timeline()
        .to('.sc-about__top .keywords__item', { 
            autoAlpha: 1, 
            filter: 'blur(0px)', 
            ease: 'linear',
            duration: 1,
            stagger: {
                each: .2,
                from: "random",
            },
        })
        .to('.sc-about__top .keywords__item', { 
            autoAlpha: 0, 
            filter: 'blur(5px)', 
            ease: 'linear',
            duration: 1,
            stagger: {
                each: .2,
                from: "random",
            },
        })
        // about keyword 애니메이션
        ScrollTrigger.create({
            trigger: '.sc-about__top',
            start: '0% 0%',
            end: '100% 100%',
            animation: keywordTl,
            scrub: 0,
        })

        // about left 진입 시 애니메이션
        const enterTl = Portfolio.translateY('.sc-about .section__left .word', { amount: .3})
        const enterTl2 = Portfolio.translateY('.sc-about .section__right .word', { amount: .3})
        // about left 영역 스크롤트리거
        ScrollTrigger.create({
            trigger: '.sc-about .section__left',
            start: '0% 0%',
            end: '100% 100%',
            onEnter: () => enterTl.play(),
            onLeaveBack: () => enterTl.reverse()
        })
        // about right 영역 스크롤트리거
        ScrollTrigger.create({
            trigger: '.sc-about .section__right',
            start: '0% 0%',
            end: '100% 100%',
            endTrigger: '.sc-about',
            animation: Portfolio.txtAniOpacity('.sc-about .char'),
            scrub: 0,
            onEnter: () => enterTl2.play(),
            onLeaveBack: () => enterTl2.reverse(),
        })
    },
    projectAni: function() {
        // project card hover 시 애니메이션
        const $projectCard = $('.project-card');

        $projectCard.each((idx, card) => {
            let $projectTags = $(card).parent().find('.project-card__tag')
            $(card).on('mouseenter', () => {
                gsap.to($projectTags, {
                    y: -10,
                    duration: .3,
                    stagger: {
                        each: .1,
                        repeat: 1,
                        repeatDelay: .1,
                        yoyo: true,
                    },
                })
            })
        })

        // sc-project 스크롤 애니메이션
        const $projectItem = $('.sc-project__item');

        $projectItem.each((_, project) => {
            const $marquee = $(project).find('.marquee');
            const $marqueeTxt = $(project).find('.marquee__txt');
            const $projectCnt = $(project).find('.project-card__content');

            // marquee Animation
            const marqeeContainMotion = gsap.to($marquee,{
                xPercent: -100,
                duration: .1,
                paused: true,
            })
            const marqueeAni = gsap.to($marqueeTxt,{
                repeat: -1,
                xPercent: -100,
                duration: 15,
                paused: true,
            })
            ScrollTrigger.create({ // container
                trigger: project,
                start: '0% 100%',
                end: '100% 0%',
                animation: marqeeContainMotion,
                scrub: 1,
            })
            ScrollTrigger.create({ // marquee
                trigger: project,
                start: '0% 100%',
                end: '100% 0%',
                toggleActions: 'play pause play pause',
                animation: marqueeAni,
            })

            // marquee txt enter Animation
            const enterTl = gsap.timeline({ paused: true})
            .to($projectCnt, { '--scaleX': 1})
            .to($marquee, { autoAlpha: 1, yPercent: 0}, '-=.1')

            ScrollTrigger.create({
                trigger: project,
                start: '0% 50%',
                end: '100% 50%',
                animation: enterTl,
                // toggleActions: 'play reverse play reverse'
            })
        })

        // process link Animation
        const $linkProcess = $('.sc-project__link');
        const processTween = gsap.to($linkProcess, { duration: 2, ease:'power2.out', '--rotate': 1080, paused: true})
        $linkProcess.hover(function() {
            gsap.to($linkProcess, { duration: .3, borderColor: '#dfe3e8'})
            processTween.play();
        }, function() {
            gsap.to($linkProcess, { duration: .3, borderColor: '#40454b'})
            processTween.reverse();
        })

        ScrollTrigger.create({
            trigger: '.sc-project__link-wrap',
            start: '0% 100%',
            end: '100% 70%',
            animation: gsap.to($linkProcess, { xPercent: 0}),
            scrub: 0,
        })
    },
    workAni: function() {
        const $workBg = $('.sc-work__bg-area');
        const $workList = $('.sc-work__list');
        const $workItem = $('.sc-work__item');

        $workItem.each((idx, item) => {
            let activeIdx = 0;
            $(item).on('mouseenter', function() {
                const dir = idx > activeIdx ? 'up' : 'down';
                const except = `.sc-work__bg-area.pc .bg:not(:nth-child(${idx + 1}))`
                const target = `.sc-work__bg-area.pc .bg:nth-child(${idx + 1})`
    
                const bgAnimation = gsap.timeline({ overwrite: 'auto'})
                .to(except, { 
                    clipPath: () => dir === 'up' ? 'inset(100% 0 0% 0)': 'inset(0% 0 100% 0)', 
                    onComplete: () => {
                        gsap.set(target, { zIndex: ++count })
                    }
                })
                .fromTo(target, { 
                    clipPath: () => dir === 'up' ? 'inset(0% 0 100% 0)': 'inset(100% 0 0% 0)',  
                }, {
                    clipPath: 'inset(0% 0 0% 0)' 
                }, '<')

                activeIdx = idx;
            })
        })

        // work item mouse 추적
        let posX = window.innerWidth / 2,
            posY = window.innerHeight / 2,
            xTo = gsap.quickTo($workBg, "--x", { duration: 0.3}),
            yTo = gsap.quickTo($workBg, "--y", { duration: 0.3}),
            count = 5;
        
        gsap.set($workBg, {'--x': posX, '--y': posY})

        $workList.on('mousemove', function(e) {
            posX = e.clientX;
            posY = e.clientY;

            xTo(posX);
            yTo(posY);
        })
        
        // work item hover 시 애니메이션
        $workList.hover(function(e) {
            gsap.to($workBg, { '--inset': '0%', duration: .3, ease: 'powe2.in' })
        }, function() {
            gsap.to($workBg, { '--inset': '50%', duration: .3, ease: 'power2.out' })
        })

        // work 영역 스크롤 애니메이션
        ScrollTrigger.create({
            trigger: '.sc-work',
            start: '0% 80%',
            end: '100% 80%',
            animation: gsap.to($workItem, { xPercent: 0, stagger: { each: .1}}),
            scrub: 0,
            onEnter: () => {
                gsap.to('.sc-work .hr__line', { scale: 1})
            }
        })
    },
    goalAni: function() {
        const enterTl = Portfolio.translateY('.sc-goal__title .word', { each: .1})
        const enterTl2 = Portfolio.translateY('.sc-goal__txt .word', { amount: .5})
        // goal 영역 스크롤트리거
        ScrollTrigger.create({
            trigger: '.sc-goal',
            start: '0% 50%',
            end: '100% 50%',
            animation: Portfolio.txtAniOpacity('.sc-goal__txt .char'),
            scrub: 0,
            onEnter: () => {
                enterTl.play()
                enterTl2.play()
            },
            onLeaveBack: () => {
                enterTl.reverse()
                enterTl2.reverse()
            }
        })
    },
    footerAni: function() {
        // footer 하단 애니메이션
        const footerBottomTween = gsap.to('.footer__marquee', { autoAlpha: 1, yPercent: 0, paused: true})

        ScrollTrigger.create({
            trigger: '.footer__bottom',
            start: '0% 80%',
            end: '100% 80%',
            animation: gsap.to('.footer .marquee__txt', { xPercent: -100, repeat: -1, duration: 20}),
            onEnter: () => {
                footerBottomTween.play()
            },
            onLeaveBack: () => {
                footerBottomTween.reverse()
            },
        })
    },
    masterAni: function() {
        // gsap.set('.intro__txt .char', { yPercent: 100})
        gsap.set('.intro__txt:nth-child(1) .line', { autoAlpha: 0, yPercent: 100})
        gsap.set('.sc-visual__info > *, .logo', { autoAlpha: 0})
        gsap.set('.sc-about .word, .sc-goal .word', { autoAlpha: 0, yPercent: 120})
        gsap.set('.ani-tx .line', { xPercent: idx => idx === 0 || idx === 3 ? -100 : 100 })
        gsap.set('.header .logo__link', { scale: 5, yPercent: -500})
        gsap.set('.sc-visual__title-area .line', { xPercent: idx => idx % 2 === 0 ? -120 : 120})
        gsap.set('.project-card__title', { autoAlpha: 0, yPercent: 120})
        gsap.set('.sc-project__link', { xPercent: 100})
        gsap.set('.sc-about__top .keywords__item', { autoAlpha: 0, filter: 'blur(10px)'})
        gsap.set('.sc-work__item', { xPercent: 100})
        gsap.set('.footer__marquee', { autoAlpha: 0, yPercent: 80})
        gsap.set('.footer .marquee__txt', { yPercent: 18})

        Portfolio.introAni();
        $(window).on('load', () => {
            Portfolio.sectionAni();
            Portfolio.visualAni();
            Portfolio.translateX();
            Portfolio.textAniY();
            Portfolio.aboutAni();
            Portfolio.projectAni();
            Portfolio.workAni();
            Portfolio.goalAni();
            Portfolio.footerAni();
        })
    },
    workNav: function() {
        let flag = false;
        const $workNavItem = $('.snb__item');
        const $workItem = $('.sc-work__item[id]');
        let workNavPadding = Math.abs($('.sc-work__right').offset().top - $('.sc-work__list').offset().top);
        let workItemPosY = $workItem.map((idx, item) => {
            return ($(item).offset().top - workNavPadding).toFixed(0);
        }).get();

        $(window).on('scroll', () => {
            if (flag) return;
            let wTop = $(window).scrollTop().toFixed(0);
            
            for (let i = 0; i < workItemPosY.length; i++) {
                if (wTop >= workItemPosY[i] - 1) {
                    $workNavItem.eq(i).addClass("snb__item--active").siblings().removeClass('snb__item--active');
                }
            }
        })

        $workNavItem.on('click', function(e) {
            flag = true;
            e.preventDefault();

            let navIdx = $(this).index();
        
            if ($workItem.length) {
                $(this).addClass('snb__item--active').siblings().removeClass('snb__item--active');
                $('html, body').animate({ scrollTop: workItemPosY[navIdx] }, 300, function() {
                    flag = false;
                });
            } else {
                flag = false;
            }
        });

    },
}

$(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'none' })
    Portfolio.init();
});
Portfolio = {
    init: function () {
        this.splitText();
        this.updateDayTime();
        this.setGeoLocation();
        this.masterAni();
        this.workNav();
    },
    splitText: function() {
        const splits = [
            new SplitType('.split-all', { types: 'lines, words, chars' }),
            new SplitType('.split-word', { types: 'lines, words' }),
            new SplitType('.split-line', { types: 'lines' })
        ];
        
        splits.forEach(split => split.elements.forEach(el => $(el).children().wrap('<div class="txt-cover"></div>')))
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
    visualAni: function() {
        // header logo 스크롤 애니메이션
        const visualVideoTl = gsap.timeline()
        .to('.header', { 
            top: 0
        })
        .to('.header .logo img', { 
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
            animation:visualTitleTl ,
            markers: true,
            scrub: 0,
        })
    },
    aboutAni: function() {
        // about left 진입 시 애니메이션
        const enterTl = gsap.timeline({ paused: true })
        .to('.sc-about .section__left .word', {
            yPercent: 0,
            stagger: {
                amount: .3
            }
        })
        // about left 영역 스크롤트리거
        ScrollTrigger.create({
            trigger: '.sc-about .section__left',
            start: '0% 0%',
            end: '100% 100%',
            onEnter: () => enterTl.play(),
            onLeaveBack: () => enterTl.reverse()
        })
        // about right 진입 시 애니메이션
        const enterTl2 = gsap.timeline({ paused: true })
        .to('.sc-about .section__right .word', {
            yPercent: 0,
            stagger: {
                amount: .8
            }
        })
        // about right 영역 스크롤 시 애니메이션
        const aboutTl = gsap.timeline()
        .to('.sc-about .char', { 
            opacity: 1, 
            stagger: {
                each: .1
            }
        })
        // about right 영역 스크롤트리거
        ScrollTrigger.create({
            trigger: '.sc-about',
            start: () => {
                const rightTop = $('.sc-about .section__right').offset().top;

                return `top+=${rightTop} 100%`;
            },
            end: '100% 100%',
            animation: aboutTl,
            scrub: 0,
            onEnter: () => enterTl2.play(),
            onLeaveBack: () => enterTl2.reverse(),
            invalidateOnRefresh: true,
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
        const $marquee = $('.sc-project .marquee');

        const marqeeContainMotion = gsap.to($marquee,{
            xPercent: -100,
            duration: .1,
            paused: true,
        })

        ScrollTrigger.create({
            trigger: '.sc-project',
            start: '0% 100%',
            end: '100% 0%',
            animation: marqeeContainMotion,
            scrub: 1,
        })

        $projectItem.each((_, project) => {
            const $marqueeTxt = $(project).find('.marquee__txt');
            const marqueeAni = gsap.to($marqueeTxt,{
                repeat: -1,
                xPercent: -100,
                duration: 15,
                paused: true,
            })

            ScrollTrigger.create({
                trigger: project,
                start: '0% 100%',
                end: '100% 0%',
                animation: marqueeAni,
                toggleActions: 'play pause resume pause',
            })
        })
    },
    workAni: function() {
        const $workItem = $('.sc-work__item');
        
        $workItem.each((idx, item) => {
            // work item mouse 추적
            let xTo = gsap.quickTo(item, "--x", { duration: 0.3}),
                yTo = gsap.quickTo(item, "--y", { duration: 0.3});
                
            $(item).on('mousemove', function(e) {
                let posX = e.offsetX;
                let posY = e.offsetY;

                xTo(posX);
                yTo(posY);
            })
            // work item hover 시 애니메이션
            $(item).hover(function() {
                gsap.to(item, { '--inset': 0, duration: .3, ease: 'powe2.in' })
            }, function() {
                gsap.to(item, { '--inset': '50%', duration: .3, ease: 'power2.out' })
            })
        })

        // work 영역 스크롤 애니메이션
        ScrollTrigger.create({
            trigger: '.sc-work',
            start: '0% 80%',
            end: '100% 80%',
            animation: gsap.to($workItem, { xPercent: 0, stagger: { each: .1}}),
            scrub: 0,
        })
    },
    masterAni: function() {
        gsap.set('.word', { yPercent: 120})
        gsap.set('.ani-tx .line', { xPercent: idx => idx === 0 || idx === 3 ? -100 : 100 })
        gsap.set('.header .logo img', { scale: 5, yPercent: -500})
        gsap.set('.sc-visual__title-area .line', { xPercent: idx => idx % 2 === 0 ? -120 : 120})
        gsap.set('.sc-work__item', { xPercent: 100})

        Portfolio.visualAni();
        Portfolio.translateX();
        Portfolio.aboutAni();
        Portfolio.projectAni();
        Portfolio.workAni();
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

    }
}

$(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'none' })
    Portfolio.init();
});
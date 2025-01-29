Portfolio = {
    init: function () {
        this.splitText();
        this.updateDayTime();
        this.setGeoLocation();
        this.translateX();
        this.masterAni();
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
                animation: gsap.to($textTranslateX, { x: '0%'}),
                scrub: 0,
            })
        })
    },
    visualAni: function() {
        
    },
    aboutAni: function() {
        // about left 진입 시 애니메이션
        const enterTl = gsap.timeline({ paused: true })
        .to('.sc-about__left .word', {
            y: 0,
            stagger: {
                amount: .3
            }
        })
        // about left 영역 스크롤트리거
        ScrollTrigger.create({
            trigger: '.sc-about__left',
            start: '0% 0%',
            end: '100% 100%',
            onEnter: () => enterTl.play(),
            onLeaveBack: () => enterTl.reverse()
        })
        // about right 진입 시 애니메이션
        const enterTl2 = gsap.timeline({ paused: true })
        .to('.sc-about__right .word', {
            y: 0,
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
                const rightTop = $('.sc-about__right').offset().top;

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
            let $projectTags = $(card).find('.project-card__tag')
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
            paused: true,
        })

        ScrollTrigger.create({
            trigger: '.sc-project',
            start: '0% 100%',
            end: '100% 0%',
            animation: marqeeContainMotion,
            scrub: 0,
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

    },
    masterAni: function() {
        Portfolio.aboutAni();
        Portfolio.projectAni();
        Portfolio.workAni();
    }
}

$(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({
        ease: 'none'
    })
    Portfolio.init();
});
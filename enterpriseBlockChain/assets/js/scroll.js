gsap.defaults({ease: 'none'})

// gsap animation
// 1번째 섹션 애니메이션
const sc01Tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-01',
        start: 'top 0%',
        end: 'bottom 100%',
        scrub: 0,
        toggleClass: {
            targets: ".sc-01 .scroll-down",
            className: "show",
        }
    }
})
.to(".sc-01", { '--opacity': 1 })
.from('.sc-01 .txt-box1', { opacity: 0}, '<')
.to('.sc-01 .txt-box1', { 
    opacity: 0,
    onStart: () => {
        $('#header').addClass('show')
    },
    onReverseComplete: () => {
        $('#header').removeClass('show')
    }
})
.from('.sc-01 .txt-box2', { opacity: 0})
.to('.sc-01 .txt-box2', { opacity: 0})
.from('.sc-01 .txt-box3', { opacity: 0})
.to('.sc-01 .txt-box3', { opacity: 0})
.from('.sc-01 .txt-box4', { opacity: 0})

// 2번째 섹션 애니메이션
const sc02Tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-02',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
    }
})
.to(".sc-02", { '--opacity': 1 })
.from('.sc-02 .txt-box .txt-move', { duration: 1, opacity: 0}, '<')
.to('.sc-02 .txt-box1 .txt-move', { xPercent: 100})
.to('.sc-02 .txt-box3 .txt-move', { xPercent: -100}, '<')
.to('.sc-02 .txt-box .txt-move', { opacity: 0})
.to(".sc-02", { '--opacity': 0 }, "<")
.to('.sc-02 .img-cover3', {height: 0})
.to('.sc-02 .img-cover2', {height: 0})
.from('.sc-02 .txt-area.fade-in .txt-move', { duration: 1, opacity: 0})
.to(".sc-02", { '--opacity': 1 }, "<")

// 3번째 섹션 애니메이션
ScrollTrigger.create({
    trigger: '.sc-03',
    start: `top top`,
    endTrigger: '.sc-06',
    end: 'top 50%',
    toggleClass: {
        targets: "#header",
        className: "theme-dark",
    }
})

// 6번째 섹션 애니메이션
// body theme 변경 애니메이션
ScrollTrigger.create({
    trigger: '.sc-06',
    start: `top 50%`,
    endTrigger: '.sc-10',
    end: 'top 50%',
    toggleClass: {
        targets:'body',
        className: 'dark'
    }
})

// 가로 스크롤 애니메이션
gsap.to('.sc-06 .move-horizon', {
    xPercent: -100,
    x: () => {
        return window.innerWidth;
    },
    scrollTrigger: {
        trigger: '.sc-06',
        start: 'top top',
        end: `bottom bottom`,
        scrub: 0,
        invalidateOnRefresh: true,
    }
})

// 8번째 섹션 애니메이션
const sc08Tl = gsap.timeline()
.from('.sc-08 .move-left', { duration:2, xPercent: -50})
.from('.sc-08 .move-right', { duration:2, xPercent: 50}, '<')
.from('.sc-08 .title', { 
    opacity: 0, 
    delay: 1,
    onStart: function() {
        $('.sc-08 .bg-area').addClass('blur');
    },
    onReverseComplete: function() {
        $('.sc-08 .bg-area').removeClass('blur');
    }
})

ScrollTrigger.create({
    trigger: '.sc-08',
    start: "0% 40%",
    end: "100% 30%",
    animation: sc08Tl,
    scrub: 0,
}) 

// 9번째 섹션 애니메이션
// 카드 애니메이션
function cardTl(target) {
    const cardWidth = gsap.getProperty(target, 'width');
    const tl = gsap.timeline();
    
    gsap.utils.toArray(target).forEach((card, idx) => {
        tl.to(card, { x: -(cardWidth * idx)}, '<')
    })
    
    return tl;
}

// 첫번째 가로 스크롤 애니메이션
const horizonTl01 = gsap.timeline()
.to('.sc-09 .horizon1 .move-horizon', { 
    x: () => {
        const sc09TxtWidth = gsap.getProperty('.sc-09 .horizon1 .txt-area', 'width')

        return -sc09TxtWidth;
    } ,
})
.add(cardTl('.sc-09 .horizon1 .move-horizon .card-item'))
.to('.unlock', { opacity: 0}, '<')
.to('.lock', { opacity: 1})
.to('.lock', { opacity: 0})

ScrollTrigger.create({
    trigger: '.sc-09 .horizon-wrap',
    start: '0% 0%',
    end: '100% 100%',
    animation: horizonTl01,
    scrub: 0,
    invalidateOnRefresh: true,
    onLeave: () => {
        gsap.set('.horizon1', { opacity: 0})
        gsap.set('.vertical1', { opacity: 1})
    },
    onEnterBack: () => {
        gsap.set('.horizon1', { opacity: 1})
        gsap.set('.vertical1', { opacity: 0})
    },
})

// 첫번째 세로 애니메이션
ScrollTrigger.create({
    trigger: '.sc-09 .vertical1 .border-gradient',
    start: '0% 0%',
    end: '100% 10%',
    scrub: 0,
    animation: gsap.from('.sc-09 .vertical1 .border-gradient .title', { opacity: 0})
})

// 두번째 가로 스크롤 애니메이션
const horizonTl02 = gsap.timeline()
.add(cardTl('.sc-09 .horizon2 .move-horizon .card-item'))

ScrollTrigger.create({
    trigger: '.sc-09 .horizon-wrap2',
    start: '0% 0%',
    end: '100% 100%',
    animation: horizonTl02,
    scrub: 0,
    invalidateOnRefresh: true,
    onEnter: () => {
        gsap.set('.vertical1', { opacity: 0})
        gsap.set('.sc-09 .horizon2 .border-gradient', { opacity: 1})
    },
    onLeaveBack: () => {
        gsap.set('.vertical1', { opacity: 1})
        gsap.set('.sc-09 .horizon2 .border-gradient', { opacity: 0})
    },
    onLeave: () => {
        gsap.set('.vertical2', { opacity: 1})
        gsap.set('.sc-09 .horizon2', { opacity: 0})
    },
    onEnterBack: () => {
        gsap.set('.vertical2', { opacity: 0})
        gsap.set('.sc-09 .horizon2', { opacity: 1})
    },
})

// 두번째 세로 애니메이션
const verticalTl02 = gsap.timeline()
.from('.sc-09 .vertical2 .service-left .bg-glow', { opacity: 0})
.from('.sc-09 .vertical2 .service-right .title', { opacity: 0}, '<')

ScrollTrigger.create({
    trigger: '.sc-09 .vertical-wrap2 .vertical2',
    start: '0% 0%',
    end: '100% 100%',
    animation: verticalTl02,
    scrub: 0,
})

// 10번째 섹션 애니메이션
ScrollTrigger.create({
    trigger: '.sc-10',
    start: '0% 50%',
    endTriger: '#footer',
    end: '100% 100%',
    onEnter: () => {
        $('#header').addClass('theme-dark');
    },
    onLeaveBack: () => {
        $('#header').removeClass('theme-dark');
    }
})

// 12번째 섹션 애니메이션
// 가로 스크롤 애니메이션
gsap.to('.sc-12 .move-horizon', {
    xPercent: -100,
    x: () => {
        return window.innerWidth;
    },
    scrollTrigger: {
        trigger: '.sc-12',
        start: '0% 0%',
        end: '100% 100%',
        scrub: 0,
        invalidateOnRefresh: true,
        toggleClass: {
            targets: '.down-area',
            className: 'show'
        },
        onUpdate: (self) => {
            if(self.progress.toFixed(2) > 0.5) {
                gsap.to('.down-area .txt1', { duration: .3, opacity: 0})
                gsap.to('.down-area .txt2', { duration: .3, opacity: 1})
            } else {
                gsap.to('.down-area .txt1', { duration: .3, opacity: 1})
                gsap.to('.down-area .txt2', { duration: .3, opacity: 0})
            }
        }
    }
})

// 13번째 섹션 애니메이션
const sc13Tl = gsap.timeline()
.from('.sc-13 .txt-area', { opacity: 0})
.to('.sc-13 .txt-area', { opacity: 0})

ScrollTrigger.create({
    trigger: '.sc-13',
    start: '0% 0%',
    end: '100% 100%',
    animation: sc13Tl,
    scrub: 0,
})

// 14번째 섹션 애니메이션
gsap.to('.sc-14 .move-horizon', {
    xPercent: -100,
    x: () => {
        return window.innerWidth;
    },
    scrollTrigger: {
        trigger: '.sc-14',
        start: '0% 0%',
        end: '100% 100%',
        scrub: 0,
        invalidateOnRefresh: true,
    }
})

// footer 영역 애니메이션
const joinWidth = gsap.getProperty('.join-item', 'width')
const sc15Tl = gsap.timeline()
.from('.join', { yPercent: 100})
.from('.marquee', {duration: 12, x: -(joinWidth * 3), repeat: -1}, '<')

ScrollTrigger.create({
    trigger: '#footer',
    start: 'bottom bottom',
    end: 'bottom bottom',
    animation: sc15Tl,
    toggleActions: 'restart none reverse none',
})

// 상단으로 이동하기 버튼 애니메이션
ScrollTrigger.create({
    trigger: '.sc-02',
    start: 'top top',
    end: 'bottom top',
    endTrigger: '#footer',
    onUpdate: (self) => {
        if (self.direction === 1) {
            // scroll down
            gsap.to('.btn-top', { opacity: 0})
        } else {
            // scroll up
            gsap.to('.btn-top', { opacity: 1})
        }

        $('#header .lang .depth2').removeClass('open');
    },
    onLeaveBack: () => {
        gsap.to('.btn-top', { opacity: 0})
    }
})

// 4번째, 11번째 섹션 애니메이션
gsap.utils.toArray('.sc-04, .sc-11').forEach((section, idx) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: '0 90%',
            end: 'bottom bottom',
            scrub: 1,
        }
    })
    .to(section, { '--progress': 1})
})
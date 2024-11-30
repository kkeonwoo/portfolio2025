gsap.defaults({ease: 'none'})

const sc01Tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-01',
        start: 'top 0%',
        end: 'bottom 100%',
        scrub: 0,
        toggleClass: {
            targets: ".sc-01 .sroll-down",
            className: "show"
        }
    }
})
.to(".sc-01", { '--opacity': 1 })
.from('.sc-01 .txt-box:nth-child(1)', { opacity: 0}, '<')
.to('.sc-01 .txt-box:nth-child(1)', { opacity: 0,
    onStart: function() {
        $('#header').addClass('show')
    },
    onReverseComplete: function() {
        $('#header').removeClass('show')
    }
})
.from('.sc-01 .txt-box:nth-child(2)', { opacity: 0})
.to('.sc-01 .txt-box:nth-child(2)', { opacity: 0})
.from('.sc-01 .txt-box:nth-child(3)', { opacity: 0})
.to('.sc-01 .txt-box:nth-child(3)', { opacity: 0})
.from('.sc-01 .txt-box:nth-child(4)', { opacity: 0})

const sc02Tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-02',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
    }
})
// .to((".sc-02 .img-area .img-cover:nth-child(1) .bg"), { duration: 1, opacity: 0.6})
.to(".sc-02", { '--opacity': 1 })
.from('.sc-02 .txt-box .txt-move', { duration: 1, opacity: 0}, '<')
.to('.sc-02 .txt-box:nth-child(1) .txt-move', { xPercent: 100})
.to('.sc-02 .txt-box:nth-child(3) .txt-move', { xPercent: -100}, '<')
.to('.sc-02 .txt-box .txt-move', { opacity: 0})
.to(".sc-02", { '--opacity': 0 }, "<")
.to('.sc-02 .img-cover:nth-child(3)', {height: 0})
.to('.sc-02 .img-cover:nth-child(2)', {height: 0})
// .to((".sc-02 .img-area .img-cover:nth-child(3) .bg"), { duration: 1, opacity: 0.6})
.from('.sc-02 .txt-area.fade-in .txt-move', { duration: 1, opacity: 0})
.to(".sc-02", { '--opacity': 1 }, "<")

const header = $('#header');
ScrollTrigger.create({
    trigger: '.sc-03',
    start: `top ${header.outerHeight() / 2}`,
    endTrigger: '.sc-06',
    markers: true,
    end: 'top 50%',
    onToggle: ({ isActive, animation }) => {
        isActive ? header.addClass('theme-white') : header.removeClass('theme-white')
    }
})

function crossTxtAni (target) {
    // let txt01With = gsap.getProperty(`${target} .txt-box:nth-child(1) .title`, 'width');
    // let txt02With = gsap.getProperty(`${target} .txt-box:nth-child(2) .title`, 'width');
    // let txt03With = gsap.getProperty(`${target} .txt-box:nth-child(3) .title`, 'width');
    // let txt01X = (txt01With + txt02With) / 2;
    // let txt03X = (txt03With + txt02With) / 2;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: target,
            start: '0 90%',
            end: 'bottom bottom',
            scrub: 1,
        }
    })
    .to(`${target}`, { '--progress': 1})
    
    // .from(`${target} .bg1`, { x: innerWidth })
    // .from(`${target} .bg2`, { x: -innerWidth }, '<')
    // .to(`${target} .txt-box:nth-child(1) .txt-move`, { x: -`${txt01X}`}, '<')
    // .to(`${target} .txt-box:nth-child(3) .txt-move`, { x: `${txt03X}`}, '<')
}
crossTxtAni('.sc-04')

// ScrollTrigger.create({
//     trigger: '.sc-05',
//     start: 'top top',
//     end: 'bottom top',
//     pin: '.sc-05 .txt-box',
// })

ScrollTrigger.create({
    trigger: '.sc-06',
    start: `top 50%`,
    endTrigger: '.sc-10',
    markers: true,
    end: 'top 50%',
    toggleClass: {
        targets:'body',
        className: 'dark'
    }
})

let horizonWidth = gsap.getProperty(`.sc-06 .move-horizon`, 'width');
let moveX = $('.sc-06 .last').offset().left;

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

const sc08Tl = gsap.timeline()
.from('.sc-08 .move-left', { duration:2, xPercent: -50})
.from('.sc-08 .move-right', { duration:2, xPercent: 50}, '<')
.from('.sc-08 .title', { opacity: 0, 
    delay: 1,
    onStart: function() {

    },
    onReverseComplete: function() {

    }
})
// .from('.sc-08 .filter', { opacity: 0},'<')

ScrollTrigger.create({
    trigger: '.sc-08',
    start: '0% bottom',
    end: '100% bottom',
    animation: sc08Tl,
    scrub: 0,
}) 

const sc09HorizonWidth = gsap.getProperty('.sc-09 .horizon1 .move-horizon', 'width')
const sc09HorizonHeight = gsap.getProperty('.sc-09 .horizon1 .move-horizon', 'height')
const sc09TxtWidth = gsap.getProperty('.sc-09 .horizon1 .move-horizon > .txt-area', 'width')
const cardListWidth = gsap.getProperty('.sc-09 .horizon1 .move-horizon .card-list', 'width')
const cardWidth = gsap.getProperty('.sc-09 .horizon1 .move-horizon .card-item', 'width')

// const sc09ContainerAni = gsap.timeline()
// .to('.sc-09 .horizon1 .move-horizon', { x: -(sc09TxtWidth)})
// .add(cardTl('.sc-09 .horizon1 .move-horizon .card-item'))
// .to('.unlock', { opacity: 0}, '<')
// .from('.lock', { opacity: 0})
// .to('.lock', { opacity: 0})
// .set('.sc-09 .horizon1', { opacity: 0})

function cardTl(target) {
    const tl = gsap.timeline()
    gsap.utils.toArray(target).forEach((card, idx) => {
        tl.to(card, { x: -(cardWidth * idx)}, '<')
    })
    return tl;
}

ScrollTrigger.create({
    trigger: '.sc-09 .horizon1',
    start: 'top top',
    // end: `+=${sc09HorizonWidth + sc09HorizonWidth}`,
    end: '100% 100%',
    // animation: sc09ContainerAni,
    scrub: true,
    // pin:true,
})

// ScrollTrigger.create({
//     trigger: '.sc-09 .vertical1',
//     start: `top top`,
//     end: `top bottom`,
//     endTrigger: '.sc-10',
//     pin: '.sc-09 .service-left',
//     scrub: true,
//     id: 'vertical',
//     onEnter: () => {
//         gsap.set('.sc-09 .service-left', {opacity: 1})
//     },
//     onLeaveBack: () => {
//         gsap.set('.sc-09 .service-left', {opacity: 0})
//     },
//     onLeave: () => {
//         gsap.set('.sc-09 .vertical1', {opacity: 0})
//     },
//     onEnterBack: () => {
//         gsap.set('.sc-09 .vertical1', {opacity: 1})
//     }
// })

gsap.from('.sc-09 .vertical1 .border-gradient .title', {
    opacity: 0,
    scrollTrigger: ({
        trigger: '.sc-09 .vertical1 .move-vertical',
        start: 'top top',
        end: '+=1000',
        scrub: true,
    })
})

const sc09Horizon2Width = gsap.getProperty('.sc-09 .horizon2 .move-horizon', 'width')
const cardListWidth2 = gsap.getProperty('.sc-09 .horizon2 .move-horizon .card-list', 'width')

const sc09HorizonAni2 = gsap.timeline()
.set('.sc-09 .horizon2 .card.border-gradient', { opacity: 1})
.add(cardTl('.sc-09 .horizon2 .move-horizon .card-item'))

// ScrollTrigger.create({
//     trigger: '.sc-09 .horizon2',
//     start: 'top top',
//     end: `+=${sc09Horizon2Width}`,
//     animation: sc09HorizonAni2,
//     scrub: true,
//     pin:true,
//     id: 'horizontal2',
//     onEnter: () => {
//         gsap.set('.sc-09 .vertical1 .service-left', {opacity: 0})
//         gsap.set('.sc-09 .horizon2 .card-item:first-child', {opacity: 1})
//     },
//     onLeaveBack: () => {
//         gsap.set('.sc-09 .vertical1 .service-left', {opacity: 1})
//         gsap.set('.sc-09 .horizon2 .card-item:first-child', {opacity: 0})
//     },
//     onLeave: () => {
//         gsap.set('.sc-09 .horizon2', {opacity: 0})
//         gsap.set('.sc-09 .vertical2', {opacity: 1})
//     },
//     onEnterBack: () => {
//         gsap.set('.sc-09 .horizon2', {opacity: 1})
//         gsap.set('.sc-09 .vertical2', {opacity: 0})
//     }
// })

const sc09Vertical02 = gsap.timeline()
.from('.sc-09 .vertical2 .service-left .bg-glow', { opacity: 0})
.from('.sc-09 .vertical2 .service-right .title', { opacity: 0}, '<')

ScrollTrigger.create({
    trigger: '.sc-09 .vertical2',
    start: `top top`,
    end: `+=1000`,
    pin: true,
    animation: sc09Vertical02,
    scrub: true,
    id: 'vertical2',
})

ScrollTrigger.create({
    trigger: '.sc-10',
    start: '-=50% top',
    // end: 'bottom bottom',
    id: 'sc10',
    scrub: true,
    onEnter: () => {
        $('#header').addClass('theme-white')
        gsap.to('.sc-09, .sc-10', { color: '#000', backgroundColor: '#fff'})
    },
    onLeaveBack: () => {
        $('#header').removeClass('theme-white')
        gsap.to('.sc-09, .sc-10', { color: '#fff', backgroundColor: '#000'})
    }
})

crossTxtAni('.sc-11');

let horizonWidth2 = gsap.getProperty(`.sc-12 .move-horizon`, 'width')
let lastWidth2 = gsap.getProperty('.sc-12 .last', 'width')
let moveX2 = $('.sc-12 .last').offset().left - (innerWidth - lastWidth2);

ScrollTrigger.create({
    trigger: '.sc-12',
    // start: 'top top',
    // end: `bottom`,
    animation: gsap.to(`.sc-12 .move-horizon`, { x: -moveX2}),
    scrub: true,
    // pin:true,
    // onEnter: () => {
    //     gsap.to(`.down-area`, { autoAlpha: 1})
    // },
    // onLeave: () => {
    //     gsap.to(`.down-area`, { autoAlpha: 0})
    // },
    // onLeaveBack: () => {
    //     gsap.to(`.down-area`, { autoAlpha: 0})
    // },
    // onEnterBack: () => {
    //     gsap.to(`.down-area`, { autoAlpha: 1})
    // },
    onUpdate: (self) => {
        if(self.progress.toFixed(2) > 0.5) {
            gsap.to('.down-area .txt1', { opacity: 0})
            gsap.to('.down-area .txt2', { delay: 0.5, opacity: 1})
        } else {
            gsap.to('.down-area .txt1', { delay: 0.5, opacity: 1})
            gsap.to('.down-area .txt2', { opacity: 0})
        }
    }
})

const sc13Tl = gsap.timeline()
.from('.sc-13 .txt-area', { opacity: 0})
.to('.sc-13 .txt-area', { opacity: 0})

ScrollTrigger.create({
    trigger: '.sc-13',
    start: 'top top',
    end: 'bottom top',
    animation: sc13Tl,
    pin: true,
    scrub: true,
})

let horizonWidth3 = gsap.getProperty(`.sc-14 .move-horizon`, 'width')
let lastWidth3 = gsap.getProperty('.sc-14 .last', 'width')
let moveX3 = $('.sc-14 .last').offset().left - (innerWidth - lastWidth3);

ScrollTrigger.create({
    trigger: '.sc-14',
    start: 'top top',
    end: `bottom`,
    animation: gsap.to(`.sc-14 .move-horizon`, { x: -moveX3}),
    scrub: true,
    pin:true,
    id: 'sc14',
})

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

markers()
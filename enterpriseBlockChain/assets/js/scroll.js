// const text = document.querySelectorAll('.txt-box');
// const exceptTxt = `.sc-01 .txt-box:not(:last-child)`
// const video = document.querySelector('#mainVideo');

// const textTl = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.sc-01',
//         start: 'top top',
//         end: 'bottom top',
//         pin: true,
//         // pinSpacing: false,
//         scrub: 1,
//     }
// })
// .to(CSSRulePlugin.getRule(".sc-01::before"), { duration: 1, cssRule: { opacity: 0.6 } })
// text.forEach((txt, idx) => {
//     textTl.from(txt, { 
//         opacity: 0,
//         onComplete: () => idx === 0 && $('#header').addClass('on'),
//     })
//     .to(exceptTxt, { 
//         opacity: 0,
//     })
// })

// function section2Animation() {

//     gsap.utils.toArray('.sc-02 .txt-box').forEach((txt, idx) => {
//         const target = txt.querySelector('.txt-move');
    
//         ScrollTrigger.create({
//             trigger: txt,
//             start: 'top center',
//             end: 'bottom center',
//             animation: gsap.fromTo(target, { x: idx % 2 ? innerWidth : -innerWidth}, { x: 0}),
//             scrub: true,
//         })
//     });

//     const tl = gsap.timeline()
//     .to(CSSRulePlugin.getRule(".sc-02 .img-cover:nth-child(1)::before"), { cssRule: { opacity: 0.6 } })
//     .to(CSSRulePlugin.getRule(".sc-02 .img-cover:nth-child(1)::before"), { cssRule: { opacity: 0 } })

//     ScrollTrigger.create({
//         trigger: '.sc-02',
//         start: 'top top',
//         end: '+=300% top',
//         animation: tl,
//         pin: true,
//         pinSpacing: false,
//         markers: true,
//         scrub: true,
//     })

// }
// section2Animation()
gsap.defaults({ease: 'none'})

const sc01Tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-01',
        start: 'top top',
        end: 'bottom top',
        // markers: true,
        pin: true,
        scrub: 1,
        onToggle: ({isActive}) => {
            gsap.to('.sc-01 .scroll-down', { opacity: isActive ? 1 : 0})
        }
    }
})
.to(CSSRulePlugin.getRule(".sc-01::before"), { duration: 1, cssRule: { opacity: 0.6 } })
.from('.sc-01 .txt-box:nth-child(1)', { opacity: 0}, '<')
.from('#header', { yPercent: -100})
.to('.sc-01 .txt-box:nth-child(1)', { opacity: 0}, '<')
.from('.sc-01 .txt-box:nth-child(2)', { opacity: 0})
.to('.sc-01 .txt-box:nth-child(2)', { opacity: 0})
.from('.sc-01 .txt-box:nth-child(3)', { opacity: 0})
.to('.sc-01 .txt-box:nth-child(3)', { opacity: 0})
.from('.sc-01 .txt-box:nth-child(4)', { opacity: 0})

const sc02Tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-02',
        start: 'top top',
        end: '+=4000 top',
        // markers: true,
        pin: true,
        scrub: 1,
    }
})
.to((".sc-02 .img-area .img-cover:nth-child(1) .bg"), { duration: 1, opacity: 0.6})
.from('.sc-02 .txt-box .txt-move', { duration: 1, opacity: 0})
.fromTo('.sc-02 .txt-box:nth-child(1) .txt-move', { x: 0}, { x: 200})
.fromTo('.sc-02 .txt-box:nth-child(3) .txt-move', { x: 0}, { x: -200}, '<')
.to('.sc-02 .txt-box .txt-move', { opacity: 0})
.to('.sc-02 .img-cover:nth-child(2)', { yPercent:-100})
.to('.sc-02 .img-cover:nth-child(3)', { yPercent:-200})
.to((".sc-02 .img-area .img-cover:nth-child(3) .bg"), { duration: 1, opacity: 0.6})
// .set('.sc-02 .txt-area.fade-in', { zIndex: 20})
// .to(CSSRulePlugin.getRule(".sc-02 .img-area .img-cover:nth-of-type(3)::before"), { cssRule: { opacity: 0.6, immediateRender: false, } })
.from('.sc-02 .txt-area.fade-in .txt-move', { duration: 1, opacity: 0}, '<')

const header = $('#header');
ScrollTrigger.create({
    trigger: '.sc-03',
    start: `top ${header.outerHeight() / 2}`,
    end: 'bottom top',
    endTrigger: '.sc-05',
    // markers:true,
    onToggle: ({ isActive, animation }) => {
        isActive ? header.addClass('theme-white') : header.removeClass('theme-white')
    }
})

function crossTxtAni (target) {
    let txt01With = gsap.getProperty(`${target} .txt-box:nth-child(1) .title`, 'width');
    let txt02With = gsap.getProperty(`${target} .txt-box:nth-child(2) .title`, 'width');
    let txt03With = gsap.getProperty(`${target} .txt-box:nth-child(3) .title`, 'width');
    let txt01X = (txt01With + txt02With) / 2;
    let txt03X = (txt03With + txt02With) / 2;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: target,
            start: '-50% bottom',
            end: 'bottom bottom',
            scrub: 1,
            // markers: true,
        }
    })
    .from(`${target} .bg1`, { x: innerWidth })
    .from(`${target} .bg2`, { x: -innerWidth }, '<')
    .to(`${target} .txt-box:nth-child(1) .txt-move`, { x: -`${txt01X}`}, '<')
    .to(`${target} .txt-box:nth-child(3) .txt-move`, { x: `${txt03X}`}, '<')
}
crossTxtAni('.sc-04')

ScrollTrigger.create({
    trigger: '.sc-05',
    start: 'top top',
    // end: () => `+=${$('.sc-06').offset().top - $('.sc-05').offset().top}`,
    end: 'bottom top',
    // endTrigger: '.sc-06',
    pin: '.sc-05 .txt-box',
    // markers: true,
})

ScrollTrigger.create({
    trigger: '.sc-06',
    start: '-=50% center',
    // markers: true,
    scrub: true,
    onEnter: () => {
        gsap.to('.sc-05, .sc-06', { color: '#fff', backgroundColor: '#000'})
        $('#header').removeClass('theme-white')
    },
    // onEnterBack: () => {
    //     gsap.to('.section', { color: '#fff', backgroundColor: '#000'})
    // },
    // onLeave: () => {
    //     gsap.to('.section', { color: '#000', backgroundColor: '#fff'})
    // },
    onLeaveBack: () => {
        gsap.to('.sc-05, .sc-06', { color: '#000', backgroundColor: '#fff'})
        $('#header').addClass('theme-white')
    }
})

let horizonWidth = gsap.getProperty(`.sc-06 .move-horizon`, 'width')
let moveX = horizonWidth - innerWidth;

ScrollTrigger.create({
    trigger: '.sc-06',
    start: 'top top',
    end: `+=${horizonWidth}`,
    animation: gsap.to(`.sc-06 .move-horizon`, { x: -moveX}),
    scrub: true,
    pin:true,
})

// gsap.to('.sc-06 .move-horizon', { 
//     x: -(horizonWidth - window.innerWidth),
//     scrollTrigger: {
//         trigger: '.sc-06',
//         start: 'top top',
//         end: `+=${horizonWidth}`,
//         markers: true,
//         scrub: true,
//         pin:true,
//         // horizontal: true,
//     }
// })

const sc08Tl = gsap.timeline()
.from('.sc-08 .move-left', { duration:2, xPercent: -50})
.from('.sc-08 .move-right', { duration:2, xPercent: 50}, '<')
.from('.sc-08 .title', { opacity: 0}, '+=0.3')
.from('.sc-08 .filter', { opacity: 0},'<')

ScrollTrigger.create({
    trigger: '.sc-08',
    start: '-=60% bottom',
    end: 'center bottom',
    endTrigger: '.sc-09 .horizon',
    animation: sc08Tl,
    // markers: true,
    id: 'sc08',
    scrub: true,
}) 

const sc09HorizonWidth = gsap.getProperty('.sc-09 .horizon1 .move-horizon', 'width')
const sc09HorizonHeight = gsap.getProperty('.sc-09 .horizon1 .move-horizon', 'height')
const sc09TxtWidth = gsap.getProperty('.sc-09 .horizon1 .move-horizon > .txt-area', 'width')
const cardListWidth = gsap.getProperty('.sc-09 .horizon1 .move-horizon .card-list', 'width')
const cardWidth = gsap.getProperty('.sc-09 .horizon1 .move-horizon .card-item', 'width')

const sc09ContainerAni = gsap.timeline()
.to('.sc-09 .horizon1 .move-horizon', { x: -(sc09TxtWidth)})
.add(cardTl('.sc-09 .horizon1 .move-horizon .card-item'))
.to('.unlock', { opacity: 0}, '<')
.from('.lock', { opacity: 0})
.to('.lock', { opacity: 0})
.set('.sc-09 .horizon1', { opacity: 0})

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
    end: `+=${sc09HorizonWidth + sc09HorizonWidth}`,
    animation: sc09ContainerAni,
    // markers: true,
    scrub: true,
    pin:true,
    // onLeave: () => {
    //     gsap.set('.horizon1', { opacity: 0})
    //     gsap.set('.sc-09 .service-left', {opacity: 1})
    // } ,
    // onEnterBack: () => {
    //     gsap.set('.horizon1', { opacity: 1})
    //     gsap.set('.sc-09 .service-left', {opacity: 0})
    // } ,
})

ScrollTrigger.create({
    trigger: '.sc-09 .vertical1',
    start: `top top`,
    end: `top bottom`,
    endTrigger: '.sc-10',
    pin: '.sc-09 .service-left',
    // animation: gsap.from('.sc-09 .service-left .title', { opacity: 0}),
    // onLeave: () => gsap.set('.sc-09 .service-left', {opacity: 0}),
    // onEnterBack: () => gsap.set('.sc-09 .service-left', {opacity: 1}),
    // markers: true,
    scrub: true,
    id: 'vertical',
    onEnter: () => {
        gsap.set('.sc-09 .service-left', {opacity: 1})
    },
    onLeaveBack: () => {
        gsap.set('.sc-09 .service-left', {opacity: 0})
    },
    onLeave: () => {
        gsap.set('.sc-09 .vertical1', {opacity: 0})
    },
    onEnterBack: () => {
        gsap.set('.sc-09 .vertical1', {opacity: 1})
    }
})

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

ScrollTrigger.create({
    trigger: '.sc-09 .horizon2',
    start: 'top top',
    // start: `+=${sc09HorizonWidth}`,
    end: `+=${sc09Horizon2Width}`,
    animation: sc09HorizonAni2,
    scrub: true,
    pin:true,
    id: 'horizontal2',
    // markers: true,
    onEnter: () => {
        gsap.set('.sc-09 .vertical1 .service-left', {opacity: 0})
        gsap.set('.sc-09 .horizon2 .card-item:first-child', {opacity: 1})
    },
    onLeaveBack: () => {
        gsap.set('.sc-09 .vertical1 .service-left', {opacity: 1})
        gsap.set('.sc-09 .horizon2 .card-item:first-child', {opacity: 0})
    },
    onLeave: () => {
        gsap.set('.sc-09 .horizon2', {opacity: 0})
        gsap.set('.sc-09 .vertical2', {opacity: 1})
    },
    onEnterBack: () => {
        gsap.set('.sc-09 .horizon2', {opacity: 1})
        gsap.set('.sc-09 .vertical2', {opacity: 0})
    }
})

const sc09Vertical02 = gsap.timeline()
.from('.sc-09 .vertical2 .service-left .bg-glow', { opacity: 0})
.from('.sc-09 .vertical2 .service-right .title', { opacity: 0}, '<')

ScrollTrigger.create({
    trigger: '.sc-09 .vertical2',
    start: `top top`,
    end: `+=1000`,
    // endTrigger: '.sc-10',
    pin: true,
    // animation: gsap.from('.sc-09 .service-left .title', { opacity: 0}),
    animation: sc09Vertical02,
    // markers: true,
    scrub: true,
    id: 'vertical2',
})

ScrollTrigger.create({
    trigger: '.sc-10',
    start: '-=50% top',
    // end: 'bottom bottom',
    // markers: true,
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
let moveX2 = horizonWidth - innerWidth;


ScrollTrigger.create({
    trigger: '.sc-12',
    start: 'top top',
    end: `+=${horizonWidth2}`,
    animation: gsap.to(`.sc-12 .move-horizon`, { x: -moveX2}),
    scrub: true,
    pin:true,
    markers:true,
    onEnter: () => {
        gsap.to(`.down-area`, { autoAlpha: 1})
    },
    onLeave: () => {
        gsap.to(`.down-area`, { autoAlpha: 0})
    },
    onLeaveBack: () => {
        gsap.to(`.down-area`, { autoAlpha: 0})
    },
    onEnterBack: () => {
        gsap.to(`.down-area`, { autoAlpha: 1})
    },
    onUpdate: (self) => {
        if(self.progress.toFixed(2) > 0.5) {
            gsap.to('.down-area .txt1', { opacity: 0})
            gsap.to('.down-area .txt2', { opacity: 1})
        } else {
            gsap.to('.down-area .txt1', { opacity: 1})
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
    // pin: true,
    // markers: true,
    scrub: true,
})

let horizonWidth3 = gsap.getProperty(`.sc-14 .move-horizon`, 'width')
let moveX3 = horizonWidth - innerWidth;

ScrollTrigger.create({
    trigger: '.sc-14',
    start: 'top top',
    end: `+=${horizonWidth3}`,
    animation: gsap.to(`.sc-14 .move-horizon`, { x: -moveX3}),
    scrub: true,
    pin:true,
    markers:true,
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
    // markers: true,
    // id: '15'
})

ScrollTrigger.create({
    trigger: '.sc-02',
    start: 'top top',
    end: 'bottom top',
    endTrigger: '#footer',
    // markers: true,
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
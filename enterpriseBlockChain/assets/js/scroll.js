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

let txt01With = gsap.getProperty('.sc-04 .txt-box:nth-child(1) .title', 'width');
let txt02With = gsap.getProperty('.sc-04 .txt-box:nth-child(2) .title', 'width');
let txt03With = gsap.getProperty('.sc-04 .txt-box:nth-child(3) .title', 'width');
let txt01X = (txt01With + txt02With) / 2;
let txt03X = (txt03With + txt02With) / 2;

const sc04Tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-04',
        start: '-50% bottom',
        end: 'bottom bottom',
        // markers: true,
        // pin: true,
        scrub: 1,
    }
})
.from(CSSRulePlugin.getRule(".sc-04::before"), { cssRule: { x: innerWidth } })
.to('.sc-04 .txt-box:nth-child(1) .txt-move', { x: -`${txt01X}`}, '-=0.5')
.to('.sc-04 .txt-box:nth-child(3) .txt-move', { x: `${txt03X}`}, '-=0.5')
.from(CSSRulePlugin.getRule(".sc-04::after"), { cssRule: { x: -innerWidth } }, '-=0.5')

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

const horizonWidth = gsap.getProperty('.sc-06 .move-horizon', 'width')

ScrollTrigger.create({
    trigger: '.sc-06',
    start: 'top top',
    end: `+=${horizonWidth}`,
    animation: gsap.to('.sc-06 .move-horizon', { x: -(horizonWidth - window.innerWidth)}),
    markers: true,
    scrub: true,
    pin:true,
    // horizontal: true,
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
    endTrigger: '.sc-09',
    animation: sc08Tl,
    // markers: true,
    scrub: true,
}) 

const sc09HorizonWidth = gsap.getProperty('.sc-09 .move-horizon', 'width')
const sc09TxtWidth = gsap.getProperty('.sc-09 .move-horizon > .txt-area', 'width')
const cardListWidth = gsap.getProperty('.sc-09 .move-horizon .card-list', 'width')
const cardWidth = gsap.getProperty('.sc-09 .move-horizon .card-item', 'width')

const sc09ContainerAni = gsap.timeline()
.to('.sc-09 .move-horizon', { x: -(sc09TxtWidth)})
// const sc09innnerAni = gsap.timeline()
.add(cardTl())
.to('.unlock', { opacity: 0}, '<')
.from('.lock', { opacity: 0})
.to('.lock', { opacity: 0})
.to('.horizon', { opacity: 0})
.from('.vertical', { opacity: 0}, '<')

function cardTl() {
    const tl = gsap.timeline()
    gsap.utils.toArray('.sc-09 .move-horizon .card-item').forEach((card, idx) => {
        tl.to(card, { x: -(cardWidth * idx)}, '<')
    })
    return tl;
}

ScrollTrigger.create({
    trigger: '.sc-09',
    start: 'top top',
    end: `+=${sc09HorizonWidth}`,
    // end: `+=3000`,
    animation: sc09ContainerAni,
    markers: true,
    scrub: true,
    pin:true,
})

// const sc09VerticalAni = gsap.timeline()

ScrollTrigger.create({
    trigger: '.sc-09 .vertical',
    start: `+=${sc09HorizonWidth}`,
    end: `bottom top`,
    // animation: sc09VerticalAni,
    // pin: true,
    pin: '.service-left',
    // markers: true,
    scrub: true,
    // id: 'vertical'
})

// ScrollTrigger.create({
//     trigger: '.sc-10',
//     start: 'top top',
//     markers: true,
//     scrub: true,
//     onEnter: () => {
//         $('#header').addClass('theme-white')
//         // gsap.to('.section', { color: '#000', backgroundColor: '#fff'})
//     },
//     onLeaveBack: () => {
//         $('#header').removeClass('theme-white')
//         // gsap.to('.section', { color: '#fff', backgroundColor: '#000'})
//     }
// })

markers()
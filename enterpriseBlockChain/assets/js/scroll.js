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

const sc01Tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-01',
        start: 'top top',
        end: 'bottom top',
        markers: true,
        pin: true,
        scrub: 1,
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
        end: '+=3000 top',
        markers: true,
        pin: true,
        scrub: 1,
    }
})
.fromTo(CSSRulePlugin.getRule(".sc-02 .img-area .img-cover:nth-child(1)::before"), { cssRule: { opacity: 0 } },{ cssRule: { opacity: 0.6 } })
.fromTo('.sc-02 .txt-box:nth-child(1) .txt-move', { x: -innerWidth}, { x: 0})
.fromTo('.sc-02 .txt-box:nth-child(2) .txt-move', { x: innerWidth}, { x: 0})
.fromTo('.sc-02 .txt-box:nth-child(3) .txt-move', { x: -innerWidth}, { x: 0})
.to('.sc-02 .img-cover:nth-child(1)', { height: 0})
.to('.sc-02 .img-cover:nth-child(2)', { height: 0})
.set('.sc-02 .txt-area.fade-in', { zIndex: 20})
.fromTo(CSSRulePlugin.getRule(".sc-02 .img-area .img-cover:nth-child(1)::before"), { cssRule: { opacity: 0 } },{ cssRule: { opacity: 0.6 } })
.from('.sc-02 .txt-area.fade-in .txt-move', { opacity: 0}, '<')

gsap.utils.toArray('.section').forEach((section, idx) => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        pin: false,
        pinSpacing: false,
        markers: true,
        scrub: true,
    })
})
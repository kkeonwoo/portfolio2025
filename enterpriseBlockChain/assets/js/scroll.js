const text = document.querySelectorAll('.txt-box');
const exceptTxt = `.sc-01 .txt-box:not(:last-child)`
const video = document.querySelector('#mainVideo');

const textTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-01',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        // pinSpacing: false,
        scrub: 1,
    }
})
.to(CSSRulePlugin.getRule(".sc-01::before"), { duration: 1, cssRule: { opacity: 0.6 } })
text.forEach((txt, idx) => {
    textTl.from(txt, { 
        opacity: 0,
        onComplete: () => idx === 0 && $('#header').addClass('on'),
    })
    .to(exceptTxt, { 
        opacity: 0,
    })
})

function section2Animation() {

    gsap.utils.toArray('.sc-02 .txt-box').forEach((txt, idx) => {
        const target = txt.querySelector('.txt-move');
    
        ScrollTrigger.create({
            trigger: txt,
            start: 'top center',
            end: 'bottom center',
            animation: gsap.fromTo(target, { x: idx % 2 ? innerWidth : -innerWidth}, { x: 0}),
            scrub: true,
        })
    });

    const tl = gsap.timeline()
    .to(CSSRulePlugin.getRule(".sc-02 .img-cover:nth-child(1)::before"), { cssRule: { opacity: 0.6 } })
    .to(CSSRulePlugin.getRule(".sc-02 .img-cover:nth-child(1)::before"), { cssRule: { opacity: 0 } })

    ScrollTrigger.create({
        trigger: '.sc-02',
        start: 'top top',
        end: '+=300% top',
        animation: tl,
        pin: true,
        pinSpacing: false,
        markers: true,
        scrub: true,
    })

}
section2Animation()
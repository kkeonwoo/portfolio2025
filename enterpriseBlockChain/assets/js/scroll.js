const text = document.querySelectorAll('.txt-box');
const video = document.querySelector('#mainVideo');

const textTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-01',
        start: 'top top',
        end: '+=3000 bottom',
        pin: true,
        pinSpacing: true,
        scrub: 1,
    }
})
.to(CSSRulePlugin.getRule(".sc-01::before"), { duration: 1, cssRule: { opacity: 0.5 } })
text.forEach((txt, idx) => {
    textTl.from(txt, { 
        opacity: 0,
        onComplete: () => idx === 0 && $('#header').addClass('on'),
    })
    .to(txt, { 
        opacity: 0,
    })
})
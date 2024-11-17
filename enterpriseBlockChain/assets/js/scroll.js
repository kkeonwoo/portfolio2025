const text = document.querySelectorAll('.txt-box');
const textTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-01',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: true,
        scrub: true,
    }
})

text.forEach((txt, idx) => {
    textTl.from(txt, { autoAlpha: 0, y: 100 })
})
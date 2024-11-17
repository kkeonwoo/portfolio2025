const text = document.querySelectorAll('.txt-box');
const textTl = gsap.timeline({
    scrollTrigger: {
        trigger: 'sc-01',
        start: 'top top',
        end: 'bottom top',
        pinSpacing: true,
        scrub: true,
        pin: true,
    }
})

text.forEach((txt, idx) => {
    textTl.from(txt, { autoAlpha: 0, y: 100 })
})
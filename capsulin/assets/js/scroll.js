gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ease: 'none'});

$(document).ready(() => {
    const text = new SplitType('.half .title, .half .txt-area .txt', { types: 'lines' })
    const lines = $('.half .title .line, .half .txt-area .txt .line');
    lines.each((idx, line) => {
        $(line).wrap('<div class="txt-wrap"></div>');
    })

    // full scroll
    gsap.from('.progress-bar', {
        height: 0,
        scrollTrigger: {
            trigger: '.main',
            start: 'top top',
            end: 'bottom bottom',
            // animation: ,
            // pin: false,
            // pinSpacing: false,
            markers: true,
            scrub: true,
        }
    })
})
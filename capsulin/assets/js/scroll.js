gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ease: 'none'});

$(document).ready(() => {
    const text = new SplitType('.half .title, .half .txt-area .txt', { types: 'lines' })
    const lines = $('.half .title .line, .half .txt-area .txt .line');
    lines.each((idx, line) => {
        $(line).wrap('<div class="txt-wrap"></div>');
    })
})
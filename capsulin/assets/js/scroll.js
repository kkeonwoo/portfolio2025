gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ease: 'none'});

$(document).ready(() => {
    const text = new SplitType('.half .title, .half .txt-area .txt', { types: 'lines' })
    const lines = $('.half .title .line, .half .txt-area .txt .line');
    lines.each((idx, line) => {
        $(line).wrap('<div class="txt-wrap"></div>');
    })

    gsap.set('.txt-wrap .txt, .txt-wrap .line', { yPercent: 100})

    // full scroll
    gsap.from('.progress-bar', {
        height: 0,
        scrollTrigger: {
            trigger: '.main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0,
            // markers: true,
        }
    })

    ScrollTrigger.create({
        trigger: '.sc-hero',
        start: '10% 10%',
        end: 'bottom bottom',
        animation: gsap.to('.sc-hero .sticky', {'--inset': 100}),
        // markers: true,
        scrub: 0,
        onLeave: () => Capsulin.fadeUp('.sc-design .sc-01 .txt', 0.1),
        onEnterBack: () => Capsulin.fadeOut('.sc-design .sc-01 .txt', -1, 0.1),
    })
    
    const designTl01 = gsap.timeline()
    .to('.sc-design .sc-01 .sticky', {'--inset': 100})
    .from('.sc-design .sc-02 .sticky', {'--top': 100, height: 0}, '<')
    .from('.sc-design .sc-02 .sc-left', {flex: 0}, '<')

    ScrollTrigger.create({
        trigger: '.sc-design .sc-01',
        start: '50% 50%',
        end: 'bottom 90%',
        animation: designTl01,
        markers: true,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-design .sc-01 .txt', 1, 0.1),
        onLeaveBack: () => Capsulin.fadeUp('.sc-design .sc-01 .txt', 0.1),
    })
    
    const designTl02 = gsap.timeline()
    .to('.sc-design .sc-02 .sc-left', { scale: 0})
    .to('.sc-design .sc-02 .sc-right', {'--left': -100, '--right': 100}, '<')
    
    ScrollTrigger.create({
        trigger: '.sc-design .sc-02',
        start: 'top top',
        end: 'bottom bottom',
        animation: designTl02,
        onEnter: () => {
            gsap.to('.sc-design .sc-02 .sc-right', { autoAlpha: 0})
        },
        // markers: true,
        scrub: 0,
    })

    ScrollTrigger.create({
        trigger: '.sc-design .sc-03',
        start: 'top top',
        end: 'bottom bottom',
        // animation: ,
        // markers: true,
        scrub: true,
    })

    // const designTl = gsap.timeline()
    // .to('.sc-hero .sticky', {'--inset': 100})

    // ScrollTrigger.create({
    //     trigger: '.sc-design .sc-01',
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     animation: designTl,
    //     markers: true,
    //     scrub: 0,
    // })
    // gsap.set('.sc-design .sc-01 .txt', { yPercent: 100})

    // const designTl01 = gsap.timeline()
    // ScrollTrigger.create({
    //     trigger: '.sc-design .sc-01 .absolute',
    //     start: 'top top',
    //     // end: 'top top',
    //     // animation: gsap.to('.sc-hero', {'--inset': 100}),
    //     // pin: true,
    //     // pinSpacing: false,
    //     markers: true,
    //     scrub: 0,
    //     onEnter: () => {
    //         gsap.fromTo('.sc-design .sc-01 .txt', { yPercent: 100}, { yPercent: 0, stagger: { each: 0.2}})
    //     },
    //     onLeave: () => {
    //         gsap.fromTo('.sc-design .sc-01 .txt', { yPercent: 0}, { yPercent: -100})
    //     },
    //     onLeaveBack: () => {
    //         gsap.fromTo('.sc-design .sc-01 .txt', { yPercent: 0}, { yPercent: 100})
    //     },
    //     onEnterBack: () => {
    //         gsap.fromTo('.sc-design .sc-01 .txt', { yPercent: 100}, { yPercent: 0, stagger: { each: 0.2}})
    //     }
    // })
})
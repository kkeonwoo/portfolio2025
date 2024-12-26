gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ease: 'none'});

$(document).ready(() => {
    const text = new SplitType('.half .title, .txt-area .txt', { types: 'lines' })
    const lines = $('.half .title .line, .txt-area .txt .line');
    lines.each((idx, line) => {
        $(line).wrap('<div class="txt-wrap"></div>');
    })
    gsap.set('.tab-list .line', { width: 0})
    gsap.set('.main .txt-wrap .txt, .main .txt-wrap .line, .main .txt-wrap .num, .main .txt-wrap .ico', { yPercent: 120})

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
    

    // 질문: 애니메이션 마지막에 배경과 이미지 사이 틈 발생
    const designTl01 = gsap.timeline()
    .to('.sc-design .sc-01 .sticky', {'--inset': 100})
    .from('.sc-design .sc-02 .sc-left', { clipPath: 'inset(0% 100% 0% 0%)'}, '<')
    .from('.sc-design .sc-02 .sc-left img', { xPercent: -50, yPercent: 50, scale: 0.8}, '<')

    ScrollTrigger.create({
        trigger: '.sc-design .sc-01',
        start: '50% 50%',
        end: 'bottom 90%',
        animation: designTl01,
        // markers: true,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-design .sc-01 .txt', 1, 0.1),
        onLeaveBack: () => Capsulin.fadeUp('.sc-design .sc-01 .txt', 0.1),
        onLeave: () => Capsulin.fadeUp('.sc-design .sc-02 .line', 0.2),
        onEnterBack: () => Capsulin.fadeOut('.sc-design .sc-02 .line', -1, 0.2),
    })
    
    const designTl02 = gsap.timeline()
    .to('.sc-design .sc-02 .sc-left .img-box', { clipPath: "inset(50% 50% 50% 50%)", scale: 0.8})
    .from('.sc-design .sc-03 .sc-left .img-box', { clipPath: 'inset(50% 50% 50% 50%)'}, '<')
    .from('.sc-design .sc-03 .sc-right', { clipPath: 'inset(0% 50% 0% 50%)'}, '<')
    .to('.sc-design .sc-03 .sc-left .img-box', { clipPath: 'inset(50% 50% 50% 50%)'})
    .to('.sc-design .sc-03 .sc-right', { clipPath: 'inset(50% 0% 50% 0%)'}, '<')
    .from('.sc-design .sc-04 .sc-left', { clipPath: 'inset(50% 50% 50% 50%)'}, '<')
    
    ScrollTrigger.create({
        trigger: '.sc-design .sc-02',
        start: 'top top',
        end: 'bottom bottom',
        animation: designTl02,
        // markers: true,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-design .sc-02 .line', 1, 0.1),
        onLeaveBack: () => Capsulin.fadeUp('.sc-design .sc-02 .line', 0.1),
        onLeave: () => {
            Capsulin.fadeUp('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 0.1)
            gsap.to('.sc-design .sc-04 .tab-item .line', { width: '100%', stagger: { each: 0.2}})
        },
        onEnterBack: () => {
            Capsulin.fadeOut('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 1, 0.1)
            gsap.to('.sc-design .sc-04 .tab-item .line', { width: 0, stagger: { each: 0.2}})
        },
    })

    const designTl03 = gsap.timeline()
    .to('.sc-design .sc-04 .sticky', {'--inset': 100})
    
    ScrollTrigger.create({
        trigger: '.sc-design .sc-03',
        start: 'top top',
        end: 'bottom bottom',
        animation: designTl03,
        markers: true,
        scrub: 0,
        onEnter: () => {
            Capsulin.fadeOut('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', -1, 0.1)
            gsap.to('.sc-design .sc-04 .tab-item .line', { width: 0, stagger: { each: 0.2}})
        },
        onLeaveBack: () => {
            Capsulin.fadeUp('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 0.1)
            gsap.to('.sc-design .sc-04 .tab-item .line', { width: '100%', stagger: { each: 0.2}})
        },
        onLeave: () => Capsulin.fadeUp('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 0.2),
        onEnterBack: () => Capsulin.fadeOut('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 1, 0.2),
    })

    ScrollTrigger.create({
        trigger: '.sc-engine .sc-01',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        scrub: 0,
    })
})
gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ease: 'none'});

$(document).ready(() => {
    const text = new SplitType('.half .title, .txt-area .txt', { types: 'lines' })
    const text2 = new SplitType('.title-box .line', { types: 'chars' })
    const lines = $('.half .title .line, .txt-area .txt .line');
    lines.each((idx, line) => {
        $(line).wrap('<div class="txt-wrap"></div>');
    })
    gsap.set('.tab-list .line', { width: 0})
    gsap.set('.main .txt-wrap .txt, .main .txt-wrap .line, .main .txt-wrap .num, .main .txt-wrap .ico, .title .img, .title-box .char', { yPercent: 120})
    gsap.set('.title-box .line', { yPercent: 0})

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

    const heroTl = gsap.timeline()
    .to('.sc-hero .sticky', {'--inset': 100})
    .to('.sc-hero .bg', {yPercent: -40}, '<')

    ScrollTrigger.create({
        trigger: '.sc-hero',
        start: '10% 10%',
        end: 'bottom bottom',
        animation: heroTl,
        // markers: true,
        scrub: 0,
        onLeave: () => Capsulin.fadeUp('.sc-design .sc-01 .txt', 0.1),
        onEnterBack: () => Capsulin.fadeOut('.sc-design .sc-01 .txt', -1, 0.1),
    })
    

    // 질문: 애니메이션 마지막에 배경과 이미지 사이 틈 발생
    const designTl01 = gsap.timeline()
    .to('.sc-design .sc-01 .sticky', {'--inset': 100})
    .to('.sc-design .sc-01 .bg', {yPercent: -20}, '<')
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
    .from('.sc-engine .sc-01 .bg', {yPercent: 30}, '<')
    
    ScrollTrigger.create({
        trigger: '.sc-design .sc-03',
        start: 'top top',
        end: 'bottom bottom',
        animation: designTl03,
        // markers: true,
        scrub: 0,
        onEnter: () => {
            Capsulin.fadeOut('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', -1, 0.1)
            gsap.to('.sc-design .sc-04 .tab-item .line', { width: 0, stagger: { each: 0.2}})
        },
        onLeaveBack: () => {
            Capsulin.fadeUp('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 0.1)
            gsap.to('.sc-design .sc-04 .tab-item .line', { width: '100%', stagger: { each: 0.2}})
        },
        onLeave: () => Capsulin.fadeUp('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 0.1),
        onEnterBack: () => Capsulin.fadeOut('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 1, 0.1),
    })

    const engineTl01 = gsap.timeline()
    .to('.sc-engine .sc-01 .sticky', {'--inset': 100})
    .fromTo('.sc-engine .sc-01 .bg', {yPercent: 0}, {yPercent: -30}, '<')
    .from('.sc-engine .sc-02 .bg', {yPercent: 30}, '<')

    ScrollTrigger.create({
        trigger: '.sc-engine .sc-01',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: engineTl01,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 1, 0.1),
        onLeaveBack: () => Capsulin.fadeUp('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 0.1),
        onLeave: () => Capsulin.fadeUp('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 1, .2),
    })

    const engineTl02 = gsap.timeline()
    .to('.sc-engine .sc-02 .sticky', {'--inset': 100})
    .fromTo('.sc-engine .sc-02 .bg', {yPercent: 0}, {yPercent: -30}, '<')
    .from('.sc-engine .sc-03 #eTab1', {yPercent: 30}, '<')

    ScrollTrigger.create({
        trigger: '.sc-engine .sc-02',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: engineTl02,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 1, 0.1),
        onLeaveBack: () => Capsulin.fadeUp('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 0.1),
        onLeave: () => {
            Capsulin.fadeUp('.sc-engine .sc-03 .txt', .2)
            gsap.to('.sc-engine .sc-03 .tab-item .line', { width: '100%', stagger: { each: 0.2}})
        },
        onEnterBack: () => {
            Capsulin.fadeOut('.sc-engine .sc-03 .txt', 1, 10)
            gsap.to('.sc-engine .sc-03 .tab-item .line', { width: 0, stagger: { each: 0.2}})
        },
    })

    const engineTl03 = gsap.timeline()
    .to('.sc-engine .sc-03 .sticky', {'--inset': 100})
    .fromTo('.sc-engine .sc-03 #eTab1', {yPercent: 0}, {yPercent: -30}, '<')
    .from('.sc-engine .sc-04 .bg', {yPercent: 30}, '<')

    ScrollTrigger.create({
        trigger: '.sc-engine .sc-03',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: engineTl03,
        scrub: 0,
        onEnter: () => {
            Capsulin.fadeOut('.sc-engine .sc-03 .txt', 1, 10)
            gsap.to('.sc-engine .sc-03 .tab-item .line', { width: 0, stagger: { each: 0.2}})
        },
        onLeaveBack: () => {
            Capsulin.fadeUp('.sc-engine .sc-03 .txt', .2)
            gsap.to('.sc-engine .sc-03 .tab-item .line', { width: '100%', stagger: { each: 0.2}})
        },
        onLeave: () => Capsulin.fadeUp('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', 1, .2),
    })

    const engineTl04 = gsap.timeline()
    .to('.sc-engine .sc-04 .sticky', {'--inset': 100})
    .to('.sc-custom .sc-01 .bg-gradient', {'--top': 0}, '<')
    .from('.sc-custom .sc-01 .bg-capsule', {yPercent: 10}, '<')

    ScrollTrigger.create({
        trigger: '.sc-engine .sc-04',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: engineTl04,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', 1, 1),
        onLeaveBack: () => Capsulin.fadeUp('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', 1),
        onLeave: () => Capsulin.fadeUp('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', 1, .2),
    })

    const customTl01 = gsap.timeline()
    .fromTo('.sc-custom .sc-01 .bg-gradient', {'--top': 0}, {'--top': -100}, '<')
    .fromTo('.sc-custom .sc-01 .bg-capsule', {yPercent: 0}, {yPercent: -10}, '<')
    .from('.sc-custom .sc-02 .sc-left .img-area', { clipPath: 'inset(30% 30% 30% 30%)'}, '<')
    .from('.sc-custom .sc-02 .sc-right .bg-area', { clipPath: 'inset(0% 50% 0% 50%)'}, '<')
    .from('.sc-custom .sc-02 .sc-right .bg-area .bg', { backgroundSize: '30%'}, '<')

    ScrollTrigger.create({
        trigger: '.sc-custom .sc-01',
        start: 'top top',
        endTrigger: '.sc-custom .sc-02 .sticky',
        end: 'bottom bottom',
        // markers: true,
        animation: customTl01,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', 1, .2),
        onLeaveBack: () => Capsulin.fadeUp('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', .2),
        onLeave: () => {
            Capsulin.fadeUp('.sc-custom .sc-02 .title-box.active .char', .2)
            Capsulin.fadeUp('.sc-custom .sc-02 .tab-item .txt', .2)
            gsap.fromTo('.sc-custom .sc-02 .color-item', { scale: 0 }, { scale: 1, stagger: { amount: 0.3}})
        },
        onEnterBack: () => {
            Capsulin.fadeOut('.sc-custom .sc-02 .title-box.active .char', 1, .2)
            Capsulin.fadeOut('.sc-custom .sc-02 .tab-item .txt', 1, .2)
            gsap.fromTo('.sc-custom .sc-02 .color-item', { scale: 1 }, { scale: 0, stagger: { amount: 0.3}})
        },
    })

    const customTl02 = gsap.timeline()
    .to('.sc-custom .sc-02 .sticky', {'--inset': 100})
    .to('.sc-custom .sc-02 .sc-left', { yPercent: -100}, '<')
    .fromTo('.sc-custom .sc-02 .sc-left .img-area', { clipPath: 'inset(0 0 0 0)'}, { clipPath: 'inset(30% 30% 30% 30%)'}, '<')
    .to('.sc-custom .sc-02 .sc-right .bg-area .bg', { yPercent: -30}, '<')
    .from('.sc-custom .sc-03 .sc-right .img-box .img', { yPercent: 10}, '<')

    ScrollTrigger.create({
        trigger: '.sc-custom .sc-02',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: customTl02,
        scrub: 0,
        onEnter: () => {
            Capsulin.fadeOut('.sc-custom .sc-02 .title-box.active .char', 1, .2)
            Capsulin.fadeOut('.sc-custom .sc-02 .tab-item .txt', 1, .2)
            gsap.fromTo('.sc-custom .sc-02 .color-item', { scale: 1 }, { scale: 0, stagger: { amount: 0.3}})
        },
        onLeaveBack: () => {
            Capsulin.fadeUp('.sc-custom .sc-02 .title-box.active .char', .2)
            Capsulin.fadeUp('.sc-custom .sc-02 .tab-item .txt', .2)
            gsap.fromTo('.sc-custom .sc-02 .color-item', { scale: 0 }, { scale: 1, stagger: { amount: 0.3}})
        },
        onLeave: () => Capsulin.fadeUp('.sc-custom .sc-03 .line', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-custom .sc-03 .line', 1, .2),
    })

    const customTl03 = gsap.timeline()
    .to('.sc-custom .sc-03 .sticky', {'--inset': 100})
    .fromTo('.sc-custom .sc-03 .sc-right .img-box .img', { yPercent: 0}, { yPercent: -30}, '<')
    .from('.sc-experience .sc-01 .bg', { yPercent: 10}, '<')

    ScrollTrigger.create({
        trigger: '.sc-custom .sc-03',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: customTl03,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-custom .sc-03 .line', 1, .2),
        onLeaveBack: () => Capsulin.fadeUp('.sc-custom .sc-03 .line', .2),
        onLeave: () => Capsulin.fadeUp('.sc-experience .sc-01 .txt', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-experience .sc-01 .txt', 1, .2),
    })

    const experienceTl01 = gsap.timeline()
    .to('.sc-experience .sc-01 .sticky', {'--inset': 100})
    .fromTo('.sc-experience .sc-01 .bg', { yPercent: 0}, { yPercent: -30}, '<')
    .from('.sc-experience .sc-02', { '--top': 100}, '<')
    .from('.sc-experience .sc-02 .sc-right .img-box', { clipPath: 'inset(50% 50% 50% 50%)'}, '<')
    .to('.sc-experience .sc-02 .sc-right .img-box', { clipPath: 'inset(50% 50% 50% 50%)'})
    .to('.sc-experience .sc-02 .sc-left', {'--inset': 100}, '<')
    .from('.sc-experience .sc-03', { '--top': 100}, '<')
    
    ScrollTrigger.create({
        trigger: '.sc-experience .sc-01',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: experienceTl01,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-experience .sc-01 .txt', 1, .2),
        onLeaveBack: () => Capsulin.fadeUp('.sc-experience .sc-01 .txt', .2),
        onLeave: () => Capsulin.fadeUp('.sc-experience .sc-03 .line', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-experience .sc-03 .line', 1, .2),
    })
    
    const experienceTl02 = gsap.timeline()
    .to('.sc-experience .sc-03 .sticky', {'--inset': 100})
    .from('.sc-spec .sc-01 .bg', {yPercent: 30}, '<')

    ScrollTrigger.create({
        trigger: '.sc-experience .sc-03',
        start: 'top top',
        end: 'bottom bottom',
        markers: true,
        animation: experienceTl02,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-experience .sc-03 .line', 1, .2),
        onLeaveBack: () => Capsulin.fadeUp('.sc-experience .sc-03 .line', .2),
        onLeave: () => Capsulin.fadeUp('.sc-spec .sc-01 .txt', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-spec .sc-01 .txt', 1, .2),
    })

    const specTl01 = gsap.timeline()
    .to('.sc-spec .sc-01 .sticky', {'--inset': 100})
    .fromTo('.sc-spec .sc-01 .bg',{yPercent: 0}, {yPercent: -30}, '<')
    .from('.sc-spec .sc-02 .sc-left', { '--top': 100}, '<')

    ScrollTrigger.create({
        trigger: '.sc-spec .sc-01',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: specTl01,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-spec .sc-01 .txt', 1, .2),
        onLeaveBack: () => Capsulin.fadeUp('.sc-spec .sc-01 .txt', .2),
        onLeave: () => Capsulin.fadeUp('.sc-spec .sc-02 .line', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-spec .sc-02 .line', 1, .2),
    })

    const specTl02 = gsap.timeline()
    .to('.sc-spec .sc-02 .sticky', {'--inset': 100})
    .fromTo('.sc-spec .sc-02 .sc-left', { '--top': 0}, {'--top': -10}, '<')
    .from('.sc-spec .sc-03 .bg',{yPercent: 10}, '<')

    ScrollTrigger.create({
        trigger: '.sc-spec .sc-02',
        start: 'top top',
        end: 'bottom bottom',
        // markers: true,
        animation: specTl02,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-spec .sc-02 .line', 1, .2),
        onLeaveBack: () => Capsulin.fadeUp('.sc-spec .sc-02 .line', .2),
        onLeave: () => Capsulin.fadeUp('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', .2),
        onEnterBack: () => Capsulin.fadeOut('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', 1, .2),
    })

    const specTl03 = gsap.timeline()
    .to('.sc-spec .sc-03 .sticky', {'--inset': 100})
    .fromTo('.sc-spec .sc-03 .bg',{yPercent: 0}, {yPercent: -10}, '<')
    .from('.sc-spec .sc-04 .bg',{yPercent: 10}, '<')

    ScrollTrigger.create({
        trigger: '.sc-spec .sc-03',
        start: 'top top',
        end: 'bottom bottom',
        markers: true,
        animation: specTl03,
        scrub: 0,
        onEnter: () => Capsulin.fadeOut('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', 1, .2),
        onLeaveBack: () => Capsulin.fadeUp('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', .2),
    })

    const specTl04 = gsap.timeline()
    .to('.sc-spec .sc-04 .sticky', {'--inset': 100})
    .fromTo('.sc-spec .sc-04 .bg',{yPercent: 0}, {yPercent: -10}, '<')
    .from('.sc-contact .bg',{yPercent: 10}, '<')

    ScrollTrigger.create({
        trigger: '.sc-spec .sc-04',
        start: 'top top',
        endTrigger: '.sc-contact',
        end: 'top bottom',
        markers: true,
        animation: specTl04,
        scrub: 0,
        onLeave: () => {
            Capsulin.fadeUp('.sc-contact .txt, .sc-contact .line', .2)
            gsap.to('.sc-contact .btn', {'--scale': 1})
        },
        onEnterBack: () => {
            Capsulin.fadeOut('.sc-contact .txt, .sc-contact .line', 1, .2)
            gsap.to('.sc-contact .btn', {'--scale': 0})
        },
    })
})
gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
    ease: 'none',
});
ScrollTrigger.clearScrollMemory('manual');

$(document).ready(() => {
    // split text
    splitLinesInit = () => {
        const text = new SplitType('.split-line', { types: 'lines' })
        const text2 = new SplitType('.split-txt .line', { types: 'chars' })
        const lines = $('.half .title .line, .txt-area .txt .line, .sc-spec .sc-04 .sc-right .line');
        $(lines).wrap('<div class="txt-wrap"></div>');
    }
    splitLinesInit();

    function setTweenDefaults() {
        gsap.set('.split-line .char', {
            yPercent: -120
        })
        gsap.set('.split-txt.active .char', {
            yPercent: 0
        })
    
        // default
        gsap.set('.tab-list .line', { 
            width: 0
        })
        gsap.set('.main .txt-wrap .txt, .main .txt-wrap .line, .main .txt-wrap .num, .main .txt-wrap .ico, .title .img, .title-box .char', {
            yPercent: 120
        })
        gsap.set('.sc-hero .txt-wrap .txt, .title-box .line', { 
            yPercent: 0
        })
        gsap.set('.pagination .page-item', { 
            yPercent: 100
        })
        gsap.set('.sc-custom .sc-02 .color-item', { 
            scale: 0 
        })
        gsap.set('.split-line .char', {
            yPercent: -120
        })
    }
    setTweenDefaults();

    // 진행률 애니메이션
    gsap.from('.progress-bar', {
        height: 0,
        scrollTrigger: {
            trigger: '.main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0,
        }
    })

    // hero 영역 애니메이션
    const heroTl = gsap.timeline()
    .to('.sc-hero .sticky', { 
        delay: .1,
        '--inset': 100
    })
    .to('.sc-hero .bg', {
        yPercent: -40
    }, '<')

    ScrollTrigger.create({
        trigger: '.sc-hero',
        start: '10% 10%',
        end: 'bottom bottom',
        animation: heroTl,
        scrub: 0,
        onLeave: () => {
            Capsulin.fadeUp('.sc-design .sc-01 .txt', 0.1)
            gsap.to('.pagination .page-item', { 
                yPercent: 0
            })
        },
        onEnterBack: () => {
            Capsulin.fadeOut('.sc-design .sc-01 .txt', -1, 0.1)  
            gsap.to('.pagination .page-item', { 
                yPercent: 100
            })
        },
    })

    // gsap matchmedia
    let mm = gsap.matchMedia();

    // 가로모드 애니메이션
    mm.add("(orientation: landscape)", () => {
        // design 영역 애니메이션1
        const designTl01 = gsap.timeline()
        .to('.sc-design .sc-01 .sticky', {
            delay: .1,
            '--inset': 100
        })
        .to('.sc-design .sc-01 .bg', {
            yPercent: -20
        }, '<')
        .from('.sc-design .sc-02 .sc-left', { 
            clipPath: 'inset(0% 100% 0% 0%)'
        }, '<')
        .from('.sc-design .sc-02 .sc-left img', { 
            xPercent: -50, 
            yPercent: 50, 
            scale: 0.8
        }, '<')

        ScrollTrigger.create({
            trigger: '.sc-design .sc-01',
            start: '50% 50%',
            end: 'bottom 90%',
            animation: designTl01,
            scrub: 0,
            onEnter: () => {
                Capsulin.fadeOut('.sc-design .sc-01 .txt', 1, 0.1)
            },
            onLeaveBack: () => {
                Capsulin.fadeUp('.sc-design .sc-01 .txt', 0.1)
            },
            onLeave: () => Capsulin.fadeUp('.sc-design .sc-02 .line', 0.2),
            onEnterBack: () => Capsulin.fadeOut('.sc-design .sc-02 .line', -1, 0.2),
        })

        // design 영역 애니메이션2
        const designTl02 = gsap.timeline()
        .to('.sc-design .sc-02 .sc-left .img-box', { 
            delay: .1,
            clipPath: "inset(50% 50% 50% 50%)",
            scale: 0.8
        })
        .from('.sc-design .sc-03 .sc-left .img-box', { 
            clipPath: 'inset(50% 50% 50% 50%)'
        }, '<')
        .from('.sc-design .sc-03 .sc-right', { 
            clipPath: 'inset(0% 50% 0% 50%)'
        }, '<')
        .to('.sc-design .sc-03 .sc-left .img-box', { 
            clipPath: 'inset(50% 50% 50% 50%)'
        })
        .to('.sc-design .sc-03 .sc-right', { 
            clipPath: 'inset(50% 0% 50% 0%)'
        }, '<')
        .from('.sc-design .sc-04 .sc-left', { 
            clipPath: 'inset(50% 50% 50% 50%)',
        }, '<')
        
        ScrollTrigger.create({
            trigger: '.sc-design .sc-02',
            start: 'top top',
            end: 'bottom bottom',
            animation: designTl02,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-design .sc-02 .line', 1, 0.1),
            onLeaveBack: () => Capsulin.fadeUp('.sc-design .sc-02 .line', 0.1),
            onLeave: () => {
                Capsulin.fadeUp('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 0.1)
                gsap.to('.sc-design .sc-04 .tab-item .line', { 
                    width: '100%', 
                    stagger: {
                        each: 0.2
                    }
                })
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 1, 0.1)
                gsap.to('.sc-design .sc-04 .tab-item .line', { 
                    width: 0, 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
        })

        // design 영역 애니메이션3
        const designTl03 = gsap.timeline()
        .to('.sc-design .sc-04 .sticky', {
            delay: .1,
            '--inset': 100
        })
        .from('.sc-engine .sc-01 .bg', {
            yPercent: 30
        }, '<')
        
        ScrollTrigger.create({
            trigger: '.sc-design .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: designTl03,
            scrub: 0,
            onEnter: () => {
                Capsulin.fadeOut('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', -1, 0.1)
                gsap.to('.sc-design .sc-04 .tab-item .line', { 
                    width: 0, 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
            onLeaveBack: () => {
                Capsulin.fadeUp('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 0.1)
                gsap.to('.sc-design .sc-04 .tab-item .line', { 
                    width: '100%', 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
            onLeave: () => {
                Capsulin.fadeUp('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 0.1)
                gsap.to('.pagination .page-item', { 
                    yPercent: -100
                })   
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 1, 0.1)
                gsap.to('.pagination .page-item', { 
                    yPercent: 0
                })   
            },
        })

        // engine 영역 애니메이션1
        const engineTl01 = gsap.timeline()
        .to('.sc-engine .sc-01 .sticky', {
            delay: .1,
            '--inset': 100
        })
        .fromTo('.sc-engine .sc-01 .bg', {
            yPercent: 0
        }, {
            yPercent: -30
        }, '<')
        .from('.sc-engine .sc-02 .bg', {
            yPercent: 30
        }, '<')

        ScrollTrigger.create({
            trigger: '.sc-engine .sc-01',
            start: 'top top',
            end: 'bottom bottom',
            animation: engineTl01,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 1, 0.1),
            onLeaveBack: () => Capsulin.fadeUp('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 0.1),
            onLeave: () => Capsulin.fadeUp('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', .2),
            onEnterBack: () => Capsulin.fadeOut('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 1, .2),
        })

        const engineTl02 = gsap.timeline()
        .to('.sc-engine .sc-02 .sticky', {delay: .1,'--inset': 100})
        .fromTo('.sc-engine .sc-02 .bg', {yPercent: 0}, {yPercent: -30}, '<')
        .from('.sc-engine .sc-03 #eTab1', {yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-engine .sc-02',
            start: 'top top',
            end: 'bottom bottom',
            animation: engineTl02,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 1, 0.1),
            onLeaveBack: () => Capsulin.fadeUp('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 0.1),
            onLeave: () => {
                Capsulin.fadeUp('.sc-engine .sc-03 .txt', .2)
                gsap.to('.sc-engine .sc-03 .tab-item .line', { width: '100%', stagger: { each: 0.2}})
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-engine .sc-03 .txt', 1, .2)
                gsap.to('.sc-engine .sc-03 .tab-item .line', { width: 0, stagger: { each: 0.2}})
            },
        })

        const engineTl03 = gsap.timeline()
        .to('.sc-engine .sc-03 .sticky', {delay: .1,'--inset': 100})
        .fromTo('.sc-engine .sc-03 #eTab1', {yPercent: 0}, {yPercent: -10}, '<')
        .from('.sc-engine .sc-04 .bg', {yPercent: 30}, '<')

        ScrollTrigger.create({
            trigger: '.sc-engine .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: engineTl03,
            scrub: 0,
            onEnter: () => {
                Capsulin.fadeOut('.sc-engine .sc-03 .txt', 1, .2)
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
        .to('.sc-engine .sc-04 .sticky', {delay: .1,'--inset': 100})
        .to('.sc-custom .sc-01 .bg-gradient', {'--top': 0}, '<')
        .from('.sc-custom .sc-01 .bg-capsule', {yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-engine .sc-04',
            start: 'top top',
            end: 'bottom bottom',
            animation: engineTl04,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', 1, 1),
            onLeaveBack: () => Capsulin.fadeUp('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', 1),
            onLeave: () => {
                Capsulin.fadeUp('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', .2)
                gsap.to('.pagination .page-item', { yPercent: -200})
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', 1, .2)
                gsap.to('.pagination .page-item', { yPercent: -100})
            },
        })

        const customTl01 = gsap.timeline()
        .fromTo('.sc-custom .sc-01 .bg-gradient', {'--top': 0}, {delay: .1,'--top': -100})
        .fromTo('.sc-custom .sc-01 .bg-capsule', {yPercent: 0}, {yPercent: -10}, '<')
        .fromTo('.sc-custom .sc-02 .sc-left .tab-cont .con', { clipPath: 'inset(50% 50% 50% 50%)'}, { clipPath: 'inset(0% 0% 0% 0%)'}, '<')
        .from('.sc-custom .sc-02 .sc-right .bg-area', { clipPath: 'inset(0% 50% 0% 50%)'}, '<')
        .fromTo('.sc-custom .sc-02 .sc-right .bg-area .bg', { scale: .7}, { scale: 1}, '-=.2')

        ScrollTrigger.create({
            trigger: '.sc-custom .sc-01',
            start: 'top top',
            endTrigger: '.sc-custom .sc-02 .sticky',
            end: 'bottom bottom',
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
        .to('.sc-custom .sc-02 .sticky', {delay: .1,'--inset': 100})
        .to('.sc-custom .sc-02 .sc-left', { yPercent: -100}, '<')
        .fromTo('.sc-custom .sc-02 .sc-left .tab-cont .con', { clipPath: 'inset(0% 0% 0% 0%)'}, { clipPath: 'inset(50% 50% 50% 50%)'}, '<')
        .to('.sc-custom .sc-02 .sc-right .bg-area .bg', { yPercent: -30}, '<')
        .from('.sc-custom .sc-03 .sc-right .img-box .img', { yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-custom .sc-02',
            start: 'top top',
            end: 'bottom bottom',
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
        .to('.sc-custom .sc-03 .sticky', {delay: .1,'--inset': 100})
        .fromTo('.sc-custom .sc-03 .sc-right .img-box .img', { yPercent: 0}, { yPercent: -30}, '<')
        .from('.sc-experience .sc-01 .bg', { yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-custom .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: customTl03,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-custom .sc-03 .line', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-custom .sc-03 .line', .2),
            onLeave: () => {
                Capsulin.fadeUp('.sc-experience .sc-01 .txt', .2)
                gsap.to('.pagination .page-item', { yPercent: -300})
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-experience .sc-01 .txt', 1, .2)
                gsap.to('.pagination .page-item', { yPercent: -200})
            },
        })

        const experienceTl01 = gsap.timeline()
        .to('.sc-experience .sc-01 .sticky', {delay: .1,'--inset': 100})
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
            animation: experienceTl01,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-experience .sc-01 .txt', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-experience .sc-01 .txt', .2),
            onLeave: () => Capsulin.fadeUp('.sc-experience .sc-03 .line', .2),
            onEnterBack: () => Capsulin.fadeOut('.sc-experience .sc-03 .line', 1, .2),
        })
        
        const experienceTl02 = gsap.timeline()
        .to('.sc-experience .sc-03 .sticky', {delay: .1,'--inset': 100})
        .from('.sc-spec .sc-01 .bg', {yPercent: 30}, '<')

        ScrollTrigger.create({
            trigger: '.sc-experience .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: experienceTl02,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-experience .sc-03 .line', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-experience .sc-03 .line', .2),
            onLeave: () => {
                Capsulin.fadeUp('.sc-spec .sc-01 .txt', .2)
                gsap.to('.pagination .page-item', { yPercent: -400})
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-spec .sc-01 .txt', 1, .2)
                gsap.to('.pagination .page-item', { yPercent: -300})
            },
        })

        const specTl01 = gsap.timeline()
        .to('.sc-spec .sc-01 .sticky', {delay: .1,'--inset': 100})
        .fromTo('.sc-spec .sc-01 .bg',{yPercent: 0}, {yPercent: -30}, '<')
        .from('.sc-spec .sc-02 .sc-left', { '--top': 100}, '<')

        ScrollTrigger.create({
            trigger: '.sc-spec .sc-01',
            start: 'top top',
            end: 'bottom bottom',
            animation: specTl01,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-spec .sc-01 .txt', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-spec .sc-01 .txt', .2),
            onLeave: () => Capsulin.fadeUp('.sc-spec .sc-02 .line', .2),
            onEnterBack: () => Capsulin.fadeOut('.sc-spec .sc-02 .line', 1, .2),
        })

        const specTl02 = gsap.timeline()
        .to('.sc-spec .sc-02 .sticky', {delay: .1,'--inset': 100})
        .fromTo('.sc-spec .sc-02 .sc-left', { '--top': 0}, {'--top': -10}, '<')
        .from('.sc-spec .sc-03 .bg',{yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-spec .sc-02',
            start: 'top top',
            end: 'bottom bottom',
            animation: specTl02,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-spec .sc-02 .line', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-spec .sc-02 .line', .2),
            onLeave: () => Capsulin.fadeUp('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', .2),
            onEnterBack: () => Capsulin.fadeOut('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', 1, .2),
        })

        const specTl04 = gsap.timeline()
        .to('.sc-spec .sc-04 .sticky', {delay: .1,'--inset': 100})
        .fromTo('.sc-spec .sc-04 .bg',{yPercent: 0}, {yPercent: -10}, '<')
        .from('.sc-contact .bg',{yPercent: 10}, '<')

        const $circle = $('.ico .circle');
        $circle.each((idx, cir) => {
            let circleLength = $(cir)[0].getTotalLength();
            gsap.set(cir, { strokeDashoffset: circleLength, strokeDasharray: circleLength, opacity: 0})
        })
        const specTl03 = gsap.timeline()
        .to('.sc-spec .sc-03 .sticky', {delay: .1,'--inset': 100})
        .fromTo('.sc-spec .sc-03 .bg',{yPercent: 0}, {yPercent: -10}, '<')
        .from('.sc-spec .sc-04 .bg',{yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-spec .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: specTl03,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', .2),
            onLeave: () => {
                $circle.each((idx, cir) => {
                    let circleLength = $(cir)[0].getTotalLength();
                    gsap.to(cir, { strokeDashoffset: 0, strokeDasharray: circleLength, opacity: 1})
                })
                Capsulin.fadeUp('.sc-spec .sc-04 .txt, .sc-spec .sc-04 .line', .2)
            },
            onEnterBack: () => {
                $circle.each((idx, cir) => {
                    let circleLength = $(cir)[0].getTotalLength();
                    gsap.to(cir, { strokeDashoffset: circleLength, strokeDasharray: circleLength, opacity: 0})
                })
                Capsulin.fadeOut('.sc-spec .sc-04 .txt, .sc-spec .sc-04 .line', 1,.2)
            }
        })

        ScrollTrigger.create({
            trigger: '.sc-spec .sc-04',
            start: 'top top',
            endTrigger: '.sc-contact',
            end: 'top bottom',
            animation: specTl04,
            scrub: 0,
            onEnter: () => {
                $circle.each((idx, cir) => {
                    let circleLength = $(cir)[0].getTotalLength();
                    gsap.to(cir, { strokeDashoffset: circleLength, strokeDasharray: circleLength, opacity: 0})
                })
                Capsulin.fadeOut('.sc-spec .sc-04 .txt, .sc-spec .sc-04 .line', 1,.2)
            },
            onLeaveBack: () => {
                $circle.each((idx, cir) => {
                    let circleLength = $(cir)[0].getTotalLength();
                    gsap.to(cir, { strokeDashoffset: 0, strokeDasharray: circleLength, opacity: 1})
                })
                Capsulin.fadeUp('.sc-spec .sc-04 .txt, .sc-spec .sc-04 .line', .2)
            },
            onLeave: () => {
                Capsulin.fadeUp('.sc-contact .txt, .sc-contact .line', .2)
                gsap.to('.sc-contact .btn', {'--scale': 1})
                gsap.to('.pagination .page-item', { yPercent: -500})
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-contact .txt, .sc-contact .line', 1, .2)
                gsap.to('.sc-contact .btn', {'--scale': 0})
                gsap.to('.pagination .page-item', { yPercent: -400})
            },
        })
    })

    // 세로모드 애니메이션
    mm.add("(orientation: portrait)", () => {
        // design 영역 애니메이션1
        const designTl01 = gsap.timeline()
        .fromTo('.sc-design .sc-01 .sticky', {
            delay: .2,
            clipPath: 'inset(0)'
        }, {
            clipPath: 'inset(44% 0 56% 0)'
        })
        .from('.sc-design .sc-02 .sc-left', { 
            yPercent: -50, 
        }, '<')

        ScrollTrigger.create({
            trigger: '.sc-design .sc-01',
            start: '50% 50%',
            end: 'bottom 100%',
            animation: designTl01,
            scrub: 0,
            onEnter: () => {
                Capsulin.fadeOut('.sc-design .sc-01 .txt', 1, 0.1)
                gsap.to('.page-list', {
                    yPercent: -100,
                })
            },
            onLeaveBack: () => {
                Capsulin.fadeUp('.sc-design .sc-01 .txt', 0.1)
                gsap.to('.page-list', {
                    yPercent: 0,
                })
            },
            onLeave: () => Capsulin.fadeUp('.sc-design .sc-02 .line', 0.2),
            onEnterBack: () => Capsulin.fadeOut('.sc-design .sc-02 .line', -1, 0.2),
        })

        // design 영역 애니메이션2
        const designTl02 = gsap.timeline()
        .to('.sc-design .sc-02 .sc-left .img-box img', { 
            delay: .2,
            yPercent: 10,
            scale: 1.3
        })
        .fromTo('.sc-design .sc-03 .sc-right .img-box', { 
            clipPath: 'inset(0 0 100% 0)'
        }, {
            clipPath: 'inset(0% 0% 0% 0%)'
        }, '<')
        .from('.sc-design .sc-03 .sc-right .img-box img', { 
            yPercent: -60
        }, '<')
        .fromTo('.sc-design .sc-03 .sc-left .img-box img', { 
            clipPath: 'inset(50% 50% 50% 50%)'
        }, {
            clipPath: 'inset(0%)'
        }, '<')
        .to('.sc-design .sc-03 .sc-left .img-box img', { 
            clipPath: 'inset(50% 50% 50% 50%)'
        })
        .to('.sc-design .sc-03 .sc-right .img-box', { 
            clipPath: 'inset(100% 0 0 0)'
        }, '<')
        .to('.sc-design .sc-03 .sc-right .img-box img', { 
            yPercent: 10
        }, '<')
        .fromTo('.sc-design .sc-04 .sc-left .img-box', { 
            clipPath: 'inset(0 0 100% 0)'
        }, {
            clipPath: 'inset(0% 0% 0% 0%)'
        }, '<')
        .from('.sc-design .sc-04 .sc-left .img-box img', { 
            yPercent: -60
        }, '<')
        .set('.sc-design .sc-04 .sticky', { 
            background: '#0a1c36'
        })

        ScrollTrigger.create({
            trigger: '.sc-design .sc-02',
            start: 'top top',
            end: 'bottom bottom',
            animation: designTl02,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-design .sc-02 .line', 1, 0.1),
            onLeaveBack: () => Capsulin.fadeUp('.sc-design .sc-02 .line', 0.1),
            onLeave: () => {
                Capsulin.fadeUp('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 0.1)
                gsap.to('.sc-design .sc-04 .tab-item .line', { 
                    width: '100%', 
                    stagger: {
                        each: 0.2
                    },
                })
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 1, 0.1)
                gsap.to('.sc-design .sc-04 .tab-item .line', { 
                    width: 0, 
                    stagger: { 
                        each: 0.2
                    },
                })
            },
        })

        // design 영역 애니메이션3
        const designTl03 = gsap.timeline()
        .to('.sc-design .sc-04 .sticky', {
            delay: .2,
            '--inset': 100
        })
        .from('.sc-engine .sc-01 .bg', {
            yPercent: 30
        }, '<')
        
        ScrollTrigger.create({
            trigger: '.sc-design .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: designTl03,
            scrub: 0,
            onEnter: () => {
                Capsulin.fadeOut('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', -1, 0.1)
                gsap.to('.sc-design .sc-04 .tab-item .line', { 
                    width: 0, 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
            onLeaveBack: () => {
                Capsulin.fadeUp('.sc-design .sc-04 .line, .sc-design .sc-04 .txt, .sc-design .sc-04 .num', 0.1)
                gsap.to('.sc-design .sc-04 .tab-item .line', { 
                    width: '100%', 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
            onLeave: () => {
                Capsulin.fadeUp('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 0.1)
                gsap.to('.pagination .page-item', { 
                    yPercent: -100,
                    onComplete: () => {
                        gsap.fromTo('.page-list', {
                            yPercent: 100,
                        }, {
                            yPercent: 0,
                        })
                    }
                }) 
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 1, 0.1)
                gsap.to('.page-list', {
                    yPercent: 100,
                })
            },
        })

        // engine 영역 애니메이션1
        const engineTl01 = gsap.timeline()
        .to('.sc-engine .sc-01 .sticky', {
            '--inset': 100
            
        })
        .fromTo('.sc-engine .sc-01 .bg', {
            yPercent: 0
        }, {
            yPercent: -30
        }, '<')
        .from('.sc-engine .sc-02 .bg', {
            yPercent: 30
        }, '<')

        ScrollTrigger.create({
            trigger: '.sc-engine .sc-01',
            start: 'top top',
            end: 'bottom bottom',
            animation: engineTl01,
            scrub: 0,
            onEnter: () => {
                Capsulin.fadeOut('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 1, 0.1)
                gsap.to('.page-list', {
                    yPercent: -100,
                })
            },
            onLeaveBack: () => {
                Capsulin.fadeUp('.sc-engine .sc-01 .txt, .sc-engine .sc-01 .ico', 0.1)
                gsap.to('.page-list', {
                    yPercent: 0,
                })
            },
            onLeave: () => Capsulin.fadeUp('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', .2),
            onEnterBack: () => Capsulin.fadeOut('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 1, .2),
        })

        // engine 영역 애니메이션2
        const engineTl02 = gsap.timeline()
        .to('.sc-engine .sc-02 .sticky', {
            delay: .2,
            '--inset': 100
        })
        .fromTo('.sc-engine .sc-02 .bg', {
            yPercent: 0
        }, {
            yPercent: -30
        }, '<')
        .fromTo('.sc-engine .sc-03 .sc-left', {
            clipPath: 'inset(100% 0 0 0)',
            yPercent: 10,
        }, {
            clipPath: 'inset(0% 0% 0% 0%)',
            yPercent: 0,
        }, '<')
        .set ('.sc-engine .sc-03 .sticky', {
            background: '#0a1c36'
        })

        ScrollTrigger.create({
            trigger: '.sc-engine .sc-02',
            start: 'top top',
            end: 'bottom bottom',
            animation: engineTl02,
            scrub: 0,
            onEnter: () => {
                gsap.set('.sc-engine .sc-03', {
                    zIndex: 80
                })
                Capsulin.fadeOut('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 1, 0.1)
            },
            onLeaveBack: () => {
                gsap.set('.sc-engine .sc-03', {
                    zIndex: 60
                })
                Capsulin.fadeUp('.sc-engine .sc-02 .title .txt, .sc-engine .sc-02 .line', 0.1)
            },
            onLeave: () => {
                Capsulin.fadeUp('.sc-engine .sc-03 .txt', .2)
                gsap.to('.sc-engine .sc-03 .tab-item .line', { 
                    width: '100%', 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-engine .sc-03 .txt', 1, .2)
                gsap.to('.sc-engine .sc-03 .tab-item .line', { 
                    width: 0, 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
        })

        // engine 영역 애니메이션3
        const engineTl03 = gsap.timeline()
        .to('.sc-engine .sc-03 .sticky', {
            delay: .2,
            '--inset': 100
        })
        .fromTo('.sc-engine .sc-03 .sc-left', {
            clipPath: 'inset(0% 0% 0% 0%)',
        }, {
            clipPath: 'inset(0% 0% 100% 0%)',
        }, '<')
        .fromTo('.sc-engine .sc-03 .sc-left img', {
            yPercent: 0
        }, {
            yPercent: -50
        }, '<')
        .from('.sc-engine .sc-04 .bg', {
            yPercent: 30
        }, '<')

        ScrollTrigger.create({
            trigger: '.sc-engine .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: engineTl03,
            scrub: 0,
            onEnter: () => {
                Capsulin.fadeOut('.sc-engine .sc-03 .txt', 1, .2)
                gsap.to('.sc-engine .sc-03 .tab-item .line', { 
                    width: 0, 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
            onLeaveBack: () => {
                Capsulin.fadeUp('.sc-engine .sc-03 .txt', .2)
                gsap.to('.sc-engine .sc-03 .tab-item .line', { 
                    width: '100%', 
                    stagger: { 
                        each: 0.2
                    }
                })
            },
            onLeave: () => {
                Capsulin.fadeUp('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', .2)
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', 1, .2)
            },
        })

        const engineTl04 = gsap.timeline()
        .to('.sc-engine .sc-04 .sticky', {
            delay: .2,
            '--inset': 100
        })
        .to('.sc-custom .sc-01 .bg-gradient', {
            '--top': 0
        }, '<')
        .from('.sc-custom .sc-01 .bg-capsule', {
            yPercent: 10
        }, '<')

        ScrollTrigger.create({
            trigger: '.sc-engine .sc-04',
            start: 'top top',
            end: 'bottom bottom',
            animation: engineTl04,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', 1, 1),
            onLeaveBack: () => Capsulin.fadeUp('.sc-engine .sc-04 .title .txt, .sc-engine .sc-04 .line', 1),
            onLeave: () => {
                Capsulin.fadeUp('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', .2)
                gsap.to('.pagination .page-item', { 
                    yPercent: -200,
                    onComplete: () => {
                        gsap.fromTo('.page-list', {
                            yPercent: 100,
                        }, {
                            yPercent: 0,
                        })
                    }
                })
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', 1, .2)
                gsap.to('.page-list', { yPercent: 100})
            },
        })

        const customTl01 = gsap.timeline()
        .fromTo('.sc-custom .sc-01 .bg-gradient', {
            delay: .2,
            '--top': 0
        }, {
            '--top': -100
        }, '<')
        .fromTo('.sc-custom .sc-01 .bg-capsule', {
            yPercent: 0
        }, {
            yPercent: -30
        }, '<')
        .from('.sc-custom .sc-02 .sc-left', { 
            clipPath: 'inset(0% 0% 100% 0%)'
        }, '<')
        .from('.sc-custom .sc-02 .sc-left .tab-cont', { 
            yPercent: -150
        }, '<')
        .from('.sc-custom .sc-02 .sc-left .tab-cont .con', { 
            scale: 0
        }, '<')
        .from('.sc-custom .sc-02 .sc-right .bg-area', { 
            clipPath: 'inset(100% 0% 0% 0%)'
        }, '<')
        .from('.sc-custom .sc-02 .sc-right .bg-area .bg', { 
            yPercent: 30
        }, '<')

        ScrollTrigger.create({
            trigger: '.sc-custom .sc-01',
            start: 'top top',
            end: 'bottom bottom',
            animation: customTl01,
            scrub: 0,
            onEnter: () => {
                gsap.to('.page-list', { yPercent: -100})
                Capsulin.fadeOut('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', 1, .2)
            },
            onLeaveBack: () => {
                gsap.to('.page-list', { yPercent: 0})
                Capsulin.fadeUp('.sc-custom .sc-01 .txt, .sc-custom .sc-01 .title .img', .2)
            },
            onLeave: () => {
                Capsulin.fadeUp('.sc-custom .sc-02 .title-box.active .char', .2)
                Capsulin.fadeUp('.sc-custom .sc-02 .tab-item .txt', .2)
                gsap.fromTo('.sc-custom .sc-02 .color-item', { 
                    scale: 0 
                }, { 
                    scale: 1, 
                    stagger: { 
                        amount: 0.3
                    }
                })
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-custom .sc-02 .title-box.active .char', 1, .2)
                Capsulin.fadeOut('.sc-custom .sc-02 .tab-item .txt', 1, .2)
                gsap.fromTo('.sc-custom .sc-02 .color-item', { 
                    scale: 1 
                }, { 
                    scale: 0, 
                    stagger: { 
                        amount: 0.3
                    }
                })
            },
        })

        const customTl02 = gsap.timeline()
        .fromTo('.sc-custom .sc-02 .sticky', {
            delay: .2,
            clipPath: 'inset(0% 0% 0% 0%)'
        }, {
            clipPath: 'inset(44% 0% 56% 0%)'
        })
        .fromTo('.sc-custom .sc-02 .sc-left .tab-cont .con', { 
            scale: 1
        }, {
            scale: 0
        }, '<')
        .to('.sc-custom .sc-02 .sc-right .bg-area .bg', { backgroundPosition: 'center 45%'}, '<')
        .from('.sc-custom .sc-03 .sc-right .img-box .img', { yPercent: 50}, '<')

        ScrollTrigger.create({
            trigger: '.sc-custom .sc-02',
            start: 'top top',
            end: 'bottom bottom',
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
        .to('.sc-custom .sc-03 .sticky', {delay: .2,'--inset': 100})
        .from('.sc-experience .sc-01 .bg', { yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-custom .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: customTl03,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-custom .sc-03 .line', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-custom .sc-03 .line', .2),
            onLeave: () => {
                Capsulin.fadeUp('.sc-experience .sc-01 .txt', .2)
                gsap.to('.pagination .page-item', { 
                    yPercent: -300,
                    onComplete: () => {
                        gsap.fromTo('.page-list', {
                            yPercent: 100,
                        }, {
                            yPercent: 0,
                        })
                    }
                })
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-experience .sc-01 .txt', 1, .2)
                gsap.to('.page-list', {
                    yPercent: 100,
                })
            },
        })

        const experienceTl01 = gsap.timeline()
        .fromTo('.sc-experience .sc-01 .bg', { 
            delay: .2,
            yPercent: 0
        }, {
            yPercent: -5
        }, '<')
        .fromTo('.sc-experience .sc-02 .sc-left', { 
            clipPath: 'inset(0% 0% 100% 0%)'
        }, { 
            clipPath: 'inset(0% 0% 0% 0%)'
        }, '<')
        .from('.sc-experience .sc-02 .sc-left .img', { 
            yPercent: -50,
        }, '<')
        .fromTo('.sc-experience .sc-02 .sc-right', { 
            clipPath: 'inset(100% 0% 0% 0%)'
        }, {
            clipPath: 'inset(0% 0% 0% 0%)'
        }, '<')
        .fromTo('.sc-experience .sc-02 .sc-right img', { 
            yPercent: 130,
            clipPath: 'inset(50% 50% 50% 50%)'
        }, {
            yPercent: 0,
            clipPath: 'inset(0% 0% 0% 0%)'
        },'<')
        .set('.sc-experience .sc-03', {
            zIndex: 60
        })
        .fromTo('.sc-experience .sc-02 .sc-left', { 
            clipPath: 'inset(0% 0% 0% 0%)'
        }, { 
            clipPath: 'inset(100% 0% 0% 0%)'
        }, '<')
        .fromTo('.sc-experience .sc-02 .sc-left .img', { 
            yPercent: 0,
        }, {
            yPercent: 50,
        }, '<')
        .to('.sc-experience .sc-02 .sc-right img', { 
            clipPath: 'inset(50% 50% 50% 50%)'
        }, '<')
        .from('.sc-experience .sc-03 .sc-left .img', {
            yPercent: -50
        }, '<')
        .set('.sc-experience .sc-02', {
            zIndex: 55
        })
        
        ScrollTrigger.create({
            trigger: '.sc-experience .sc-01',
            start: 'top top',
            end: 'bottom bottom',
            animation: experienceTl01,
            scrub: 0,
            onEnter: () => {
                gsap.to('.page-list', {
                    yPercent: -100,
                })
                Capsulin.fadeOut('.sc-experience .sc-01 .txt', 1, .2)
            },
            onLeaveBack: () => {
                gsap.to('.page-list', {
                    yPercent: 0,
                })
                Capsulin.fadeUp('.sc-experience .sc-01 .txt', .2)
            },
            onLeave: () => Capsulin.fadeUp('.sc-experience .sc-03 .line', .2),
            onEnterBack: () => Capsulin.fadeOut('.sc-experience .sc-03 .line', 1, .2),
        })
        
        const experienceTl02 = gsap.timeline()
        .to('.sc-experience .sc-03 .sticky', {delay: .2,'--inset': 100})
        .from('.sc-spec .sc-01 .bg', {yPercent: 30}, '<')

        ScrollTrigger.create({
            trigger: '.sc-experience .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: experienceTl02,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-experience .sc-03 .line', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-experience .sc-03 .line', .2),
            onLeave: () => {
                Capsulin.fadeUp('.sc-spec .sc-01 .txt', .2)
                gsap.to('.pagination .page-item', { 
                    yPercent: -400,
                    onComplete: () => {
                        gsap.fromTo('.page-list', {
                            yPercent: 100,
                        }, {
                            yPercent: 0,
                        })
                    }
                })
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-spec .sc-01 .txt', 1, .2)
                gsap.to('.page-list', {
                    yPercent: 100,
                })
            },
        })

        const specTl01 = gsap.timeline()
        .fromTo('.sc-spec .sc-01 .bg',{
            delay: .2,
            yPercent: 0
        }, {
            yPercent: -30
        })
        .fromTo('.sc-spec .sc-02 .sc-left', {
            clipPath: 'inset(0% 0% 100% 0%)'
        }, {
            clipPath: 'inset(0% 0% 0% 0%)'
        },'<')
        .fromTo('.sc-spec .sc-02 .sc-right', {
            clipPath: 'inset(100% 0% 0% 0%)'
        }, {
            clipPath: 'inset(0% 0% 0% 0%)'
        },'<')

        ScrollTrigger.create({
            trigger: '.sc-spec .sc-01',
            start: 'top top',
            end: 'bottom bottom',
            animation: specTl01,
            scrub: 0,
            onEnter: () => {
                gsap.to('.page-list', {
                    yPercent: -100,
                })
                Capsulin.fadeOut('.sc-spec .sc-01 .txt', 1, .2)
            },
            onLeaveBack: () => {
                gsap.to('.page-list', {
                    yPercent: 0,
                })
                Capsulin.fadeUp('.sc-spec .sc-01 .txt', .2)
            },
            onLeave: () => Capsulin.fadeUp('.sc-spec .sc-02 .line', .2),
            onEnterBack: () => Capsulin.fadeOut('.sc-spec .sc-02 .line', 1, .2),
        })

        const specTl02 = gsap.timeline()
        .to('.sc-spec .sc-02 .sticky', {delay: .2,'--inset': 100})
        .from('.sc-spec .sc-03 .bg',{yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-spec .sc-02',
            start: 'top top',
            end: 'bottom bottom',
            animation: specTl02,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-spec .sc-02 .line', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-spec .sc-02 .line', .2),
            onLeave: () => Capsulin.fadeUp('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', .2),
            onEnterBack: () => Capsulin.fadeOut('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', 1, .2),
        })

        const specTl04 = gsap.timeline()
        .to('.sc-spec .sc-04 .sticky', {delay: .2,'--inset': 100})
        .fromTo('.sc-spec .sc-04 .bg',{yPercent: 0}, {yPercent: -10}, '<')
        .from('.sc-contact .bg',{yPercent: 10}, '<')

        const $circle = $('.ico .circle');
        $circle.each((idx, cir) => {
            let circleLength = $(cir)[0].getTotalLength();
            gsap.set(cir, { strokeDashoffset: circleLength, strokeDasharray: circleLength, opacity: 0})
        })
        const specTl03 = gsap.timeline()
        .to('.sc-spec .sc-03 .sticky', {delay: .2,'--inset': 100})
        .fromTo('.sc-spec .sc-03 .bg',{yPercent: 0}, {yPercent: -10}, '<')
        .from('.sc-spec .sc-04 .bg',{yPercent: 10}, '<')

        ScrollTrigger.create({
            trigger: '.sc-spec .sc-03',
            start: 'top top',
            end: 'bottom bottom',
            animation: specTl03,
            scrub: 0,
            onEnter: () => Capsulin.fadeOut('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', 1, .2),
            onLeaveBack: () => Capsulin.fadeUp('.sc-spec .sc-03 .txt, .sc-spec .sc-03 .img', .2),
            onLeave: () => {
                $circle.each((idx, cir) => {
                    let circleLength = $(cir)[0].getTotalLength();
                    gsap.to(cir, { strokeDashoffset: 0, strokeDasharray: circleLength, opacity: 1})
                })
                Capsulin.fadeUp('.sc-spec .sc-04 .txt, .sc-spec .sc-04 .line', .2)
                gsap.fromTo('.sc-spec .sc-04 .swiper-pagination', { scaleX: 0}, { scaleX: 1})
            },
            onEnterBack: () => {
                $circle.each((idx, cir) => {
                    let circleLength = $(cir)[0].getTotalLength();
                    gsap.to(cir, { strokeDashoffset: circleLength, strokeDasharray: circleLength, opacity: 0})
                })
                Capsulin.fadeOut('.sc-spec .sc-04 .txt, .sc-spec .sc-04 .line', 1,.2)
                gsap.fromTo('.sc-spec .sc-04 .swiper-pagination', { scaleX: 1}, { scaleX: 0})
            }
        })

        ScrollTrigger.create({
            trigger: '.sc-spec .sc-04',
            start: 'top top',
            endTrigger: '.sc-contact',
            end: 'top bottom',
            animation: specTl04,
            scrub: 0,
            onEnter: () => {
                $circle.each((idx, cir) => {
                    let circleLength = $(cir)[0].getTotalLength();
                    gsap.to(cir, { strokeDashoffset: circleLength, strokeDasharray: circleLength, opacity: 0})
                })
                Capsulin.fadeOut('.sc-spec .sc-04 .txt, .sc-spec .sc-04 .line', 1,.2)
                gsap.fromTo('.sc-spec .sc-04 .swiper-pagination', { scaleX: 1}, { scaleX: 0})
            },
            onLeaveBack: () => {
                $circle.each((idx, cir) => {
                    let circleLength = $(cir)[0].getTotalLength();
                    gsap.to(cir, { strokeDashoffset: 0, strokeDasharray: circleLength, opacity: 1})
                })
                Capsulin.fadeUp('.sc-spec .sc-04 .txt, .sc-spec .sc-04 .line', .2)
                gsap.fromTo('.sc-spec .sc-04 .swiper-pagination', { scaleX: 0}, { scaleX: 1})
            },
            onLeave: () => {
                Capsulin.fadeUp('.sc-contact .txt, .sc-contact .line', .2)
                gsap.to('.sc-contact .btn', {'--scale': 1})
                gsap.to('.pagination .page-item', { 
                    yPercent: -500,
                    onComplete: () => {
                        gsap.fromTo('.page-list', {
                            yPercent: 100,
                        }, {
                            yPercent: 0,
                        })
                    }
                })
            },
            onEnterBack: () => {
                Capsulin.fadeOut('.sc-contact .txt, .sc-contact .line', 1, .2)
                gsap.to('.sc-contact .btn', {'--scale': 0})
                gsap.to('.page-list', {
                    yPercent: 100,
                })
            },
        })
    })

    $(window).resize(function() {
        ScrollTrigger.refresh();
        SplitType.revert('.split-line, .split-txt .line');
        splitLinesInit();
        setTweenDefaults();
    })
    
})
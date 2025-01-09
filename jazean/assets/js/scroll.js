$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ease: 'none'});

    const isMobile = window.matchMedia("(max-width: 960px)").matches;
    const svgTl = gsap.timeline()
    // .to('.sc-visual .line-gradient .path', { duration: .6, strokeDashoffset: 0})
    // .to('.sc-bean .line-bean .path', { duration: 1, strokeDashoffset: 0})
    // .to('.sc-grain .line-grain .path', { duration: () => {
    //     return isMobile ? 1 : 2
    // }, strokeDashoffset: 0})
    // .add(pathGrainMobile())
    // .to('.sc-grain .line-farmer .outline', { duration: .4, strokeDashoffset: 0})
    // .to('.sc-grain .line-farmer .path:not(.outline)', { duration: .4, strokeDashoffset: 0}, '-=.2')
    // .to('.sc-tech .line .path', { duration: 1.5, strokeDashoffset: 0}, '-=.1')
    // .to('.sc-roast .top .path', { duration: .7, strokeDashoffset: 0})
    // .to('.sc-roast .line-bean .path', { duration: 1, strokeDashoffset: 0})
    // .to('.sc-roast .bottom .path', { duration: .7, strokeDashoffset: 0})
    // .to('.sc-discover .group-bg .line .path', { strokeDashoffset: 0})
    // .from('.sc-discover .line .logo', { opacity: 0}, '<')
    // function pathGrainMobile() {
    //     if(isMobile) {
    //         const tl = gsap.timeline()
    //         .to('.sc-grain .line-bean .path', { duration: 1, strokeDashoffset: 0})
    //         .to('.sc-grain .line-grain2 .path', { strokeDashoffset: 0})
    //         return tl
    //     }
    // }

    ScrollTrigger.create({
        trigger: '.sticky-wrap',
        start: 'top top',
        end: 'bottom bottom',
        animation: svgTl,
        scrub: true,
    })

    ScrollTrigger.create({
        trigger: '.sc-visual',
        start: 'top 0%',
        end: () => {
            return isMobile ? '100% 40%' : '100% 40%';
        },
        animation: gsap.to('.sc-visual .line-gradient .path', { duration: .6, strokeDashoffset: 0}),
        scrub: 0,
    })
    
    const beanTween = gsap.from('.sc-bean .txt-area > *, .ico-bean', { autoAlpha: 0, yPercent: 100, stagger: { each: 0.2 }})
    
    ScrollTrigger.create({
        trigger: '.sc-bean',
        start: () => {
            return isMobile ? '0% 40%' : '0% 40%'
        },
        end: 'bottom 65%',
        scrub: 0,
        animation: gsap.to('.sc-bean .line-bean .path', { duration: 1, strokeDashoffset: 0}),
        onEnter: () => beanTween,
    })

    const cherryTl = gsap.timeline()
    .set('.sc-grain .cherry-box', { yPercent: idx => {
        return (idx + 2) * 100;
    }})
    .to('.sc-grain .cherry-box', { yPercent: 0, rotate: idx => {
        return idx === 0 ? 185 : idx === 1 ? 110 : 202;
    }})
    
    ScrollTrigger.create({
        trigger: '.sc-grain .inner',
        start: 'top bottom',
        end: 'bottom top',
        animation: cherryTl,
        scrub: true,
    })

    const grainTween = gsap.from('.sc-grain .txt-area > *', { autoAlpha: 0, yPercent: 100, stagger: { each: 0.2 }})
    const grainTl = gsap.timeline()
    .to('.sc-grain .line-grain .path', { strokeDashoffset: 0})
    .to('.sc-grain .line-farmer .outline', { duration: .4, strokeDashoffset: 0})
    .to('.sc-grain .line-farmer .path:not(.outline)', { duration: .4, strokeDashoffset: 0}, '-=.2')
    ScrollTrigger.create({
        trigger: '.sc-grain',
        start: 'top 65%',
        end: 'bottom 45%',
        animation: grainTl,
        scrub: 0,
        onEnter: () => grainTween,
    })
    
    const techTween = gsap.from('.sc-tech .txt-area > *', { autoAlpha: 0, yPercent: 100, stagger: { each: 0.2 }})
    ScrollTrigger.create({
        trigger: '.sc-tech',
        start: 'top 75%',
        end: 'bottom 75%',
        scrub: 0,
        animation: gsap.to('.sc-tech .line .path', { strokeDashoffset: 0}),
        markers: true,
        onEnter: () => techTween,
    })

    const techVideo = document.querySelector(".sc-tech video");
    const techTl = gsap.timeline()
    .from('.floating-bean', {'--yPercent': 0})
    techVideo.onloadedmetadata = function () {
        techTl.to(techVideo, { currentTime: techVideo.duration }, '<')
    };

    ScrollTrigger.create({
        trigger: '.sc-tech .inner',
        start: 'top bottom',
        end: 'bottom top',
        animation: techTl,
        scrub: 1,
    })
    
    const roastVideo = document.querySelector("#flavor video");
    const roastVideoTl = gsap.timeline()
    roastVideo.onloadedmetadata = function () {
        roastVideoTl.to(roastVideo, { currentTime: roastVideo.duration })
    }
    ScrollTrigger.create({
        trigger: '#flavor',
        start: 'top bottom',
        end: 'bottom top',
        markers: true,
        animation: roastVideoTl,
        scrub: 1,
    })

    const roatTl = gsap.timeline()
    .to('.sc-roast .top .path', { duration: .7, strokeDashoffset: 0})
    .to('.sc-roast .line-bean .path', { duration: 1, strokeDashoffset: 0})
    .to('.sc-roast .bottom .path', { duration: .7, strokeDashoffset: 0})

    ScrollTrigger.create({
        trigger: '.sc-roast',
        start: 'top 75%',
        end: 'bottom 35%',
        animation: roatTl,
        scrub: 0,
    })

    // roast 영역 텍스트 나누기
    const roastTxt = new SplitType('.sc-roast .txt-area .title', { types: 'words' });
    // roast 영역 텍스트 애니메이션
    const roastTxtTl = gsap.timeline()
    .to('.sc-roast', { 
        '--inset': 0, 
        duration: 5
    })
    .to('.sc-roast .txt-area1 .title .word', { 
        autoAlpha: 0, 
        yPercent: -100, 
        stagger: { 
            amount: 0.5
        }
    }, '<')
    .to('.sc-roast .txt-area1 .txt', { 
        autoAlpha: 0
    }, '<')
    .from('.sc-roast .txt-area2 .title .word', { 
        autoAlpha: 0, 
        yPercent: 100, 
        stagger: { 
            amount: 0.5
        }
    }, '-=3.6')
    .from('.sc-roast .txt-area2 .txt', { 
        autoAlpha: 0
    }, '-=2.8')

    ScrollTrigger.create({
        trigger: '.sc-roast',
        start: 'top top',
        end: 'bottom bottom',
        animation: roastTxtTl,
        scrub: 0,
    })

    // discover 영역 애니메이션
    const discoverTL = gsap.timeline()
    .to('.sc-discover .group-bg .line .path', { 
        strokeDashoffset: 0
    })
    .from('.sc-discover .line .logo', { 
        opacity: 0
    }, '<')

    const discoverTl02 = gsap.timeline()
    .from('.sc-discover .txt-area > *, .sc-discover .link', { 
        autoAlpha: 0, 
        yPercent: 100, 
        stagger: { 
            each: 0.2 
        }
    })
    .to('.sc-discover .group-cnt .line .path', { 
        strokeDashoffset: 0
    }, '<')

    ScrollTrigger.create({
        trigger: '.sc-discover',
        start: 'top 35%',
        end: 'bottom 100%',
        scrub: 0,
        animation: discoverTL,
        onEnter: () => discoverTl02,
    })

    // 타이틀 단어 나누기
    const centerTxt = new SplitType('.sc-center .title-area .title', { types: 'words' });
    // 센터 영역 애니메이션
    const centerTL = gsap.timeline()
    .from('.sc-center .title-area .word, .sc-center .title-area .link', { 
        autoAlpha: 0, 
        yPercent: 100, 
        stagger: { 
            amount: 0.3 
        }
    })
    .from('.sc-center .title-area .txt', { 
        autoAlpha: 0
    }, '<')

    ScrollTrigger.create({
        trigger: '.sc-center',
        start: 'top top',
        end: 'bottom top',
        animation: centerTL,
    })

    // 뉴스 영역 애니메이션
    ScrollTrigger.create({
        trigger: '.sc-news',
        start: 'top center',
        end: 'bottom center',
        animation: gsap.from('.sc-news .swiper-slide', { 
            autoAlpha: 0, 
            xPercent: 100, 
            ease: 'sine.out', 
            duration: 1, 
            stagger: { 
                each: 0.3
            }
        }),
    })

    // footer 영역 애니메이션
    const footerTL = gsap.timeline()
    .from('#footer .ft-top > *', { 
        autoAlpha: 0, 
        xPercent: 100, 
        ease: 'sine.out', 
        stagger: { 
            amount: 0.3 
        }
    })
    .from('#footer .ft-bottom *', { 
        autoAlpha: 0, 
        ease: 'sine.out', 
        stagger: { 
            amount: 0.3 
        }
    })

    ScrollTrigger.create({
        trigger: '#footer',
        start: 'top center',
        end: 'bottom center',
        animation: footerTL,
    })
})
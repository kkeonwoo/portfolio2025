$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ease: 'none'});

    // 질문
    // 스크롤을 상단으로 쎄게 하면 튕기는 듯한 느낌

    // line의 타임라인과 개별 섹션의 애니메이션과 잘 안맞는 느낌
    // line이 너무 빨리 실행됨
    // 이 경우 tween의 duration을 늘려 scrolltrigger에서 차지하는 비중을 늘려야하는지
    // dom의 높이를 늘려야하는지 애매함
    const isMobile = window.matchMedia("(max-width: 960px)").matches;

    const svgTl = gsap.timeline()
    .to('.sc-visual .line-gradient .path', { duration: .6, strokeDashoffset: 0})
    .to('.sc-bean .line-bean .path', { duration: 1, strokeDashoffset: 0})
    .to('.sc-grain .line-grain .path', { duration: () => {
        return isMobile ? 1 : 2
    }, strokeDashoffset: 0})
    .add(pathGrainMobile())
    .to('.sc-grain .line-farmer .outline', { duration: .4, strokeDashoffset: 0})
    .to('.sc-grain .line-farmer .path:not(.outline)', { duration: .4, strokeDashoffset: 0}, '-=.2')
    .to('.sc-tech .line .path', { duration: 1.5, strokeDashoffset: 0}, '-=.1')
    .to('.sc-roast .top .path', { duration: .7, strokeDashoffset: 0})
    .to('.sc-roast .line-bean .path', { duration: 1, strokeDashoffset: 0})
    .to('.sc-roast .bottom .path', { duration: .7, strokeDashoffset: 0})
    .to('.sc-discover .group-bg .line .path', { strokeDashoffset: 0})
    .from('.sc-discover .line .logo', { opacity: 0}, '<')
    function pathGrainMobile() {
        if(isMobile) {
            const tl = gsap.timeline()
            .to('.sc-grain .line-bean .path', { duration: 1, strokeDashoffset: 0})
            .to('.sc-grain .line-grain2 .path', { strokeDashoffset: 0})
            return tl
        }
    }

    console.log(svgTl);
    

    ScrollTrigger.create({
        trigger: '.sticky-wrap',
        start: 'top top',
        end: 'bottom bottom',
        animation: svgTl,
        scrub: true,
    })

    const beanTween = gsap.from('.sc-bean .txt-area > *, .ico-bean', { autoAlpha: 0, yPercent: 100, stagger: { each: 0.2 }})

    ScrollTrigger.create({
        trigger: '.sc-bean',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => beanTween,
    })

    const grainTl = gsap.timeline()
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
        animation: grainTl,
        scrub: true,
    })

    const grainTween = gsap.from('.sc-grain .txt-area > *', { autoAlpha: 0, yPercent: 100, stagger: { each: 0.2 }})
    ScrollTrigger.create({
        trigger: '.sc-grain',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => grainTween,
    })

    const techTween = gsap.from('.sc-tech .txt-area > *', { autoAlpha: 0, yPercent: 100, stagger: { each: 0.2 }})
    ScrollTrigger.create({
        trigger: '.sc-tech',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => techTween,
    })

    const techVideo = document.querySelector(".sc-tech video");
    const techTl = gsap.timeline()
    .from('.floating-bean', {'--yPercent': 0})
    // video가 load되고 난 이후 실행해야 druation을 구할 수 있음
    techVideo.onloadedmetadata = function () {
        techTl.to(techVideo, { currentTime: techVideo.duration }, '<')
    };

    ScrollTrigger.create({
        trigger: '.sc-tech .inner',
        start: 'top bottom',
        end: 'bottom top',
        animation: techTl,
        // markers:true,
        scrub: 1, // 비디오가 끊겨보인 이유
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
        animation: roastVideoTl,
        markers: true,
        scrub: 1,
    })

    const roastTxt = new SplitType('.sc-roast .txt-area .title', { types: 'words' });
    const roastTl = gsap.timeline()
    .to('.sc-roast', { '--inset': 0, duration: 5})
    .to('.sc-roast .txt-area1 .title .word', { autoAlpha: 0, yPercent: -100, stagger: { amount: 0.5}}, '<')
    .to('.sc-roast .txt-area1 .txt', { autoAlpha: 0}, '<')
    .from('.sc-roast .txt-area2 .title .word', { autoAlpha: 0, yPercent: 100, stagger: { amount: 0.5}}, '-=3.6')
    .from('.sc-roast .txt-area2 .txt', { autoAlpha: 0}, '-=2.8')


    ScrollTrigger.create({
        trigger: '.sc-roast',
        start: 'top top',
        end: 'bottom bottom',
        animation: roastTl,
        markers: true,
        scrub: true,
    })

    const discoverTL = gsap.timeline()
    .from('.sc-discover .txt-area > *, .sc-discover .link', { autoAlpha: 0, yPercent: 100, stagger: { each: 0.2 }})
    .to('.sc-discover .group-cnt .line .path', { strokeDashoffset: 0}, '<')

    ScrollTrigger.create({
        trigger: '.sc-discover',
        start: 'top center',
        end: 'bottom center',
        markers:true,
        onEnter: () => discoverTL,
    })

    const centerTxt = new SplitType('.sc-center .title-area .title', { types: 'words' });
    const centerTL = gsap.timeline()
    .from('.sc-center .title .word, .sc-center .link', { autoAlpha: 0, yPercent: 100, stagger: { amount: 0.3 }})
    .from('.sc-center .txt', { autoAlpha: 0}, '<')

    ScrollTrigger.create({
        trigger: '.sc-center',
        start: 'top top',
        end: 'bottom top',
        markers:true,
        onEnter: () => centerTL,
    })

    const newsTween = gsap.from('.sc-news .swiper-slide', { autoAlpha: 0, xPercent: 100, ease: 'sine.out', duration: 1, stagger: { each: 0.3 }})

    ScrollTrigger.create({
        trigger: '.sc-news',
        start: 'top center',
        end: 'bottom center',
        markers:true,
        onEnter: () => newsTween,
    })

    const footerTL = gsap.timeline()
    .from('#footer .ft-top > *', { autoAlpha: 0, xPercent: 100, ease: 'sine.out', stagger: { each: 0.3 }})
    .from('#footer .ft-bottom *', { autoAlpha: 0, ease: 'sine.out', stagger: { each: 0.3 }})

    ScrollTrigger.create({
        trigger: '#footer',
        start: 'top center',
        end: 'bottom center',
        markers:true,
        onEnter: () => footerTL,
    })

})
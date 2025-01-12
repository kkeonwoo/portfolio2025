$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger)

    // 단어 쪼개기
    const roastTxt = new SplitType('.sc-roast .txt-area .title', { types: 'words' });
    const centerTxt = new SplitType('.sc-center .title-area .title', { types: 'words' });
    
    // 모바일 체크
    const isMobile = window.matchMedia("(max-width: 960px)").matches;

    // gsap matchmedia
    let mm = gsap.matchMedia();
    // 텍스트 애니메이션 : translateY, opacity
    gsap.utils.toArray('.ani-translateY').forEach((target) => {
        // 기본값 세팅
        gsap.set(target, { 
            autoAlpha: 0, 
            yPercent: 100, 
        })

        const tween = gsap.to(target, {
            autoAlpha: 1,
            yPercent: 0,
            stagger: { 
                each: 0.2 
            },
            paused: true,
        })

        // pc
        mm.add("(min-width: 960px)", () => {
            ScrollTrigger.create({
                trigger: target.closest('section'),
                start: 'top center',
                end: 'bottom center',
                onEnter: () => tween.play(),
            });
        });

        // mobile
        mm.add("(max-width: 959px)", () => {
            ScrollTrigger.create({
                trigger: target.closest('.group-cnt'),
                start: 'top 80%',
                end: 'bottom 80%',
                onEnter: () => tween.play(),
            })
        });
    });

    // visual 영역 애니메이션
    ScrollTrigger.create({
        trigger: '.sc-visual',
        start: '0% 0%',
        end: '100% 40%',
        animation: gsap.to('.sc-visual .line-gradient .path', {
            strokeDashoffset: 0
        }),
        scrub: 0,
    })

    // bean 영역 애니메이션
    ScrollTrigger.create({
        trigger: '.sc-bean',
        start: '0% 40%',
        end: 'bottom 65%',
        scrub: 0,
        animation: gsap.to('.sc-bean .line-bean .path', { 
            strokeDashoffset: 0
        }),
    })

     // grain 영역 커피콩 애니메이션
    const cherryTl = gsap.timeline()
    .set('.sc-grain .cherry-box', { 
        yPercent: idx => {
            return (idx + 2) * 100;
        }
    })
    .to('.sc-grain .cherry-box', { 
        yPercent: 0, 
        rotate: idx => {
            return idx === 0 ? 185 : idx === 1 ? 110 : 202;
        }
    })
    
    ScrollTrigger.create({
        trigger: '.sc-grain .inner',
        start: 'top bottom',
        end: 'bottom top',
        animation: cherryTl,
        scrub: true,
    })

    // grain 영역 svg 애니메이션
    const grainTl = gsap.timeline()
    .to('.sc-grain .line-grain .path', { 
        strokeDashoffset: 0
    })
    .add(pathGrainMobile())
    .to('.sc-grain .line-farmer .outline', { 
        strokeDashoffset: 0
    })
    .to('.sc-grain .line-farmer .path:not(.outline)', { 
        strokeDashoffset: 0
    }, '-=.2')

    // grain 영역 모바일 svg 애니메이션 추가
    function pathGrainMobile() {
        if(isMobile) {
            const tl = gsap.timeline()
            .to('.sc-grain .line-bean .path', { duration: 1, strokeDashoffset: 0})
            .to('.sc-grain .line-grain2 .path', { strokeDashoffset: 0})
            return tl
        }
    }

    ScrollTrigger.create({
        trigger: '.sc-grain',
        start: 'top 65%',
        end: () => {
            return isMobile ? 'bottom 100%' :'bottom 45%'
        } ,
        animation: grainTl,
        scrub: 0,
    })
    
    // tech 영역 svg 애니메이션
    ScrollTrigger.create({
        trigger: '.sc-tech',
        start: () => {
            return isMobile ? 'top 25%' :'top 75%'
        } ,
        end: () => {
            return isMobile ? 'bottom 35%' :'bottom 75%'
        } ,
        scrub: 0,
        animation: gsap.to('.sc-tech .line .path', { 
            strokeDashoffset: 0
        }),
    })

    // tech 영역 비디오, 커피 애니메이션
    const techVideo = document.querySelector(".sc-tech video");
    const techTl = gsap.timeline()
    .from('.floating-bean', {
        '--yPercent': 0
    })
    techVideo.onloadedmetadata = function () {
        techTl.to(techVideo, { 
            currentTime: techVideo.duration // 영상 길이
        }, '<')
    };

    ScrollTrigger.create({
        trigger: '.sc-tech .inner',
        start: 'top bottom',
        end: () => {
            return isMobile ? 'bottom bottom' :'bottom top'
        },
        animation: techTl,
        scrub: 1,
    })
    
    // roast 영역 비디오 애니메이션
    const roastVideo = document.querySelector("#flavor video");
    const roastVideoTl = gsap.timeline()
    roastVideo.onloadedmetadata = function () {
        roastVideoTl.to(roastVideo, { 
            currentTime: roastVideo.duration 
        })
    }

    ScrollTrigger.create({
        trigger: '#flavor',
        start: 'top bottom',
        end: 'bottom top',
        animation: roastVideoTl,
        scrub: 1,
    })

    // roast 영역 svg 애니메이션
    const roatTl = gsap.timeline()
    .to('.sc-roast .top .path', { 
        strokeDashoffset: 0
    })
    .to('.sc-roast .line-bean .path', { 
        strokeDashoffset: 0
    })
    .to('.sc-roast .bottom .path', { 
        strokeDashoffset: 0
    })

    ScrollTrigger.create({
        trigger: '.sc-roast',
        start: () => {
            return isMobile ? 'top 35%' :'top 75%'
        },
        end: () => {
            return isMobile ? 'bottom 10%' :'bottom 35%'
        },
        animation: roatTl,
        scrub: 0,
    })

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

    ScrollTrigger.create({
        trigger: '.sc-discover',
        start: () => {
            return isMobile ? 'top 10%' :'top 35%'
        },
        end: 'bottom 100%',
        scrub: 1,
        animation: discoverTL,
        onEnter: () => {
            gsap.to('.sc-discover .txt-area > *, .sc-discover .link', { 
                autoAlpha: 1, 
                yPercent: 0,
            })
            gsap.to('.sc-discover .group-cnt .path', { 
                strokeDashoffset: 0, 
            })
        }
    })

    // 센터 영역 애니메이션
    const centerTL = gsap.timeline()
    .from('.sc-center .title-area .word, .sc-center .title-area .link, .sc-center .title-area .txt', { 
        autoAlpha: 0, 
        yPercent: 100, 
        stagger: { 
            amount: 0.3 
        }
    })

    ScrollTrigger.create({
        trigger: '.sc-center',
        start: 'top center',
        end: 'bottom center',
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
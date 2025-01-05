gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ease: 'none'});

// 이미지 애니메이션
const frameCount = 446;
const videoSection = {
    frame: 0
}

// 이미지 경로
const currFrame = (idx) => {
    return `./assets/images/seq/${idx.toString().padStart(4, '0')}.webp`;
}

// 이미지 객체 생성
const images = Array(frameCount).fill(null).map((_, idx) => {
    const img = new Image();
    img.src = currFrame(idx + 1);
    return img;
})

// 프레임 객체 숫자 애니메이션
const tl = gsap.timeline()
.to(videoSection, { frame: frameCount - 1, snap: 'frame', ease: 'none'})

// character 영역 애니메이션
ScrollTrigger.create({
    trigger: '.sc-character',
    start: 'top top',
    end: 'bottom center',
    animation: tl,
    scrub: 0,
    onUpdate: () => {
        // 이미지 경로 교체
        gsap.set('.sc-character .img', { attr: { src: images[videoSection.frame].src}})

        if ( videoSection.frame > 30 && videoSection.frame < 110) {
            $('.sc-character .txt1').addClass('ani-translate');
        } else {
            $('.sc-character .txt1').removeClass('ani-translate');
        }

        if ( videoSection.frame > 200 && videoSection.frame < 265) {
            $('.sc-character .txt2').addClass('ani-translate');
        } else {
            $('.sc-character .txt2').removeClass('ani-translate');
        }

        if ( videoSection.frame > 340 && videoSection.frame < 400) {
            $('.sc-character .txt3').addClass('ani-translate');
        } else {
            $('.sc-character .txt3').removeClass('ani-translate');
        }
        
    },
    toggleClass: {
        targets: '.sc-character',
        className: 'active'
    }
})

// 텍스트 애니메이션: rotateX
gsap.utils.toArray('.rotate-title').forEach((title, idx) => {
    ScrollTrigger.create({
        trigger: title.parentNode,
        start: 'top bottom',
        end: 'bottom bottom',
        animation: gsap.from(title, { 
            opacity: 0, 
            yPercent: 100, 
            rotateX: -90, 
            duration: 1, 
            delay: 0.1, 
            stagger: { 
                each: 0.1, 
                ease: 'power2.inOut'
            }
        }),
    })
})

// marquee 애니메이션
const infoWidth = gsap.getProperty('.sc-fact .info-item', 'width');
const infoTl = gsap.timeline()
.to('.sc-fact .info-item', { 
    x: -infoWidth * 7, 
    repeat: -1, 
    duration: 60 
})
// marquee roate 애니메이션
const circleTl = gsap.timeline()
.to('.sc-fact .circle', { 
    rotate: (i, t) => {
        return (i + 1) * 360
    },
    repeat: -1, 
    duration: 30, 
    stagger: { each: 0.2}
})
// 돌아가는 건 돌아가는걸 두고 그 부모요소를 제어하기
// 선생님 노션에 있는 마퀴 코드 보고 하기

ScrollTrigger.create({
    trigger: '.sc-fact',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
        let factor = 2.5;
        
        if (self.direction < 0) {
            factor *= -1;
        }
        
        // handle marquee timeScale
        gsap.timeline()
        .to(infoTl, { timeScale: factor * 2.5, duration:  0.2})
        .to(infoTl, { timeScale: factor / 2.5, duration: 1}, "+=0.3")

        // handle circle marquee timeScale
        gsap.timeline()
        .to(circleTl, { timeScale: factor * 3, duration:  0.2})
        .to(circleTl, { timeScale: factor / 2.5}, "+=0.3")
    },
    scrub: 0,
})

ScrollTrigger.create({
    trigger: '.sc-fact .group-info',
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: 0,
    onEnter: () => {
        $('.sc-fact .group-info').addClass('is-ani');
    }
})

const bannerTl = gsap.timeline({
    defaults: {
        ease: 'power2.inOut'
    }
})
.from('.group-banner .txt-area', { scaleX: 0, duration: 2})
.from('.group-banner .txt', { xPercent: (i, t) => {
    return i % 2 === 0 ? -10 : 10
}, duration: 2}, '-=1.5')
.set('.group-banner .dot', { opacity: 1})
.to('.group-banner .dot', { '--moveY': 0, ease: 'power2.out'})

gsap.utils.toArray('.sc-fact .group-banner').forEach((banner, idx) => {
    ScrollTrigger.create({
        trigger: banner,
        start: 'top bottom',
        end: 'bottom bottom',
        animation: bannerTl,
    })
})

let speciesFlag = false;
ScrollTrigger.create({
    trigger: '.sc-species',
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
        if (speciesFlag === false) {
            $('.sc-species').addClass('first');
            speciesFlag = true;
        }
    }
})

gsap.utils.toArray('.group-vinegar .txt, .sc-product .txt, .sc-species .group-title .txt').forEach((txt, idx) => {
    ScrollTrigger.create({
        trigger: txt,
        start: 'top bottom',
        end: 'bottom bottom',
        animation: gsap.from(txt, { yPercent: 120, ease: 'power2.inOut'}),
    })
})

ScrollTrigger.create({
    trigger: '.sc-pickle',
    start: 'top top',
    end: 'bottom top',
})

const footerTitle = gsap.utils.toArray('#footer .title');
footerTitle.forEach((title, idx) => {
    ScrollTrigger.create({
        trigger: title.parentNode,
        start: 'top bottom',
        end: 'bottom bottom',
        animation: gsap.from(title, { opacity: 0, yPercent: 100, rotateX: -90, duration: 1, delay: 0.1, stagger: { each: 0.1, ease: 'power2.inOut'}, onComplete: () => {
            if (idx === footerTitle.length - 1) {
                gsap.to('#footer', { '--transformX': 0})
            }
        }}),
    })
})
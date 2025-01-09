gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.defaults({ease: 'none'});

// 텍스트 나누기
splitLinesInit = () => {
    const splitLines = new SplitType('.split', { types: 'lines'});
    $('.line').wrap('<div class="txt-ani"></div>');
    $('.sc-product .line').addClass('ty-txt');
}

splitLinesInit();
$(window).resize(function() {
    SplitType.revert('.split');
    splitLinesInit();
})

// 텍스트 애니메이션: rotateX
gsap.utils.toArray('.rotate-title').forEach((title, idx) => {
    ScrollTrigger.create({
        trigger: title.parentNode,
        start: '0% 80%',
        end: '100% 80%',
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

// 텍스트 애니메이션: translateY
gsap.utils.toArray('.ty-txt').forEach((txt, idx) => {
    ScrollTrigger.create({
        trigger: txt.parentNode,
        start: '0% 80%',
        end: '100% 80%',
        animation: gsap.from(txt, { 
            yPercent: 120, 
            ease: 'power2.inOut'
        }),
    })
})

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
    start: '0% 0%',
    end: '100% 50%',
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

// marquee 애니메이션
const infoItem = $('.sc-fact .info-item');
const infoLength = 7;
marqeeMotion1 = gsap.to(infoItem,{
    repeat: -1,
    xPercent: -100 * infoLength,
    duration: 40,
    paused:true,
})
marqeeMotion2 = gsap.to(infoItem,{
    repeat: -1,
    xPercent: 100 * infoLength,
    duration: 40,
    paused:true,
})
marqeeMotion3 = gsap.fromTo('.sc-fact .info-list', {
    xPercent: -33.33,
}, {
    xPercent: -66.66
})

// marquee roate 애니메이션
rotateMotion1 = gsap.to('.sc-fact .circle',{
    rotate: -360,
    repeat: -1,
    duration: 20,
    paused: true,
})

rotateMotion2 = gsap.to('.sc-fact .circle',{
    rotate: 360,
    repeat: -1,
    duration: 20,
    paused: true,
})

rotateMotion3 = gsap.to('.sc-fact .circle-wrap', {
    rotate: (i, t) => -(i + 1) * 360,
})

motion3 = gsap.timeline()
.add(marqeeMotion3)
.add(rotateMotion3, '<')

ScrollTrigger.create({
    trigger: '.sc-fact',
    start: '0% 0%',
    end: '100% 100%',
    animation: motion3,
    scrub: 2,
    onUpdate: (self) => {
        playMotion = (motion1, motion2) => {
            if (motion1.isActive()) {
                motion1.reverse();
            } else {
                motion2.play();
            }
        }

        if (self.direction == 1) { // 내릴 때
            playMotion(marqeeMotion2, marqeeMotion1);
            playMotion(rotateMotion2, rotateMotion1);
        }else{ // 올릴 때
            playMotion(marqeeMotion1, marqeeMotion2);
            playMotion(rotateMotion1, rotateMotion2);
        }
    },
})

// fact 영역 info 애니메이션
ScrollTrigger.create({
    trigger: '.sc-fact .group-info',
    start: '0% 100%',
    end: '100% 100%',
    scrub: 0,
    onEnter: () => {
        $('.sc-fact .group-info').addClass('is-ani');
    }
})

// fact 영역 배너 애니메이션
const bannerTl = gsap.timeline({
    defaults: {
        ease: 'power2.inOut'
    }
})
.from('.group-banner .txt-area', { 
    scaleX: 0, 
    duration: 2
})
.from('.group-banner .txt', { 
    xPercent: (i, t) => {
        return i % 2 === 0 ? -10 : 10
    }, 
    duration: 2
}, '-=1.5')
.set('.group-banner .dot', { 
    opacity: 1
})
.to('.group-banner .dot', { 
    '--moveY': 0, 
    ease: 'power2.out'
})

gsap.utils.toArray('.sc-fact .group-banner').forEach((banner, idx) => {
    ScrollTrigger.create({
        trigger: banner,
        start: '0% 100%',
        end: '100% 100%',
        animation: bannerTl,
    })
})

// species 영역 애니메이션
ScrollTrigger.create({
    trigger: '.sc-species .group-swiper',
    start: '0% 50%',
    end: '100% 50%',
    once: true,
    toggleClass: {
        targets: '.sc-species',
        className: 'first'
    }
})
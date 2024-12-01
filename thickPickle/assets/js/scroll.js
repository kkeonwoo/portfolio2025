gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ease: 'none'});

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext("2d");

const frameCount = 446;
const videoSection = {
    frame: 0
}
const currFrame = (idx) => {
    return `../../assets/images/seq/${idx.toString().padStart(4, '0')}.webp`;
}

const images = Array(frameCount).fill(null).map((_, idx) => {
    const img = new Image();
    img.src = currFrame(idx + 1);
    return img;
})

const tl = gsap.timeline()
.to(videoSection, { frame: frameCount - 1, snap: 'frame', ease: 'none'})

ScrollTrigger.create({
    trigger: '.sc-character',
    start: 'top top',
    end: 'bottom center',
    animation: tl,
    scrub: 0,
    onUpdate: ({ progress }) => {
        // render();
        gsap.set('.sc-character .img', { attr: { src: images[videoSection.frame].src}})

        if ( videoSection.frame > 30 && videoSection.frame < 110) {
            $('.sc-character .txt1').addClass('ani-translate')
        } else {
            $('.sc-character .txt1').removeClass('ani-translate')
        }

        if ( videoSection.frame > 200 && videoSection.frame < 265) {
            $('.sc-character .txt2').addClass('ani-translate')
        } else {
            $('.sc-character .txt2').removeClass('ani-translate')
        }

        if ( videoSection.frame > 340 && videoSection.frame < 400) {
            $('.sc-character .txt3').addClass('ani-translate')
        } else {
            $('.sc-character .txt3').removeClass('ani-translate')
        }
        
    },
    toggleClass: {
        targets: '.sc-character',
        className: 'active'
    }
})

// images[0].onload = render;

// function render() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.drawImage(images[videoSection.frame], 0, 0);
// }


gsap.utils.toArray('.sc-fact .group-title .title').forEach((title, idx) => {
    ScrollTrigger.create({
        trigger: title.parentNode,
        start: 'top bottom',
        end: 'bottom bottom',
        animation: gsap.from(title, { opacity: 0, yPercent: 100, rotateX: -90, duration: 1, delay: 0.1, stagger: { each: 0.1, ease: 'power4.in'}}),
    })
})

const infoWidth = gsap.getProperty('.sc-fact .info-item', 'width');
const infoTl = gsap.timeline()
.to('.sc-fact .info-item', { x: -infoWidth * 7, repeat: -1, duration: 60 })

ScrollTrigger.create({
    trigger: '.sc-fact',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
        let factor = 2.5;
        
        if (self.direction < 0) {
            factor *= -1;
        }
        
        gsap.timeline()
        .to(infoTl, { timeScale: factor * 2.5, duration:  0.2})
        .to(infoTl, { timeScale: factor / 2.5, duration: 1}, "+=0.3")
    },
    scrub: 0,
})

ScrollTrigger.create({
    trigger: '.sc-fact .group-info',
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: 0,
    // once: true,
    markers:true,
    onEnter: () => {
        $('.sc-fact .group-info').addClass('is-ani');
    }
})


gsap.defaults({ease: 'none'});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const frameCount = 446;
function currFrame(idx) {
    return `../images/seq/${idx.toString().padStart(4, '0')}.webp`;
}

const videoSection = {
    frame: 0
}

const images = Array(frameCount).fill(null).map((_, idx) => {
    const img = new Image();
    img.src = currFrame(idx);
    return img;
})

const tl = gsap.timeline()
.to(videoSection, { frame: frameCount - 1, snap: 'frame', ease: 'none',})

ScrollTrigger.create({
    trigger: '.sc-character',
    start: 'top top',
    end: '+=3000',
    animation: tl,
    pin: true,
    scrub: true,
    onUpdate: () => {
        render();
    }
})

images[0].onload = render;

function render() {
    ctx.drawImages(images[videoSection.frame], 0, 0);
}

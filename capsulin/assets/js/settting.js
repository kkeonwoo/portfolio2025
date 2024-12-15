const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const heroText = new SplitType('.sc-hero .title .txt', { types: 'chars' })

lenis.on('scroll', ({scroll}) => {
  ScrollTrigger.update;
  if (scroll === 0) {
    Capsulin.aniHeroEnter();
  } else {
    gsap.to('.sc-hero .img-box', { autoAlpha: 0, yPercent: -100})
    gsap.to('.sc-hero .title .char', { yPercent: -100})
    gsap.to('.sc-hero .scroll-down-area .txt', { yPercent: -100})
    gsap.to('.sc-hero .scroll-down-area .ico', { yPercent: -100})  
  }
})

gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
})

lenis.stop();

gsap.ticker.lagSmoothing(0);
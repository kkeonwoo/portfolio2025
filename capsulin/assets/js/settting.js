const lenis = new Lenis()

lenis.on('scroll', () => {
  ScrollTrigger.update()
})

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// hero 영역 텍스트 쪼개기
const heroText = new SplitType('.sc-hero .title .txt', { types: 'chars' })
// hero 영역 애니메이션
lenis.on('scroll', ({scroll}) => {
  ScrollTrigger.update;
  if (scroll === 0) { // 스크롤 최상단
    Capsulin.aniHeroEnter();
  } else { // 스크롤 시
    gsap.to('.sc-hero .img-box', { 
      autoAlpha: 0, 
      yPercent: -100
    })
    gsap.to('.sc-hero .title .char', { 
      yPercent: -100
    })
    gsap.to('.sc-hero .scroll-down-area .txt', { 
      yPercent: -100
    })
    gsap.to('.sc-hero .scroll-down-area .ico', { 
      yPercent: -100
    })  
  }
})

lenis.stop();
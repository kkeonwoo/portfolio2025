Jazean = {
    init: function () {
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ease: 'none'});

        this.openingAni();
        this.setStrokeAnimation('.path');
        this.scrollAni();
    },
    openingAni: function() {
        $('#wrap').imagesLoaded()
        .done( function( instance ) {
            
            const opeingTl = gsap.timeline()
            .set('body', { onStart: () => {
                $('body').addClass('is-loaded');
            }})
            .to('.line-logo .path', { strokeDashoffset: 0})
            .to('.line-logo .logo-roots', { autoAlpha: 1})
            .from('.sc-visual .txt-area .char', { autoAlpha: 0, yPercent: 100, ease: 'linear', stagger: { amount: 2, ease: 'power2.in'}})
            .from('#header .link', { autoAlpha: 0, yPercent: -100, stagger: { amount: 1.5, from: 'end', ease: 'powe2.out'}})
            .to('.sc-visual .txt-area', { autoAlpha: 0, yPercent: 100}, '+=1')
            .to('.group-line', { y: -56}, '<')
            .from('.snb-item', { autoAlpha: 0, y: 100, stagger: { each: 0.2}})
            .from('.scroll-circle', { autoAlpha: 0}, '<')
            .set('body', { overflow: 'auto'})
        });
    },
    scrollAni: function() {
        gsap.utils.toArray('section').forEach((sc, idx) => {
            let path = $(sc).find('.line:not(".line-logo") .path');
            
            const svgTl = gsap.timeline()
            .to(path, { strokeDashoffset: 0})
            
            ScrollTrigger.create({
                trigger: sc,
                start: 'top center',
                // endTrigger: '.sc-grain',
                end: 'bottom center',
                animation: svgTl,
                scrub: true,
                markers: true,
            })

        })
    },
    getPathLength: function(t) {
        return $(t)[0].getTotalLength();
    },
    setStrokeAnimation: function(t) {
        $(t).each((_, path) => {
            const pathLength = this.getPathLength(path);
            gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength})
        })
    }
}

$(() => {
    Jazean.init();
});
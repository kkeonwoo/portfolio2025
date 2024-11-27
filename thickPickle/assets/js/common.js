Enterprise = {
    init: function () {
        this.introAni();
        this.scrollHdrAni();
    },
    introAni: function() {
        const introIcon = $('.intro .ico-loader');
        $('#wrap').imagesLoaded()
        .done( function( instance ) {
            const heroTitle = gsap.utils.toArray('.sc-hero .title');

            const introTl = gsap.timeline()
            .to(introIcon, { opacity: 0})
            .to('.intro', { yPercent: -100})
            .from(heroTitle, { autoAlpha: 0, y: 0, rotateX: -90, stagger: { each: 0.2, ease: 'power3.in', delay: 0.1}})
        })
        .progress( function() {
            gsap.from(introIcon, { opacity: 0, duration: 1, repeat: -1, yoyo: true})
        });
    },
    scrollHdrAni: function() {
        let lastScroll = 0;
        const logo = document.querySelector('#header .logo');
        const utilTxt = document.querySelectorAll('#header .link-utils .txt');

        $(window).on('scroll', function(e) {
            const curr = $(this).scrollTop();

            if (curr > lastScroll) {
                gsap.to(utilTxt, { yPercent: -100})
                gsap.to(logo, { scale: 0.75})
            } else {
                gsap.to(utilTxt, { yPercent: 0})
                gsap.to(logo, { scale: 1})
            }

            lastScroll = curr;
        });
    },
}

$(() => {
    Enterprise.init();
});
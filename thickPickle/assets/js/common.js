Enterprise = {
    init: function () {
        this.introAni();
    },
    introAni: function() {
        const introIcon = $('.intro .ico-loader');
        $('#wrap').imagesLoaded()
        .done( function( instance ) {
            const introTl = gsap.timeline()
            .to(introIcon, { opacity: 0})
            .to('.intro', { yPercent: -100})
        })
        .progress( function() {
            gsap.from(introIcon, { opacity: 0, duration: 1, repeat: -1, yoyo: true})
        });
    }
}

$(() => {
    Enterprise.init();
});
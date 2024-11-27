Enterprise = {
    init: function () {
        this.introAni();
        this.setVimeo();
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
    },
    setVimeo: function() {
        // const vimeoPlayer = new Vimeo.Player('.vimeo-player', {
        //     id: 122963,
        //     width: 1920,
        //     loop: true,
        //     autoplay: true,
        //     muted: true,
        //     controls: false,
        // });
    }
}

$(() => {
    Enterprise.init();
});
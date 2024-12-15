Capsulin = {
    init: function () {
        this.introAni();
        this.customHTML();
        this.handleMenu();
        this.handleMenuItem();
        this.textMarquee();
        this.handleTab();
        this.handleCustomTab();
        this.handleModal();
    },
    introAni: function() {
        // 질문 : 인트로 처리 방법
        $('#wrap').imagesLoaded()
        .done( function( instance ) {
            const introTl = gsap.timeline()
            .to('.intro', { yPercent: -100})
            .add(Capsulin.aniHeroEnter())
            .call(() => lenis.start())
        })
        .progress( function( instance, image ) {
            const num = $(".intro .num");
            const obj = { value: 0 };
            const ratio = instance.progressedCount / instance.images.length;
            gsap.to(obj, {
                value: ratio * 100,
                duration: 3,
                ease: "none",
                onUpdate: () => {
                    num.text(`${Math.round(obj.value)}`);
                },
            });
        });
    },
    customHTML: function() {
        const $titleArea = $('.color .title-area');
        const $bgArea = $('.color .bg-area');
        const $imgArea = $('.color .img-area');
        const $colorList = $('.color .color-list');
        const colors = [ 
            { rgb: 'rgb(20, 20, 20)', text:`Black`},
            { rgb: 'rgb(84, 90, 97)', text:`Dark<br/> Grey`},
            { rgb: 'rgb(240, 240, 240)', text:`Light<br/> Silver`},
            { rgb: 'rgb(107, 57, 51)', text:`Bronze`},
            { rgb: 'rgb(153, 103, 50)', text:`Golden<br/> Brown`},
            { rgb: 'rgb(255, 212, 241)', text:`Pink`},
            { rgb: 'rgb(224, 189, 112)', text:`Light<br/> Gold`},
            { rgb: 'rgb(222, 172, 87)', text:`Gold`},
            { rgb: 'rgb(173, 181, 127)', text:`Light<br/> Green`},
            { rgb: 'rgb(55, 130, 117)', text:`Dark<br/> Green`},
            { rgb: 'rgb(170, 130, 179)', text:`Light<br/> Purple`},
            { rgb: 'rgb(127, 75, 128)', text:`Dark<br/> Purple`},
            { rgb: 'rgb(201, 157, 52)', text:`Yellow`},
            { rgb: 'rgb(227, 119, 48)', text:`Light<br/> Orange`},
            { rgb: 'rgb(157, 72, 41)', text:`Dark<br/> Orange`},
            { rgb: 'rgb(176, 42, 40)', text:`Red`},
            { rgb: 'rgb(188, 232, 230)', text:`Light<br/> Blue`},
            { rgb: 'rgb(132, 191, 209)', text:`Blue`},
            { rgb: 'rgb(8, 48, 97)', text:`Dark<br/> Blue`},
            { rgb: 'rgb(227, 214, 188)', text:`Beige`}
        ]

        colors.forEach((color, idx) => {
            const titleHtml = `
                <strong class="title ${idx === 0 && 'active'}"><span class="txt-wrap"><span class="txt font-e">${color.text}</span></span></strong>
            `
            const bgHtml = `
                <div class="bg ${idx === 0 && 'active'}" style="--bg-color: ${color.rgb}"></div>
            `
            const imgHtml = `
                <div class="tab-cont-wrap tab-cont${idx+1}">
                    <div id="color${idx+1}-1" class="con active">
                        <div class="img-box">
                            <img src="./assets/images/custom/custom${idx + 1}/img-capsule1.webp" alt="">
                        </div>
                    </div>
                    <div id="color${idx+1}-2" class="con">
                        <div class="img-box">
                            <img src="./assets/images/custom/custom${idx + 1}/img-capsule3.webp" alt="">
                        </div>
                    </div>
                    <div id="color${idx+1}-3" class="con">
                        <div class="img-box">
                            <img src="./assets/images/custom/custom${idx + 1}/img-capsule3.webp" alt="">
                        </div>
                    </div>
                </div>
            `
            const colorHtml = `
                <li class="color-item ${idx === 0 && 'active'}" style="--bg-color: ${color.rgb}">
                    <button class="btn btn-color" aria-label="color${idx + 1}"></button>
                </li>
            `

            $titleArea.append(titleHtml);
            $bgArea.append(bgHtml);
            $imgArea.append(imgHtml);
            $colorList.append(colorHtml);
        })
    },
    handleMenu: function() {
        const $btnMenu = $('.btn-hamburger');
        const $navNum = $('.nav-item .num');
        const $navTxt = $('.nav-item .txt');
        const $credit = $('.link-credit .txt:nth-child(1)');
        const $header = $('#header');
        $btnMenu.on('click', function() {
            $header.toggleClass('open');

            if ($header.hasClass('open')) {
                gsap.to('.menu', { autoAlpha: 1})
                Capsulin.fadeUp($navNum);
                Capsulin.fadeUp($navTxt);
                Capsulin.fadeUp($credit);
            } else {
                const tl = gsap.timeline()
                .add(Capsulin.fadeOut($navNum), '<')
                .add(Capsulin.fadeOut($navTxt), '<')
                .add(Capsulin.fadeOut($credit), '<')
                .to('.menu', { autoAlpha: 0})
            }
        })
    },
    handleMenuItem: function() {
        const $menuItem = $('.menu .nav-item');
        $menuItem.hover(function(e) {
            let t = e.currentTarget;
            gsap.to($menuItem, { duration: .3, opacity: 0.3})
            gsap.to(t, { duration: .3, opacity: 1})
        }, function() {
            gsap.to($menuItem, { duration: .3, opacity: 1})
        })
    },
    textMarquee: function() {
        const $marquee = $('.ani-marquee');
        const text = new SplitType('.ani-marquee .txt', { types: 'chars' })

        $marquee.each((idx, m) => {
            $(m).hover(function() {
                gsap.to($(this).find('.txt .char'), { yPercent: -100, stagger: { amount: 0.3} })
            }, function() {
                gsap.to($(this).find('.txt .char'), { yPercent: 0, stagger: { amount: 0.3} })
            })
        })
    },
    handleTab: function() {
        const $tabItem = $('.tab-list .tab-item');
        const $tabCont = $('.tab-cont');

        $tabItem.on('click', function() {
            let tabName = $(this).data('tab');
            $(this).addClass('active').siblings().removeClass('active');
            $(tabName).addClass('active').siblings().removeClass('active');
        })
    },
    handleCustomTab: function() {
        const $tabItem = $('.color .tab-item');
        const $colorItem = $('.color .color-item');

        $colorItem.on('click', function() {

        })
    },
    handleModal: function() {
        const btnModal = $('.btn-modal');

        btnModal.on('click', function() {
            $('.dimmed').addClass('active');
            $('.modal').toggleClass('modal-closed');
        });
        
        $('.dimmed').on('click', function() {
            $('.dimmed').removeClass('active');
            $('.modal').addClass('modal-closed');
        })
    },
    fadeUp: function(t, each) {
        let tween = gsap.fromTo(t, { yPercent: 100, stagger: { each: each ? each : 0}}, { yPercent: 0})
    },
    fadeOut: function(t, dir, each) {
        let tween = gsap.fromTo(t, { yPercent: 0, stagger: { each: each ? each : 0}}, { yPercent: () => {return dir < 0 ? 100 : -100}})
    },
    aniHeroEnter: function() {
        const tl = gsap.timeline()
        .fromTo('.sc-hero .img-box', { autoAlpha: 0, yPercent: -100}, { autoAlpha: 1, yPercent: 0})
        .fromTo('.sc-hero .title .char', { yPercent: 100}, { yPercent: 0, stagger: { amount: .3}}, '<')
        .fromTo('.sc-hero .scroll-down-area .txt', { yPercent: -100}, { yPercent: 0}, '<')
        .fromTo('.sc-hero .scroll-down-area .ico', { yPercent: -100}, { yPercent: 0}, '<')

        return tl;
    },
}

$(() => {
    Capsulin.init();
});
Enterprise = {
    init: function () {
        this.handleLang();
        this.scrollTop();
    },
    handleLang: function () {
        const navItem = $('#header .lang')
        const navLink = $('#header .lang > .link');
        const btnLang = navItem.find('li');
        navLink.on('click', function (e) {
            e.preventDefault();
            $(this).siblings().toggleClass('open');

            if ($(this).siblings().hasClass('open')) {
                $(this).attr('aria-expanded', true);
            } else {
                $(this).attr('aria-expanded', false);
            }
        })

        btnLang.on('click', function (e) {
            e.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
            if ($(this).hasClass('active')) {
                $(this).find('.link').attr('aria-selected', true);
                $(this).siblings().find('.link').attr('aria-selected', false);
            }
        })

        $(window).on('click', function(e) {
            if (!$(e.target).closest(navItem).length) {
                navLink.siblings().removeClass('open')
                navLink.attr('aria-expanded', false);
            }
        })
    },
    scrollTop: () => {
        $('.btn-top').on('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    }
}

$(() => {
    Enterprise.init();
});
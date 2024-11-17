Enterprise = {
    init: function () {
        this.handleLang();
    },
    handleLang: function () {
        const navItem = $('#header .lang')
        const navLink = navItem.find('.link');
        const btnLang = navItem.find('li');

        navLink.on('click', function (e) {
            e.preventDefault();
            $(this).siblings().toggleClass('open');
        })

        btnLang.on('click', function (e) {
            e.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
        })
    }
}

$(() => {
    Enterprise.init();
});
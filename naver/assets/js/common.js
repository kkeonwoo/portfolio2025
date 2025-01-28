Naver = {
    init: function() {
        this.handlePopup();
        this.handleSettingBtn();
    },
    handlePopup: function() {
        $settingBtn = $('.btn-setting');
        $modalSetting = $('.modal.modal-setting');
        flag = false;

        $settingBtn.on('click', function() {
            flag = true;
            $modalSetting.toggle();
            if ($modalSetting.is(':visible')) {
                $(this).attr('aria-expanded', true);
                $(this).attr('aria-pressed', true);
            } else {
                $(this).attr('aria-expanded', false);
                $(this).attr('aria-pressed', false);
            }
        })

        $(document).on('click', function (e) {
            if (!flag && !$(e.target).closest($modalSetting).length) {
                $modalSetting.hide();
                $settingBtn.attr('aria-expanded', false);
                $settingBtn.attr('aria-pressed', false);
            }
            flag = false;
        });
    },
    handleSettingBtn: function() {
        $fontBtn = $('.group-setting.font .btn-option');
        $themeBtn = $('.group-setting.theme .btn-option');

        $fontBtn.on('click', function(e) {
            handleToggle(e.currentTarget);

            if ($(this).hasClass('font-sm')) {
                $('html').addClass('font-sm');
                $('html').removeClass('font-lg');
            } else if ($(this).hasClass('font-lg')) {
                $('html').addClass('font-lg')
                $('html').removeClass('font-sm');
            } else {
                $('html').removeClass('font-sm');
                $('html').removeClass('font-lg');
            }
        })

        $themeBtn.on('click', function(e) {
            handleToggle(e.currentTarget);
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if ($(this).hasClass('theme-light')) {
                $('html').attr('data-dark', false);
            } else if ($(this).hasClass('theme-dark')) {
                $('html').attr('data-dark', true);
            } else {
                $('html').attr('data-dark', isDarkMode);
            }
        })

        function handleToggle(t) {
            $(t).addClass('active').siblings().removeClass('active');
            $(t).attr('aria-checked', true).siblings().attr('aria-checked', false);
        }
    },
}

$(() => {
    Naver.init();
});
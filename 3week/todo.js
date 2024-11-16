
$('.submit').click(function (e) {
    keyword = $('.text').val();
    if (keyword) {
        html = ` <li>
                    <span class="work">${keyword}</span>
                    <button class="end">끝</button>
                    <button class="wait">보류</button>
                    <button class="del">삭제</button>
                </li>`

        $('.list1').append(html);
        $('.text').val('').focus()
    }
});

$(document).on('click', '.del', function (e) {
    $(this).parent().remove();
});

$(document).on('click', '.end', function (e) {
    keyword = $(this).siblings('.work').text();
    html = ` <li>
                <span class="work">${keyword}</span>
                <button class="del">삭제</button>
            </li>`

    $('.list2').append(html);
    $(this).parent().remove();
});

$(document).on('click', '.wait', function (e) {
    keyword = $(this).siblings('.work').text();
    html = ` <li>
                <span class="work">${keyword}</span>
                <button class="end">끝</button>
                <button class="del">삭제</button>
            </li>`

    $('.list3').append(html);
    $(this).parent().remove();
});
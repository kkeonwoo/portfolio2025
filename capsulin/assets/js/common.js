Capsulin = {
    init: function () {
        this.customHTML();
    },
    customHTML: function() {
        const $titleArea = $('.color .title-area');
        const $imgArea = $('.color .img-area');
        const $colorList = $('.color .color-list');
        const colors = [ `Black`, `Dark<br/> Grey`, `Light<br/> Silver`, `Bronze`, `Golden<br/> Brown`, `Pink`, `Light<br/> Gold`, `Gold`, `Light<br/> Green`, `Dark<br/> Green`, `Light<br/> Purple`, `Dark<br/> Purple`, `Light<br/> Orange`, `Dark<br/> Orange`, `Red`, `Light<br/> Blue`, `Blue`, `Dark<br/> Blue`, `Beige`]

        colors.forEach((color, idx) => {
            const titleHtml = `
                <strong class="title"><span class="txt-wrap"><span class="txt">${color}</span></span></strong>
            `
            const imgHtml = `
                <div class="img-box">
                    <img src="./assets/images/custom${idx + 1}/img-capsule1.webp" alt="">
                    <img src="./assets/images/custom${idx + 1}/img-capsule2.webp" alt="">
                    <img src="./assets/images/custom${idx + 1}/img-capsule3.webp" alt="">
                </div>
            `
            const colorHtml = `
                <li class="color-item">
                    <button class="btn btn-color" aria-label="color${idx + 1}"></button>
                </li>
            `

            $titleArea.append(titleHtml);
            $imgArea.append(imgHtml);
            $colorList.append(colorHtml);
        })
    }
}

$(() => {
    Capsulin.init();
});
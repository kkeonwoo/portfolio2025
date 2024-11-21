gsap.registerPlugin(ScrollTrigger);

class DisableScroll extends Scrollbar.ScrollbarPlugin{
    static pluginName = 'DisableScroll'

    transformDelta(delta){
        delta['x'] = 0;

        return delta;
    }
}

Scrollbar.use(DisableScroll)

const container = document.querySelector('#main');
const options = {
    damping: 0.1,
    alwaysShowTracks: true,
};
const scrollbar = Scrollbar.init(container, {
    ...options,
});

scrollbar.track.xAxis.element.remove();

ScrollTrigger.scrollerProxy(container, {
    scrollTop(value) {
        if (arguments.length) {
        scrollbar.scrollTop = value; // setter
        }
        return scrollbar.scrollTop; // getter
    },
});

scrollbar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: container });

// 스크롤 위치 저장
window.addEventListener('beforeunload', () => {
    const scrollPosition = scrollbar.offset.y;
    sessionStorage.setItem('scrollPosition', scrollPosition);
});

// 스크롤 위치 복원
window.addEventListener('load', () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
        scrollbar.scrollTo(0, parseFloat(savedPosition), 0); // 애니메이션 없이 이동
    }
});

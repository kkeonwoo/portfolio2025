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
    delegateTo: document,
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
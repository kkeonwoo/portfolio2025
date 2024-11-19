
gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector('#main');
const options = {
    damping: 0.1,
    alwaysShowTracks: false,
}
const scrollbar = Scrollbar.init(container, {
    ...options
});

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
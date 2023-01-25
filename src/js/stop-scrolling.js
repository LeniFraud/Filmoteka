export const scroll = {
  disableScroll() {
    document.body.classList.add("stop-scrolling");
  },

  enableScroll() {
    document.body.classList.remove("stop-scrolling");
  },
};
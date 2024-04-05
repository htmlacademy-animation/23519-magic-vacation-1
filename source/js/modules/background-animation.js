export default class BackgroundAnimation {
  constructor() {
    this.SCREEN_IDS_WHERE_BACKGROUND_VISIBLE = ["prizes", "rules", "game"];
  }
  init(screenElements) {
    this.screenElements = screenElements;
    this.animationBackgroundElement = document.querySelector(
      ".animation-screen-background"
    );
  }

  animateIfNeeded(screenIndex, cb) {
    const currentScreen = this.screenElements[screenIndex];
    if (
      currentScreen &&
      this.SCREEN_IDS_WHERE_BACKGROUND_VISIBLE.includes(currentScreen.id)
    ) {
      this.animationBackgroundElement.classList.add("active");
    } else {
      this.animationBackgroundElement.classList.remove("active");
    }
    setTimeout(() => {
      cb();
    }, 600);
  }
}

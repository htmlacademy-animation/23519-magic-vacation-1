class AnimateText {
  constructor(elementSelector, classForActivate, property) {
    this._TIME_SPACE = 100;

    this._elementSelector = elementSelector;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 0;
    this._timeSpace = 20;
    this._everyThirdLetterDelay = 300;
    this._everySecondLetterDelay = 700;
    this._delay = 500;

    this.prePareText();
  }

  createElement(letter, index) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.classList.add(`animate-text-letter`);
    const isThridLetter = index !== 0 && (index + 1) % 3 === 0;
    let delay = index % 2 === 0 ? this._everySecondLetterDelay : this._delay;

    if (isThridLetter) {
      delay = this._everyThirdLetterDelay;
    }

    span.style.transition = `${this._property} ${delay}ms ease ${this._timeOffset}ms`;

    this._timeOffset += this._timeSpace;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent
      .trim()
      .split(` `)
      .filter((latter) => latter !== "");

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, latter, index) => {
        fragment.appendChild(this.createElement(latter, index));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`animate-text-word`);
      wordContainer.appendChild(wordElement);
      const spacer = document.createElement(`span`);
      spacer.classList.add(`animate-text-space`);
      spacer.textContent = " ";

      wordContainer.appendChild(spacer);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
export default () => {
  const titles = [
    ".intro__title",
    ".intro__date",
    ".slider__item-title",
    ".prizes__title",
    ".rules__title",
    ".game__title",
  ];

  titles.forEach((selector) => {
    new AnimateText(selector, `active`, `transform`);
  });
};

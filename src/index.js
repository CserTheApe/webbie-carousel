import Template from "./template.js";

export default class WebbieCarousel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return [
      "gap",
      "text",
      "text-style",
      "subtext",
      "subtext-style",
      "container-style",
      "arrow-color",
      "button-color",
      "button-width",
      "arrow-size",
      "button-opacity",
      "hover-opacity",
      "click-opacity",
    ];
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    this.render();
  }

  render() {
    const gap = this.getAttribute("gap");
    const title = this.getAttribute("text");
    const titleStyle = this.getAttribute("text-style");
    const subText = this.getAttribute("subtext");
    const subTextStyle = this.getAttribute("subtext-style");
    const rootStyle = this.getAttribute("container-style");
    const arrowColor = this.getAttribute("arrow-color");
    const buttonColor = this.getAttribute("button-color");
    const buttonWidth = this.getAttribute("button-width");
    const arrowSize = this.getAttribute("arrow-size");
    const buttonOpacity = Number(this.getAttribute("button-opacity"));
    const hoverOpacity = Number(this.getAttribute("hover-opacity"));
    const clickOpacity = Number(this.getAttribute("click-opacity"));

    this.shadowRoot.innerHTML = Template.render({
      html: {
        title,
        rootStyle,
        titleStyle,
        subText,
        subTextStyle,
      },
      css: {
        gap,
        arrowColor,
        buttonColor,
        buttonWidth,
        arrowSize,
        buttonOpacity: buttonOpacity ? this.numerify(buttonOpacity, 1) : 0.5,
        hoverOpacity: hoverOpacity ? this.numerify(hoverOpacity, 1) : 0.8,
        clickOpacity: clickOpacity ? this.numerify(clickOpacity, 1) : 1,
      },
    });

    this.scrollDiv = this.shadowRoot.getElementById("scroller");
    this.buttonLeft = this.shadowRoot.getElementById("slideprev");
    this.buttonRight = this.shadowRoot.getElementById("slidenext");

    this.checkScrollButtons();

    this.scrollDiv.addEventListener("scroll", (e) => {
      this.checkScrollButtons();
    });
    this.scrollDiv.addEventListener("slotchange", (e) => {
      this.checkScrollButtons();
    });

    this.shadowRoot
      .getElementById("slidenext")
      .addEventListener("click", (e) => {
        this.scrollDiv.scrollBy({
          left: this.getScrollLength(),
          behavior: "smooth",
        });
      });

    this.shadowRoot
      .getElementById("slideprev")
      .addEventListener("click", (e) => {
        this.scrollDiv.scrollBy({
          left: -this.getScrollLength(),
          behavior: "smooth",
        });
      });
  }

  getScrollLength() {
    return 0.8 * this.scrollDiv.clientWidth;
  }

  checkScrollButtons() {
    let totalWidth = this.scrollDiv.scrollWidth;
    let posLeft = this.scrollDiv.scrollLeft;
    let posRight = this.scrollDiv.clientWidth + posLeft;

    if (posLeft < 5) {
      this.buttonLeft.disabled = true;
    } else {
      this.buttonLeft.disabled = false;
    }
    if (Math.abs(totalWidth - posRight) < 5) {
      this.buttonRight.disabled = true;
    } else {
      this.buttonRight.disabled = false;
    }
  }

  numerify(value, max) {
    return Math.max(Math.min(value, max), 0);
  }
}

if (!customElements.get("webbie-carousel")) {
  customElements.define("webbie-carousel", WebbieCarousel);
}

import Template from "./template.js";

export default class WebbieCarousel extends HTMLElement {
  constructor() {
    super();

    const gap = this.getAttribute("gap");
    const title = this.getAttribute("title");
    const titleStyle = this.getAttribute("title-style");
    const subText = this.getAttribute("subtext");
    const subTextStyle = this.getAttribute("subtext-style");
    const rootStyle = this.getAttribute("container-style");
    const arrowColor = this.getAttribute("arrow-color");
    const buttonColor = this.getAttribute("button-color");
    const buttonWidth = this.getAttribute("button-width");
    const arrowSize = this.getAttribute("arrow-size");

    this.attachShadow({ mode: "open" });

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
}

if (!customElements.get("webbie-carousel")) {
  customElements.define("webbie-carousel", WebbieCarousel);
}

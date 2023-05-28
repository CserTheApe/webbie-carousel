export default {
  render(props) {
    return `
        ${this.css(props.css)}
        ${this.html(props.html)}
        `;
  },

  html(prop) {
    return `
        <div id="container" ${
          prop.rootStyle ? `style="${prop.rootStyle}"` : ""
        }>
            ${
              prop.title
                ? `<h2 ${prop.titleStyle ? `style="${prop.titleStyle}"` : ""}>${
                    prop.title
                  }</h2>`
                : ""
            }
            ${
              prop.subText
                ? `<p ${
                    prop.subTextStyle ? `style="${prop.subTextStyle}"` : ""
                  }>${prop.subText}</p>`
                : ""
            }
            <div id="carousel">
                <button class="slider" id="slideprev">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="slider" id="slidenext">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <div id="scroller">
                <slot></slot>
                </div>
            </div>
        </div>
        `;
  },

  css(prop) {
    return `
    <style>
        #container {
            padding: 16px;
        }
        h2 {
            margin-top: 5px;
        }
        #carousel {
            position: relative;
        }
        #scroller {
            display: flex;
            overflow: auto;
            white-space: nowrap;
            scrollbar-width: none;
            -ms-overflow-style: none;
            gap: ${prop.gap ? prop.gap : "10px"};
            margin: 0;
            padding: 0;
        }
        #scroller::-webkit-scrollbar {
            display: none;
        }
        ::slotted(*) {
            flex-shrink: 0;
        }


        .slider {
            position: absolute;
            width: ${prop.buttonWidth ? prop.buttonWidth : "50px"};
            height: auto;
            top: 0;
            bottom: 0;
            margin: auto 0;
            border: none;
            padding: 0;
            background: none;
            cursor: pointer;
            opacity: ${prop.buttonOpacity};
            background-color: ${
              prop.buttonColor ? prop.buttonColor : "#cccccc"
            };
        }
        .slider:hover {
            opacity: ${prop.hoverOpacity};
        }
        .slider:active {
            opacity: ${prop.clickOpacity};
        }
        .slider:disabled {
            display: none;
        }
        .slider svg {
            stroke: ${prop.arrowColor ? prop.arrowColor : "#555555"};
            width: ${prop.arrowSize ? prop.arrowSize : "50px"};
            height: ${prop.arrowSize ? prop.arrowSize : "50px"};
        }

        #slidenext {
            right: 0;
        }
        #slideprev {
            left: 0;
        }

    </style>
    `;
  },
};

# webbie-carousel [![NPM version](https://img.shields.io/npm/v/webbie-carousel.svg?style=flat)](https://www.npmjs.com/package/webbie-carousel) [![NPM monthly downloads](https://img.shields.io/npm/dm/webbie-carousel.svg?style=flat)](https://npmjs.org/package/webbie-carousel) [![NPM total downloads](https://img.shields.io/npm/dt/webbie-carousel.svg?style=flat)](https://npmjs.org/package/webbie-carousel)

A web component carousel to display your data in a horizontal scrollable container. It is meant to display an array of data in a homogeneous format such as cards, like the sliders used in Netflix or search result cards on mobile.

---

## Install

Install with npm: `npm install webbie-carousel`

---

## Usage

Add script to page with `<script type="module" src="path/to/dist/main.js"></script>`

```html
<cwc-carousel>
    --- Array of Content ---
</cwc-carousel>
```

---

## Props

All props are optional. The carousel height is set by the height of its content.

| Name | Description |
| ---- | ----------- |
| title | add a title to the carousel |
| subtext | additional text underneath the title |
| title-style | custom css for the title |
| subtext-style | css for the subtext |
| container-style | css for the carousel container |
| gap | customize gap between content (default: 10px) |
| button-color | custom color for the slider buttons (default: #cccccc) |
| button-width | custom width for the buttons (default: 40px) |
| arrow-color | custom color for the slider button arrows (default: #555555) |
| arrow-size | custom size for the arrows (default: 40px) |

---

Further examples in `demo.html`
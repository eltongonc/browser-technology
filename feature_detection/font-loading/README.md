# Font loading API

The `FontFace` Javascript API feature allows user to load fonts via Javascript. After the font is done loading it can be appended to an element directly via Javascript.
This is an alternative of `@font-face`

```javascript
const font = new FontFace('name_of_font', 'url(linkToFont.woff)');
// Add the FontFace to the FontFaceSet
document.fonts.add(font);

// Load the FontFace
raleway.load();

// Wait until the font is done loading to append it to an element.
raleway.loaded.then((fontFace) => {
    // Add a class to the body element
    document.querySelector('article').classList.add('loaded-body-font');
}, (fontFace) => {
    console.error('Current status', raleway.status);
});
```

### Fallback
Because the fonts are loaded async a default font will be loaded, if `FontFace` is not supported.

### Browser that can use it
This is a features is supported by most browsers. It is not supported by Opera mini.

| IE & Edge             | Firefox, Chrome and Safari| Mobile      |
|-----------------------|---------------------------|-------------|
|Not supported          |Fully supported            |Not supported|

### Live demo
[Link to the example](https://eltongonc.github.io/browser-technology/feature_detection/drag-and-drop)

### Sources

- [Article on Medium about Font loading - 4 min read](https://medium.com/@matuzo/getting-started-with-css-font-loading-e24e7ffaa791#.m7n35ysx7)

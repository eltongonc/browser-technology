# HTML5 Detail tag

The CSS `position:sticky` feature is a hybrid of the `position:relative` and `position:fixed`. When an element hits the user-defined position it will turn into a fixed position.

```CSS
    element {
        position: -webkit-sticky;
        position: sticky;
        top: 10px /*when it hits the top 10px it will turn into position fixed*/
    }
```
### Fallback
CSS skips a rule if the browser doesn't support it and fallback onto the default position, which is `static`

- [Hammer.js](http://hammerjs.github.io/)
- [Interact.js](http://interactjs.io/)


### Browser that can use it
This is a features is supported by most browsers. It is not supported on mobile browser because of the way mobile touch events work.

| IE & Edge             | Firefox & Chrome| Safari             | Mobile      |
|-----------------------|-----------------|--------------------|-------------|
|Not supported          |Fully supported  |Partial with prefix |Not supported|

### Live demo
[Link to the example](https://eltongonc.github.io/browser-technology/feature_detection/sticky-position)

***
### Sources
- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning)

# Sticky Position

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


### Browser that can use it
This is a features is supported by most browsers. It is not supported on all mobile browser by default.

| IE & Edge             | Firefox & Chrome| Safari             | Mobile      |
|-----------------------|-----------------|--------------------|-------------|
|Not supported          |Fully supported  |Partial with prefix |Partially    |

### Live demo
[Link to the example](https://eltongonc.github.io/browser-technology/feature_detection/sticky-position)

***
### Sources
- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning)

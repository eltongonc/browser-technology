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
![support](support.png)

This features is not supported by most browsers. Event recent versions of browsers like Safari needs a prefix in oder for it to work.


| IE & Edge             | Firefox & Chrome| Safari             | Mobile      |
|-----------------------|-----------------|--------------------|-------------|
|Not supported          |Fully supported  |Partial with prefix |Partially    |

### Known Issues
- Chrome, Firefox and Safari 7 & below do not appear to support sticky table headers.
- A parent with overflow set to auto will prevent position: sticky from working in Safari

### Conclusion
using this feature can't do no harm. The fallback is always the default browser behavior, if the browser doesn't support it.

### Live demo
[Link to the example](https://eltongonc.github.io/browser-technology/feature_detection/sticky-position)

***
### Sources
- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning)
- - [Can I Use](http://caniuse.com/#search=position)

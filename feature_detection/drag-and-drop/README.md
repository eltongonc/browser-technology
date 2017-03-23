# HTML5 Detail tag

The `DragEvent` Javascript feature allows user to drag and drop content from one place to another.

```Javascript
element.addEventListener("dragstart",function(e){
    // Set the format of the data
    e.dataTransfer.setData("text/html", e.target.id);
    e.dataTransfer.setData("text/plain", e.target.id);
});

// Triggers whenever an element is above the dropzone
dropZoneElement.addEventListener("dragover", function(e){
    e.preventDefault();
    // Set the dropEffect to move. I am not sure what it does. I think it changes the cursor
    e.dataTransfer.dropEffect = "move";
});
// Triggers whenever an element is dropped in the dropzone
dropZoneElement.addEventListener("drop", function(e){
    e.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = e.dataTransfer.getData("text");
    this.appendChild(document.getElementById(data));
});
```
### Fallback
There is currently no default browser fallback. To use the drag and drop feature on a mobile use one of these js-libraries:

- [Hammer.js](http://hammerjs.github.io/)
- [Interact.js](http://interactjs.io/)


### Browser that can use it
This is a features is supported by most browsers. It is not supported on mobile browser because of the way mobile touch events work.

| IE & Edge             | Firefox, Chrome and Safari| Mobile      |
|-----------------------|---------------------------|-------------|
|Partially supported    |Fully supported            |Not supported|

### Live demo
I made an example that will show the snapping in action on the browsers that support. If the browser doesn't support it the sections will be expanded.


View the difference on Firefox and Chrome
[Link to the example](https://eltongonc.github.io/browser-technology/feature_detection/drag-and-drop)

***
### Sources

- Idea from Chanel Mepschen;
- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

'use strict';

function UserInput(type, query) {
    "user strict";

    // let query = objectToQuery(options).toLowerCase();

    console.log(query);

    var newLink = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/' + API._KEY + '/?type=' + type + '&zo=/' + query + '&page=1&pagesize=25';

    console.log(newLink);
    return {
        value: GetData(newLink)
    };
}

var user = {
    submitButton: document.querySelector('footer button'),
    pElements: document.querySelectorAll('aside section p'),
    dropZones: document.querySelectorAll('.drop-zone'),
    inputs: function inputs() {
        return document.querySelectorAll('main section p');
    }
};

// the elements that can be dragged and droppped
user.pElements.forEach(function (p) {
    p.addEventListener("dragstart", function (e) {
        // src: Chanel Mepchen;
        // src: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
        console.log("drag start");
        // Add the target element's id to the data transfer object
        e.dataTransfer.setData("text/html", e.target.id);
        e.dataTransfer.setData("text/plain", e.target.id);
    });
});

// The dropzone for the drag and drop
user.dropZones.forEach(function (item) {
    item.addEventListener("dragover", function (e) {
        e.preventDefault();
        // Set the dropEffect to move. I am not sure what it does. I think it changes the cursor
        e.dataTransfer.dropEffect = "move";
    });

    item.addEventListener("drop", function (e) {
        e.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        var data = e.dataTransfer.getData("text");
        this.appendChild(document.getElementById(data));

        updateInput();
    });
});

user.submitButton.addEventListener("click", function () {
    updateInput();
});

function updateInput() {
    var sortedInputs = htmlCollectionToArray(user.inputs()).sort();

    UserInput("koop", arrayToQuery(sortedInputs));
}

function arrayToQuery(array) {
    var query = array.reduce(function (total, current) {
        return total + makeUrlFriendly(current);
    }, '');
    return query;
}

function makeUrlFriendly(uglyItem) {
    return uglyItem.toLowerCase() + "/";
}

function htmlCollectionToArray(array) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
        newArray.push(convertToString(array[i]));
    }
    return newArray;
}

function convertToString(item) {
    return item.id || item.innerHTML;
}
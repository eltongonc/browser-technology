'use strict';

function UserInput(query) {
    console.log(query);
    var newLink = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/' + API._KEY + '/?type=' + localStorage.type + '&zo=/' + query + '&page=1&pagesize=25';
}

var user = {
    submitButton: document.querySelector('footer button'),
    dragElements: document.querySelectorAll('aside section p'),
    dropZones: document.querySelectorAll('.drop-zone'),
    inputs: function inputs() {
        return document.querySelectorAll('#stap3 section > section.drop-zone p');
    }
};

// the elements that can be dragged and droppped
user.dragElements.forEach(function (p) {
    p.addEventListener("dragstart", function (e) {
        // src: Idea from Chanel Mepschen;
        // src: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
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

        // update the list of elements when it is dropped;

        var query = arrayToQuery(updateInput());

        localStorage.setItem("options", query);
    });
});

function saveQueryLocaly(query) {
    if (query !== undefined) {
        localStorage.setItem("type", query.type);
        localStorage.setItem("query", query.query + "/");
    }
}

function loadQuery() {
    return {
        type: localStorage.type,
        query: localStorage.query,
        kamers: localStorage.kamers,
        options: localStorage.options
    };
}

function updateInput() {
    return htmlCollectionToArray(user.inputs());
}

function htmlCollectionToArray(htmlArray) {
    var normalArray = [];
    //  loop through htmlarray and convert it to a regular item
    for (var i = 0; i < htmlArray.length; i++) {
        normalArray.push(htmlArray[i].value || htmlArray[i].id);
    }
    return normalArray.sort();
}

function arrayToQuery(array) {
    // merge the array items together
    var query = array.reduce(function (total, current) {
        return total + makeUrlFriendly(current);
    }, '');
    return query;
}
function makeUrlFriendly(uglyItem) {
    return uglyItem.toString().toLowerCase() + "/";
}

function mergeQueries(newQuery) {
    if (localStorage.query) {
        var oldQuery = localStorage.query;
        // saveQueryLocaly(oldQuery + newQuery)
        localStorage.setItem("query", oldQuery + newQuery);
        return oldQuery + newQuery;
    } else {
        // saveQueryLocaly(newQuery);
        localStorage.setItem("query", newQuery);
        return newQuery;
    }
}

function callAPI(type, query) {
    var newLink = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/' + API._KEY + '/?type=' + type + '&zo=/' + query + '&page=1&pagesize=25';

    apiCall.getData(newLink);
    return { type: type, query: query };
}

function getDetails(type, id) {
    var newLink = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/' + API._KEY + '/' + type + '/' + id + '/';
    return apiCall.getData(newLink);
}

function mapData(data) {
    getMapInfo(data);
}

function createRange(array, name) {
    array.sort();
    if (array.length == 1) {
        // return a number with an - or + separator
        return '' + array[0] + (array[0] == 1 ? "-" : "+") + (array[0] == 1 ? name : name + "s");
    } else {
        // returns 1-2kamers
        return array[0] + '-' + array[1] + '-' + name + 's';
    }
}
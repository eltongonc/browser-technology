
/*******************
** step 1??
*******************/
//  A function to append a callback to an script
// src: Merlijn Vos
function JSONP(url, callback) {
	let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

    const script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName
    document.body.appendChild(script);

	self[callbackName] = function (data) {
		delete self[callbackName];
		document.body.removeChild(script);
		callback(data);
	};
}

/*******************
** step 2??
*******************/
function UserInput(query) {
    console.log(query);
    var newLink = `http://funda.kyrandia.nl/feeds/Aanbod.svc/json/${API._KEY}/?type=${localStorage.type}&zo=/${query}&page=1&pagesize=25`;
}

let user = {
    submitButton: document.querySelector('footer button'),
    dragElements : document.querySelectorAll('aside section p'),
    dropZones : document.querySelectorAll('.drop-zone'),
    inputs(){ return document.querySelectorAll('#stap3 section > section.drop-zone p')},
};

// the elements that can be dragged and droppped
user.dragElements.forEach(function(p){
    p.addEventListener("dragstart",function(e){
        // src: Idea from Chanel Mepschen;
        // src: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
        // Add the target element's id to the data transfer object
        e.dataTransfer.setData("text/html", e.target.id);
        e.dataTransfer.setData("text/plain", e.target.id);
    });
});

// The dropzone for the drag and drop
user.dropZones.forEach(function(item){
    item.addEventListener("dragover", function(e){
        e.preventDefault();
        // Set the dropEffect to move. I am not sure what it does. I think it changes the cursor
        e.dataTransfer.dropEffect = "move";
    });

    item.addEventListener("drop", function(e){
        e.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        var data = e.dataTransfer.getData("text");
        this.appendChild(document.getElementById(data));

        // update the list of elements when it is dropped;

        var query = arrayToQuery(updateInput());

        localStorage.setItem("options", query);
    });
});



function saveQueryLocaly(query){
    if (query !== undefined) {
            localStorage.setItem("type", query.type);
            localStorage.setItem("query", query.query+"/");
    }
}

function loadQuery(){
        return {
            type: localStorage.type,
            query: localStorage.query,
            kamers: localStorage.kamers,
            options: localStorage.options,
        };
}

function updateInput(){
    return htmlCollectionToArray(user.inputs());
}

function htmlCollectionToArray(htmlArray){
    let normalArray = [];
    //  loop through htmlarray and convert it to a regular item
    for (var i = 0; i < htmlArray.length; i++) {
        normalArray.push(htmlArray[i].value || htmlArray[i].id);
    }
    return normalArray.sort();
}



function arrayToQuery(array){
    // merge the array items together
    let query = array.reduce(function(total, current){
        return total + makeUrlFriendly(current);
    }, '');
    return query;
}
function makeUrlFriendly(uglyItem){
    return uglyItem.toString().toLowerCase() + "/";
}


function mergeQueries(newQuery){
    if (localStorage.query) {
        let oldQuery = localStorage.query;
        // saveQueryLocaly(oldQuery + newQuery)
        localStorage.setItem("query", oldQuery + newQuery);
        return oldQuery + newQuery;
    }else {
        // saveQueryLocaly(newQuery);
        localStorage.setItem("query", newQuery);
        return newQuery;
    }

}


function callAPI(type, query){
    let newLink = `http://funda.kyrandia.nl/feeds/Aanbod.svc/json/${API._KEY}/?type=${type}&zo=/${query}&page=1&pagesize=25`;

    apiCall.getData(newLink);
    return {type:type, query:query};
}

function getDetails(type, id){
    let newLink =
    `http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/${API._KEY}/${type}/${id}/`;
    return apiCall.getData(newLink);
}

function mapData(data){
    getMapInfo(data);
}

function createRange(array, name){
    array.sort();
    if (array.length == 1) {
        // return a number with an - or + separator
        return `${array[0]}${array[0] == 1? "-":"+"}${array[0] == 1? name: name+"s"}`;
    }else {
        // returns 1-2kamers
        return `${array[0]}-${array[1]}-${name}s`;
    }
}

/******************
** map
******************/
let map = {
    markCurrentPosition(radius){
         return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: 0.2,
          scale: radius * (Math.PI * 2),
          strokeColor: 'white',
          strokeWeight: 0.5
        };
    },

    createMarkers(map, data){
        document.body.insertAdjacentHTML('afterbegin', '<div id="marker-tooltip"></div>')

        data.points.map(function(point){
            // generate a marke based on the current location
            let marker = new google.maps.Marker({
              position: {lat: point.y, lng: point.x},
              map: map,
              title: point.adr
            });

            let tooltip = document.querySelector('#marker-tooltip');

            google.maps.event.addListener(marker, 'mouseover', function() {
                tooltip.classList.add("hover");
                tooltip.style.bottom = marker.position.lng()/100+"em";
                tooltip.style.right = marker.position.lat()/100+"em";
                tooltip.innerHTML = this.title;
            });

            google.maps.event.addListener(marker, 'mouseout', function() {
                tooltip.classList.remove("hover");
            });
        });
    }
};


let getMapInfo = function(data){

    JSONP(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBqq4g0UQwjj8oxGM96cxfxFhZbguCB7-c`, function(){

        if (!localStorage.map && ("geolocation" in navigator)) {
            // generate the google map
            navigator.geolocation.getCurrentPosition(function(position) {
                // set the current location as a marker on the map
                var currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude};

                // asigning the google map
                var googleMap = new google.maps.Map(document.getElementById('googleMap'), {
                    zoom: 5,
                    center: currentPosition
                });
                // generate a marke based on the current location
                var marker = new google.maps.Marker({
                    position: currentPosition,
                    icon: map.markCurrentPosition(5),
                    map: googleMap
                });

                // the timeout delays the amount calls
                // src: http://stackoverflow.com/questions/36874032/google-map-how-to-fix-over-query-limit-error
                var timeout = 0;
                data.Objects.forEach(function(item){
                    timeout = timeout + 1000;
                    setTimeout(function() {
                      markerFromAddress(item);
                    }, timeout);
                });



                function markerFromAddress(item) {
                    var geocoder = new google.maps.Geocoder();

                  geocoder.geocode( { 'address': item.Postcode+" "+item.Woonplaats}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                      var marker = new google.maps.Marker({
                          map: googleMap,
                          position: results[0].geometry.location,
                          title: item.Adres
                      });
                    } else {
                      console.log('Geocode was not successful for the following reason: ' + status);
                    }
                  });
                }

                if (localStorage.getItem("locationData")) {
                    createMarkers(googleMap, JSON.parse(localStorage.getItem("locationData")));
                }
            });
        }else {
            localStorage.setItem("map", JSON.stringify(data));
        }
    });
};

/******************
** get Data
******************/
let apiCall = {
    data: localStorage.data || "",
    getData(url){
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = function(){
            if (req.readyState === XMLHttpRequest.DONE && (req.status >= 200 && req.status < 400)){
                // turns de response in a object
                let response = JSON.parse(req.responseText);
                // save the current data in the localStorage
                // save(response);
                apiCall.response.show(response);
                return response;
            }
        };
        // Show the error if there is no connection
        req.onerror = function(err) {
            // helpers.alert.add("There was an error loading the data")
        };
        req.send();
    },
    response: {
        // Save it to localStorage
        save(data){
            localStorage.setItem("data", JSON.stringify(data));
            return data;
        },

        // Show in the html
        show(data){
            createContent(data, "#entry-template",'#content');
            this.save(data);
        }
    }
};

let GetData = (url) => {
    "user strict";

    let data;

    let getList = (function(){
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = function(){
            if (req.readyState === XMLHttpRequest.DONE && (req.status >= 200 && req.status < 400)){
                // turns de response in a object
                let response = JSON.parse(req.responseText);
                // save the current data in the localStorage
                // save(response);
                show(response);
            }
        };
        // Show the error if there is no connection
        req.onerror = function(err) {
            // helpers.alert.add("There was an error loading the data")
        };
        req.send();
    })();

    // Save it to localStorage
    function save(data){
        localStorage.setItem("data", JSON.stringify(data));

        return data;
    }

    // Show in the html
    function show(data){
        createContent(data, "#entry-template",'#content');
        save(data);
    }

    return {
        data: data
    };
};

/******************
** Create content
******************/
var createContent = function(data, htmlInput, htmlOutput){
    // Handlebars selection
    let source = document.querySelector(htmlInput).innerHTML;
    let template = Handlebars.compile(source);
    let context = data;
    document.querySelector(htmlOutput).innerHTML = template(context);
};

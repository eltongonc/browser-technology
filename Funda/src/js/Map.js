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

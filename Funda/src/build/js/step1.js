'use strict';

// let searchLocation = function(query){
//     JSONP(`http://mt1.funda.nl/maptiledata.ashx?z=7&x=66&y=42&zo=${query}`, function(data){
//         console.log(data);
//         localStorage.setItem("locationData", JSON.stringify(data));
//     });
// };

//  A function to append a callback to an script
// src: Merlijn Vos
function JSONP(url, callback) {
	var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

	var script = document.createElement('script');
	script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
	document.body.appendChild(script);

	self[callbackName] = function (data) {
		delete self[callbackName];
		document.body.removeChild(script);
		callback(data);
	};
}
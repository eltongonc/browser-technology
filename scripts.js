var sounds = {
    claps: audioGenerator("/sounds/Claps/Claps09.wav"),
    eights1: "/sounds/808/808.wav",
    eights2: "/sounds/808/80803.wav",
    hats: "/sounds/Hats/Hats08.wav",
    kicks: "/sounds/Kick/Kick10.wav",
    triangle: "/sounds/Perc/Triangle.wav",
    snare1: "/sounds/Snare/Snare04.wav",
    snare2: "/sounds/Snare/Snare15.wav",
    snare2: "/sounds/Snare/Snare15.wav"
};
//
//
function audioGenerator(url){
    return new Audio(url);
}
//
// console.log(sounds.claps);
//
//
var buttons = (function(){
    var elements = document.querySelectorAll('button');
    elements.forEach(function(button){
        button.addEventListener("click", callback);
    });

    return {
        elements: elements
    };
})();
//
window.addEventListener("keyup", function(event){
    var id = event.key.toUpperCase();
    console.log(event);
    if (event.code !== "Space" && document.querySelector("."+id)) {
        var audio = new  Audio(document.querySelector("."+id).id);
        audio.play();
    }
});

//
function callback(event){
    audio.play();
    console.log(event);
}

// IE fix
// Fallback
// var inputs = document.querySelectorAll('a');
//
// for (var i = 0; i < inputs.length; i++) {
//     addEvent(inputs[i], "click", function(e){
//         e.preventDefault();
//         var audio = new  Audio(inputs[i].id);
//         audio.play();
//     });
// }

// src: http://stackoverflow.com/questions/6927637/addeventlistener-in-internet-explorer
// function addEvent(element, event, callback) {
//     if (element.addEventListener){  // W3C DOM
//         element.addEventListener(event,callback,false);}
//     else if (element.attachEvent) { // IE DOM
//         element.attachEvent("on"+event, callback);}
//     else { // No much to do
//         element[event] = callback;}
// }

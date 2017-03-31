/****
**  Author: Elton Goncalves Gomes
**  Description: This code is to
*****/
var interval;
var audio = {
    elements: document.getElementsByTagName('audio'),
    recording: true,
    recorded: []
};

var controls = {
    keyboard: (function(){
        window.addEventListener("keydown", function(event){
            var id = event.key.toUpperCase();
            if (event.code !== "Space" && document.getElementById(id)) {
                var src = document.getElementById(id);
                var newAudio = new Audio( src.children[1].src);
                newAudio.play();
                src.parentNode.classList.add("active");
            }
        });
        window.addEventListener("keyup", function(event){
            var id = event.key.toUpperCase();
            if (event.code !== "Space" && document.getElementById(id)) {
                var src = document.getElementById(id);
                src.parentNode.classList.remove("active");
            }
        });
    }()),
    mouse: (function(){
        // Start recording
        addEvent(document.querySelector('#record'), "click", function(){
            // toggle true or false
            input.toggleRecord();
            input.togglePlay(audio.recording,this);
        });
        // click mode switch. Select mode or play mode
        addEvent(window, "mousedown", function(e){
            if (e.target.localName === "label" && audio.recording === false) {
                var src = e.target.parentNode.children[2].children[1];
                var newAudio = new Audio(src.src);
                newAudio.play();
                src.parentNode.parentNode.classList.add("active");
            }
        });
        addEvent(window, "mouseup", function(e){
            if (e.target.localName === "label" && audio.recording === false) {
                var src = e.target.parentNode.children[2].children[1];
                src.parentNode.parentNode.classList.remove("active");
            }
        });
    }())
};

var input = {
    checkboxes: document.querySelectorAll('input'),
    getUservalues: function(){
        var checked = document.querySelectorAll('input:checked');
        var values = [];
        for (var i = 0; i < checked.length; i++) {
            values[i] = {
                name:checked[i].name,
                checked: checked[i].checked,
                correspondingAudio:/*got to label and then to the audio element*/ checked[i].parentNode.children[checked[i].parentNode.children.length - 1]
            };
        }
        return values;
    },
    togglePlay: function(value, button){
        button.classList.toggle("play");
        if (value === true) {
            input.getUservalues();
            metronome();
        }else {
            clearInterval(interval);
        }
    },
    toggleRecord: function(){
        audio.recording = !audio.recording;
        console.log(audio.recording);
        //TODO: Place it somewhere else
        for (var i = 0; i < input.checkboxes.length; i++) {
            if (audio.recording === false) {
                    input.checkboxes[i].checked = false;
                    input.checkboxes[i].disabled = true;
            }else {
                input.checkboxes[i].disabled = false;
            }
        }
    }
};

// Start
input.toggleRecord();

// addEventListener prefix http://stackoverflow.com/questions/6927637/addeventlistener-in-internet-explorer
function addEvent(element, event, callback) {
    if (element.addEventListener){  // Normal way
        element.addEventListener(event,callback,false);}
    else if (element.attachEvent) { // IE way
        element.attachEvent("on"+event, callback);}
    else { // Rest
        element[event] = callback;}
}

// This functions makes sure the user has guide
function metronome(){
    interval = setInterval( function(){
        input.getUservalues().forEach(function(item){
            item.correspondingAudio.play();
            // item.correspondingAudio.pause();
            // item.correspondingAudio.currentTime = 0;
        });
    }, 500);
}

// document.write(new Audio());

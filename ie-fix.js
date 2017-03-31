// /****
// **  Author: Elton Goncalves Gomes
// **  Description: This code is to
// *****/
//
//
// // var interval;
// // var audios = {
// //     elements: document.getElementsByTagName('audio'),
// //     recording: false,
// //     recorded: []
// // };
// (function (fallback) {
//
//     fallback = fallback || function () { };
//
//     // function to trap most of the console functions from the FireBug Console API.
//     var trap = function () {
//         // create an Array from the arguments Object
//         var args = Array.prototype.slice.call(arguments);
//         // console.raw captures the raw args, without converting toString
//         console.raw.push(args);
//         var message = args.join(' ');
//         console.messages.push(message);
//         fallback(message);
//     };
//
//     // redefine console
//     if (typeof console === 'undefined') {
//         console = {
//             messages: [],
//             raw: [],
//             dump: function() { return console.messages.join('\n'); },
//             log: trap,
//             debug: trap,
//             info: trap,
//             warn: trap,
//             error: trap,
//             assert: trap,
//             clear: function() {
//                   console.messages.length = 0;
//                   console.raw.length = 0 ;
//             },
//             dir: trap,
//             dirxml: trap,
//             trace: trap,
//             group: trap,
//             groupCollapsed: trap,
//             groupEnd: trap,
//             time: trap,
//             timeEnd: trap,
//             timeStamp: trap,
//             profile: trap,
//             profileEnd: trap,
//             count: trap,
//             exception: trap,
//             table: trap
//         };
//     }
//
// })(console);
// //
// var id;
// addEvent(document, "keydown", function(event){
//     id = event;
//     // log(id);
//     // if (event.code !== "Space" && document.getElementById(id)) {
//     //     var audio = document.getElementById(id);
//     //     // var newAudio = new Audio(audio.src);
//     //     alert(audio);
//     //     audio.play();
//     //     // audio.parentNode.classList.add("active");
//     // }
// });
// // addEvent(window, "keyup", function(event){
// //     var id = event.key.toUpperCase();
// //     if (event.code !== "Space" && document.getElementById(id)) {
// //         var audio = document.getElementById(id);
// //         // var audio = new  Audio(document.querySelector("."+id).src);
// //         // audio.play();
// //         audio.parentNode.classList.remove("active");
// //     }
// // });
// //
// //
//
// //
// // // Start recording
// // addEvent(document.querySelector('#record'), "click", function(){
// //     // toggle true or false
// //     audios.recording = !audios.recording;
// //     togglePlay(audios.recording,this);
// // });
// //
// //
// // function getUservalues(){
// //     var checked = document.getElementsByTagName('label input:checked');
// //     var values = [];
// //     for (var i = 0; i < checked.length; i++) {
// //         values[i] = {
// //             name:checked[i].name,
// //             checked: checked[i].checked,
// //             correspondingAudio:/*got to label and then to the audio element*/ checked[i].parentNode.children[checked[i].parentNode.children.length - 1]
// //         };
// //     }
// //     return values;
// // }
// //
// //
// //
// // function togglePlay(value, button){
// //     var elClass = "play";
// //     button.className != elClass ;
// //     if (value === true) {
// //         getUservalues();
// //         metronome();
// //     }else {
// //         clearInterval(interval);
// //     }
// // }
// // addEventListener prefix http://stackoverflow.com/questions/6927637/addeventlistener-in-internet-explorer
// function addEvent(element, event, callback) {
//     if (element.addEventListener){  // Normal way
//         element.addEventListener(event,callback,false);}
//     else if (element.attachEvent) { // IE way
//         element.attachEvent("on"+event, callback);}
//     else { // Rest
//         element[event] = callback;}
// }
// //
// // // This functions makes sure the user has guide
// // function metronome(){
// //     interval = setInterval( function(){
// //         for (var i = 0; i < getUservalues().length; i++) {
// //             getUservalues()[i].correspondingAudio.play();
// //             // item.correspondingAudio.pause();
// //             // item.correspondingAudio.currentTime = 0;
// //         }
// //     }, 500);
// // }
// //
// // // document.write(new Audio());

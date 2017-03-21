
// const form = document.querySelector("form");
//
// form.addEventListener("submit", (event)=> {
//     event.preventDefault();
//
//     let formData = {
//         locatie: {
//             id: "",
//             value: function(){return document.querySelector('#plaats').value}
//         },
//         prijs: {
//             id: '',
//             min: document.querySelector('#min-prijs').value,
//             max: document.querySelector('#max-prijs').value,
//             value: function(){return this.min+"-"+this.max }
//         },
//         aantalKamers: {
//             id: "+kamers",
//             value: function(){return document.querySelector('#kamers').value + this.id }
//         },
//         slaapKamer: {
//             id: "+slaapkamers",
//             value: function(){return document.querySelector('#kamers').value + this.id}
//         }
//     };
//
//     let type = {
//                 id: "",
//                 value: function(){return document.querySelector('[name="type"]:checked').value }
//             };
//     // console.log(formData);
//     UserInput(type, formData)
//
// });
//
// function objectToQuery(object){
//     let newObject = "";
//
//     for (var x in object) {
//         newObject += object[x].value()+"/";
//     }
//     return newObject;
// }
"use strict";
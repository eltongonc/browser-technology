"use strict";

var createContent = function createContent(data, htmlInput, htmlOutput) {
    // Handlebars selection
    var source = document.querySelector(htmlInput).innerHTML;
    var template = Handlebars.compile(source);
    var context = data;
    document.querySelector(htmlOutput).innerHTML = template(context);
};
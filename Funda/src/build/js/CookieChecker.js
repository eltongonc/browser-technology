"use strict";

var CookieChecker = function (cookies) {
    "user strict";
    //Make an array from the huge cookiestring and then turn it into an object.

    var mappedCookies = cookies.split(";").map(function (item) {
        var splitted = item.replace(" ", "").split("=");
        var value = {};
        value[splitted[0]] = splitted[1];
        return value;
    });

    return {
        cookies: mappedCookies
    };
}(document.cookie);
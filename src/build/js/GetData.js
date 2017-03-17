"use strict";

var apiCall = {
    data: localStorage.data || "",
    getData: function getData(url) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status < 400) {
                // turns de response in a object
                var response = JSON.parse(req.responseText);
                // save the current data in the localStorage
                // save(response);
                apiCall.response.show(response);
                return response;
            }
        };
        // Show the error if there is no connection
        req.onerror = function (err) {
            // helpers.alert.add("There was an error loading the data")
        };
        req.send();
    },

    response: {
        // Save it to localStorage
        save: function save(data) {
            localStorage.setItem("data", JSON.stringify(data));
            return data;
        },


        // Show in the html
        show: function show(data) {
            createContent(data, "#entry-template", '#content');
            this.save(data);
        }
    }
};

var GetData = function GetData(url) {
    "user strict";

    var data = void 0;

    var getList = function () {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status < 400) {
                // turns de response in a object
                var response = JSON.parse(req.responseText);
                // save the current data in the localStorage
                // save(response);
                show(response);
            }
        };
        // Show the error if there is no connection
        req.onerror = function (err) {
            // helpers.alert.add("There was an error loading the data")
        };
        req.send();
    }();

    // Save it to localStorage
    function save(data) {
        localStorage.setItem("data", JSON.stringify(data));

        return data;
    }

    // Show in the html
    function show(data) {
        createContent(data, "#entry-template", '#content');
        save(data);
    }

    return {
        data: data
    };
};
'use strict';

// All options needed for the app
var helpers = {
    dialog: document.querySelector('dialog'),
    main: document.querySelector('body > main'),
    pages: document.querySelectorAll('main > section'),
    header: document.querySelector('header')
};

// Function to generate the app
var app = {
    init: function init() {
        routes.init();
    }
};

// Function to generate the routes
var routes = {
    init: function init() {
        // helpers.spinner.remove();
        sections.toggle();

        // Do an api call the first time an user get to the homeRoute. This happens only when it is not saved in local storage;
        if (localStorage.data) {} else {}
    },

    // change the route
    hashChange: window.addEventListener("hashchange", function () {
        sections.toggle();
    })
};

// handles the sections
var sections = {
    // function that hides all sections and shows one.
    toggle: function toggle() {
        var initRoute = new Promise(function (resolve, reject) {
            // check current route if it exists and hides all helpers.pages
            resolve(sections.checkExistingRoute(location.hash), helpers.pages.forEach(function (section) {
                // Hide all sections
                section.classList.add("hidden");
            }));
        }).then(function (result) {
            // uses the response that is returned from checkExistingRoute
            if (result.routeExist) {
                result.correspondingPage(result.path);
                document.querySelector(result.route).classList.remove("hidden");
            }
            return result.route;
        });

        // Set the id of a house to the localStorage when it is clicked
        var songLink = document.querySelector('#content');
        songLink.addEventListener("click", function (e) {
            localStorage.setItem('id', e.target.id);
        });
    },
    // this method return a object with a rout+info
    checkExistingRoute: function checkExistingRoute(hash) {
        // checks if the hash has an path: "#player/songTitle"
        var simpleHash = hash.split("/");
        var replacedHash = simpleHash[0].replace("#", "");
        var routeArray = [];
        var response = {};

        // if the current hash(without #) matches one of the sections push it to an array.
        // this array will allways have 1 item at the 0th position.
        helpers.pages.forEach(function (section) {
            section.id == replacedHash ? routeArray.push(simpleHash[0]) : null;
        });

        // check if the previous made array contains an item and give an succes message and use the path if ther is any
        if (routeArray.length > 0) {
            response.message = "Route exist";
            response.route = routeArray[0];
            response.routeExist = true;
            // match the hash to the of the pageFunctions
            response.correspondingPage = sections.show[replacedHash];
            response.path = simpleHash[1];
            // simpleHash[1] ? localStorage.setItem("title", simpleHash[1]) : null;
        } else {
            response.message = (replacedHash || "This route") + ' does not exist. You will be redirected to the homepage';
            response.route = "#stap1";
            response.routeExist = false;
        }
        return response;
    },

    show: {
        // Routes for home
        stap1: function stap1() {
            var form = document.querySelectorAll(":not(.hidden) form")[0];
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                var type = document.querySelector('input[name="type"]:checked').value;
                var query = document.querySelector('input[name="search"]').value.toLowerCase().replace(" ", "-");

                saveQueryLocaly(callAPI(type, query));
                window.location.hash = "#stap2";
            });
        },
        // Routes for home
        stap2: function stap2() {
            var oldQuery = loadQuery();

            var checkboxes = document.querySelectorAll('input[name="kamers"]');
            var newCheckboxes = document.querySelectorAll('input[name="kamers"]:checked');
            // this limits the amount of checkboxes by 2 based
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].addEventListener("click", function (e) {
                    var checkbox = event.target;
                    // uses replace all checked with checked ones
                    checkboxes = document.querySelectorAll('input[name="kamers"]:checked');
                    if (checkboxes.length > 2) {
                        checkbox.checked = false;
                    }
                });
            }

            var form = document.querySelectorAll(":not(.hidden) form")[1];
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                var checkboxQuery = createRange(htmlCollectionToArray(newCheckboxes), "kamer");
                localStorage.setItem("kamers", checkboxQuery);
                callAPI(oldQuery.type, localStorage.query + localStorage.kamers);
                window.location.hash = "#stap3";
            });
        },
        // Routes for home
        stap3: function stap3() {
            var oldQuery = loadQuery();
            console.log(oldQuery.type, localStorage.query + localStorage.kamers + "/" + localStorage.options);
            callAPI(oldQuery.type, localStorage.query + localStorage.kamers + "/" + localStorage.options);
        },
        // Routes for home
        stap4: function stap4() {
            var oldQuery = loadQuery();

            console.log(getMapInfo(JSON.parse(localStorage.data)));
            callAPI(oldQuery.type, localStorage.query + localStorage.kamers + "/" + localStorage.options);
        },
        // Routes for home
        stap5: function stap5() {
            console.log("stap3");
        },
        huis_detail: function huis_detail() {
            // calls the api for the detailpage
            new Promise(function (resolve, reject) {
                resolve(getDetails(localStorage.type, localStorage.id));
            }).then(function () {

                var data = JSON.parse(localStorage.getItem('data'));

                createContent(data, "#huis-template", "#huis_detail");
            });
        }
    }
};

// Start the app
app.init();
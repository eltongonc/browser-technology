// Hide audio elements to style the parent.
var divs = document.querySelectorAll('section div');
for (var i = 0; i < divs.length; i++) {
    divs[i].classList.add("block");
    document.querySelectorAll('audio')[i].classList.add("hidden");
}

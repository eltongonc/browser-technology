var createContent = function(data, htmlInput, htmlOutput){
    // Handlebars selection
    let source = document.querySelector(htmlInput).innerHTML;
    let template = Handlebars.compile(source);
    let context = data;
    document.querySelector(htmlOutput).innerHTML = template(context);
};

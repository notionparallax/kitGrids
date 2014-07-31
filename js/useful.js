$(document).ready(function() {
    /* * * Disqus Reset Function * * */
    var resetD = function (newIdentifier, newUrl, newTitle, newLanguage) {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = newIdentifier;
                this.page.url = newUrl;
                this.page.title = newTitle;
                this.language = newLanguage;
                console.log([this.page.identifier, this.page.url, this.page.title, this.language]);
            }
        });
    };

    function activateText() {
        var id = $(this).context.id;
        $("*").removeClass("highlighted");
        $( id).toggleClass("highlighted");

        var itemTitle = $("."+id).html();
        var itemBody  = $("."+id+" + dd").html();
        $(".this-item").html("<h1>"+itemTitle+"</h1>"+"<p>"+itemBody+"<p>");
        console.log("clicked " + id);
        console.log([itemTitle,itemBody]);
    };

    function reRegisterEvents() {
        console.log("loaded");
        $("path").click(activateText);
        $("rect").click(activateText);
    };

    function hashbanger(value){
        return "!"+value;
    };

    $('select').selectpicker();

    var personParam = document.URL.split('#!')[1];
    if(personParam){
        $(".person").load(personParam+".html", reRegisterEvents);
    }else{
        $(".person").load("front-page.html", reRegisterEvents);
    }
    $(".person-picker").change(function() {
        console.log($(this).context.value);
        $(".person").load($(this).context.value, reRegisterEvents);

        var pageName = $(this).context.value.split(".")[0];
        document.location.hash = hashbanger(pageName);
        resetD(pageName, "http://notionparallax.github.io/kitGrids/#!"+pageName,pageName,'en');

    });
});

$(document).ready(function() {

    /* * * Disqus Reset Function * * */
    var resetD = function(newIdentifier, newUrl, newTitle, newLanguage) {
        DISQUS.reset({
            reload: true,
            config: function() {
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
        console.log("clicked " + id);
        $("*").removeClass("highlighted");
        $(id).toggleClass("highlighted");

        var itemTitle = $("." + id).html();
        var itemBody = $("." + id + " + dd").html();
        $(".this-item").html("<h1>" + itemTitle + "</h1>" + "<p>" + itemBody + "<p>");
        console.log([itemTitle, itemBody]);
    };

    function reRegisterEvents() {
        $("path").click(activateText);
        $("rect").click(activateText);
        console.log("reRegisterEvents run");
    };

    function hashbanger(value) {
        return "!" + value;
    };

    function injectAperson(personName) {
        $("#items-receiver").load(personName + ".html #items");
        $("#interview-receiver").load(personName + ".html #interview");
        $("#portrait-receiver").load(personName + ".html #portrait");
        $("#svg-receiver").load(personName + ".html #svg", reRegisterEvents);
    }

    var personParam = document.URL.split('#!')[1];
    if (personParam) {
        console.log(personParam);
        injectAperson(personParam);
        // $(".person").load(personParam + ".html", reRegisterEvents);
    } else {
        $(".person").load("front-page.html", reRegisterEvents);
    }

    $(".show-menu").click(function() {
        $('nav').toggleClass('nav-visible');
    });

    $("nav li a").click(function(event) {
        event.preventDefault();

        var selectedValue = $(this).data().person;
        console.log(selectedValue);

        //set the selected option to selected
        $(this).prop('selected', false)
            .filter('[value="' + selectedValue + '"]')
            .prop('selected', true);

        //load the content into the middle of the page
        injectAperson(selectedValue);
        // reset the comments so that they point to the right page
        var pageName = selectedValue.split(".")[0];
        document.location.hash = hashbanger(pageName);
        resetD(pageName, "http://notionparallax.github.io/kitGrids/#!" + pageName, pageName, 'en');

        $('nav').toggleClass('nav-visible');
    });


    enquire.register("screen and (max-width: 699px)", {

        deferSetup: true,
        setup: function() {
            console.log("enquire setup called");
            var tabsSwiper = new Swiper('.swiper-container', {
                speed: 300,
                onSlideChangeStart: function() {
                    $(".tabs .active").removeClass('active')
                    $(".tabs a").eq(tabsSwiper.activeIndex).addClass('active')
                }
            });
        },
        match: function() {
            console.log("enquire match called");
            $(".tabs a").on('touchstart mousedown', function(e) {
                e.preventDefault()
                $(".tabs .active").removeClass('active')
                $(this).addClass('active')
                tabsSwiper.swipeTo($(this).index())
            });
            $(".tabs a").click(function(e) {
                e.preventDefault()
            });
        },
        unmatch: function() {
            console.log("enquire unmatch called");
            tabsSwiper.destroy( true );
        }

    });


});

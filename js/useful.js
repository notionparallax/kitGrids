$(document).ready(function() {
    function activateText() {
        $("*").removeClass("highlighted");
        $(".ben." + $(this).context.id).toggleClass("highlighted");
        console.log("clicked " + $(this).context.id);
    };

    function reRegisterEvents() {
        console.log("loaded");
        $("path").click(activateText);
        $("rect").click(activateText);
    };

    $(".person").load("ben-doherty.html", reRegisterEvents);

    $(".person-picker").change(function() {
        console.log($(this).context.value);
        $(".person").load($(this).context.value, reRegisterEvents);
    });

});

var currentCivilization;
$(document).on('mouseover', '.MapButton', function () {
    $(".MapButton").animate({
        left: '0%'
    });
});

$(document).on('mouseout', '.MapButton', function () {
    $(".MapButton").animate({
        left: '-20px'
    });
});

$(document).on('click', '.MapButton', function () {
    var origin = $("#civilizationMenuDiv").position();

    var x = $("#civilizationMenuDiv").width() / 2;
    var y = $("#civilizationMenuDiv").height();

    //Setando o ponto de origem de Scale, faz o zoom ir na direção do marcador
    $('#civilizationMenuDiv').css({
        transformOrigin: "" + x + "px " + y + "px"
    });

    $("#civilizationMenuDiv").transition({
        scale: '0.25'
    }, 1250);

    transitionToMap();
});
function transitionToMap() {
    currentCivilization = undefined;
    $("#mainDiv").fadeOut(625, function () {
        $("#mainDiv").replaceWith($("#mainDiv").data('map'));
        $("#mainDiv").fadeOut(0);
        $("#mainDiv").fadeIn(1250);
    });
}

$(document).on('click', '.CultureButton', function () {

});

$(document).on('click', '.CosmogonyButton', function () {
    transitionToCivilizationTeogony();
});
function transitionToCivilizationCosmogony() {
    
}

$(document).on('click', '#teogonyButton',  function () {
    transitionToCivilizationTeogony();
});
function transitionToCivilizationTeogony() {
    $("#mainDiv").fadeOut(1250, function () {
        $("#mainDiv").data("civilizationMenu", $("#mainDiv").clone(true));

        $("#civilizationMenuDiv").empty();

        $("#mainDiv").css("background-image", "url('" + $(preload.getResult('teogonyBackground' + currentCivilization.name)).attr('src') + "')");

        $("#mainDiv").css("verticalAlign", "bottom");
        $("#mainDiv").append("<div id='civilizationTeogonyDiv'></div>");

        var teogonyBg = preload.getResult("teogony" + civilizationName);
        $(teogonyBg).attr("id", "civilizationTeogonyImg");
        $("#civilizationMenuDiv").append(menuBg);

        $("#mainDiv").append("<img src='../assets/compass.jpg' class='MapButton'></img>");
        $("#mainDiv").fadeIn(1250);
    });
}

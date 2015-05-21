var currentCivilization;

function transitionToCivilizationMenu(marker) {
    currentCivilization = marker.data("civilization");
    var civilizationName = currentCivilization.name;
    $(".menuRow").removeClass("Disabled");
    $("#menuRow" + civilizationName).addClass("Disabled");

    $("#mainDiv").fadeOut(1250, function () {
        initNavController(); //navigation
        $('#mainDiv').transition({
            scale: '1'
        }, 0);
        $("#mainDiv").empty();
        $("#mainDiv").css("background-image", "url('" + $(preload.getResult('menuBackground' + civilizationName)).attr('src') + "')");

        $("#mainDiv").css("verticalAlign", "bottom");
        $("#mainDiv").append("<div id='contentDiv'></div>");

        var bg = preload.getResult('bg')
        $(bg).attr("id", "bg");
        $("#mainDiv").prepend(bg);
        $("#contentDiv").append("<div id='civilizationMenuDiv'></div>");

        var menuBg = preload.getResult("menu" + civilizationName);
        $(menuBg).attr("id", "civilizationMenuImg");
        $("#civilizationMenuDiv").hide().append(menuBg);

        $("#mainDiv").fadeIn(1250, function () {
            var width = $("#bg").width();
            var height = $("#bg").height();
            $("#contentDiv").css("width", "" + width);
            $("#contentDiv").css("height", "" + height);
            $("#civilizationMenuDiv").fadeIn("fast");
            addCivilizationButtons();

        });
    });
}

function addCivilizationButtons() {
    var cosmogonyButton = preload.getResult("cosmogonyButton" + currentCivilization.name);
    $(cosmogonyButton).css("top", currentCivilization.cosmogonyButton.topSpace);
    $(cosmogonyButton).css("left", currentCivilization.cosmogonyButton.leftSpace);
    $(cosmogonyButton).css("max-height", currentCivilization.cosmogonyButton.height);
    $(cosmogonyButton).attr("id", "cosmogonyButton");
    $(cosmogonyButton).attr("class", "CivilizationButton");

    var teogonyButton = preload.getResult("teogonyButton" + currentCivilization.name);
    $(teogonyButton).css("top", currentCivilization.teogonyButton.topSpace);
    $(teogonyButton).css("left", currentCivilization.teogonyButton.leftSpace);
    $(teogonyButton).css("max-height", currentCivilization.teogonyButton.height);
    $(teogonyButton).attr("id", "teogonyButton");
    $(teogonyButton).attr("class", "CivilizationButton");

    var cultureButton = preload.getResult("cultureButton" + currentCivilization.name);
    $(cultureButton).css("top", currentCivilization.cultureButton.topSpace);
    $(cultureButton).css("left", currentCivilization.cultureButton.leftSpace);
    $(cultureButton).css("max-height", currentCivilization.cultureButton.height);
    $(cultureButton).attr("id", "cultureButton");
    $(cultureButton).attr("class", "CivilizationButton");

    $(cultureButton).hide().appendTo("#civilizationMenuDiv");
    $(teogonyButton).hide().appendTo("#civilizationMenuDiv");
    $(cosmogonyButton).hide().appendTo("#civilizationMenuDiv");

    var divWidth = $("#civilizationMenuDiv").width();

    var buttonWidth = $(".CivilizationButton").width();

    var percentage = (buttonWidth / divWidth) * 100;

    $(".CivilizationButton").animate({
        maxWidth: "" + percentage + "%"
    });

    $(".CivilizationButton").fadeIn();

}

$(window).on("resize", function () {
    var width = $("#bg").width();
    var height = $("#bg").height();
    $("#contentDiv").css("width", "" + width);
    $("#contentDiv").css("height", "" + height);
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

$(document).on('click', '#cultureButton', function () {
    transitionToCivilizationCulture();
});

$(document).on('click', '#cosmogonyButton', function () {
    transitionToCivilizationTeogony();
});

function transitionToCivilizationCosmogony() {
    $("#mainDiv").fadeOut(1250, function () {

        $("#mainDiv").empty();

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

$(document).on('click', '#teogonyButton', function () {
    transitionToCivilizationTeogony();
});
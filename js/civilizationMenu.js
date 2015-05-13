var currentCivilization;

function transitionToCivilizationMenu(marker) {
    currentCivilization = marker.data("civilization");
    var civilizationName = currentCivilization.name;

    $("#mainDiv").fadeOut(1250, function () {
        $("#mainDiv").empty();
        $("#mainDiv").css("background-image", "url('" + $(preload.getResult('menuBackground' + civilizationName)).attr('src') + "')");

        $("#mainDiv").css("verticalAlign", "bottom");
        $("#mainDiv").append("<div id='civilizationMenuDiv'></div>");

        var menuBg = preload.getResult("menu" + civilizationName);
        $(menuBg).attr("id", "civilizationMenuImg");
        $("#civilizationMenuDiv").append(menuBg);

        addCivilizationButtons();

        $("#mainDiv").append("<img src='Conteudo/compass.jpg' class='MapButton'></img>");
        $("#mainDiv").fadeIn(1250);
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

    $("#civilizationMenuDiv").append(cultureButton);
    $("#civilizationMenuDiv").append(teogonyButton);
    $("#civilizationMenuDiv").append(cosmogonyButton);

    var divWidth = $("#civilizationMenuDiv").width();

    var buttonWidth = $(".CivilizationButton").width();

    var percentage = (buttonWidth / divWidth) * 100;

    $(".CivilizationButton").css("max-width", "" + percentage + "%");
}


$(document).on('mouseover', '.MapButton', function () {
    $(".MapButton").transition({
        x: '0'
    });
});

$(document).on('mouseout', '.MapButton', function () {
    $(".MapButton").transition({
        x: '-20px'
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
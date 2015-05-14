function transitionToCivilizationCulture() {
    var civ = currentCivilization;

    $("#mainDiv").fadeOut(625, function () {
        $("#mainDiv").empty();

        $("#mainDiv").css("background-image", "url('" + $(preload.getResult('cultureBackground' + currentCivilization.name)).attr('src') + "')");

        $("#mainDiv").css("verticalAlign", "middle");

        $("#mainDiv").append("<div id='civilizationCulture'></div>");

        $("#mainDiv").append("<img src='Conteudo/compass.jpg' class='MapButton'></img>");

        addCultureButtons();

        $("#mainDiv").fadeIn(625, function () {
            addCultureDivs();
        });
    });
}

function addCultureButtons() {
    var culturalManifestationButton = preload.getResult("culturalManifestationButton" + currentCivilization.name);
    $(culturalManifestationButton).css("top", currentCivilization.culturalManifestationButton.topSpace);
    $(culturalManifestationButton).css("left", currentCivilization.culturalManifestationButton.leftSpace);
    $(culturalManifestationButton).css("max-height", currentCivilization.culturalManifestationButton.height);
    $(culturalManifestationButton).attr("id", "culturalManifestationButton");
    $(culturalManifestationButton).attr("class", "CultureButton");


    var subsistenceMethodButton = preload.getResult("subsistenceMethodButton" + currentCivilization.name);
    $(subsistenceMethodButton).css("top", currentCivilization.subsistenceMethodButton.topSpace);
    $(subsistenceMethodButton).css("left", currentCivilization.subsistenceMethodButton.leftSpace);
    $(subsistenceMethodButton).css("max-height", currentCivilization.subsistenceMethodButton.height);
    $(subsistenceMethodButton).attr("id", "subsistenceMethodButton");
    $(subsistenceMethodButton).attr("class", "CultureButton");

    var socialStructureButton = preload.getResult("socialStructureButton" + currentCivilization.name);
    $(socialStructureButton).css("top", currentCivilization.socialStructureButton.topSpace);
    $(socialStructureButton).css("left", currentCivilization.socialStructureButton.leftSpace);
    $(socialStructureButton).css("max-height", currentCivilization.socialStructureButton.height);
    $(socialStructureButton).attr("id", "socialStructureButton");
    $(socialStructureButton).attr("class", "CultureButton");

    $("#civilizationCulture").append(culturalManifestationButton);
    $("#civilizationCulture").append(subsistenceMethodButton);
    $("#civilizationCulture").append(socialStructureButton);


}

function addCultureDivs() {
    $(".CultureButton").each(function () {
        buttonID = $(this).attr("id");
        divID = buttonID + "Div";
        $("#civilizationCulture").append("<div id='" + divID + "' class='CultureButtonDiv'></div>");
        $("#" + divID).css("top", currentCivilization[buttonID].topSpace);
        $("#" + divID).css("left", currentCivilization[buttonID].leftSpace);
        $("#" + divID).css("height", currentCivilization[buttonID].height);
    });
}

var selected;

$(document).on('click', '.CultureButton', function () {

    if (selected == this) {
        hideTopic($(this).attr("id"));
        selected = undefined;
    } else {
        if (selected != undefined) {
            hideTopic($(selected).attr("id"));
        }

        showTopic($(this).attr("id"));

        selected = this;
    }
});

function showTopic(id) {
    divID = id + "Div";

    //Garante que o botão e sua div ficarão visíveis, por cima dos outros elementos
    $("#" + id).css("z-index", "3");
    $("#" + divID).css("z-index", "2");

    //Calculo para que a div fique no centro horizontal do botao
    var divWidth = $(window).width();
    var buttonWidth = $("#" + id).width();
    var percentage = (buttonWidth / divWidth) * 100;

    //Usado para elevar o botão quando este for selecionado
    buttonTopSpace = currentCivilization[id].getTopSpaceFloat();
    buttonHeight = currentCivilization[id].getHeightFloat();

    $("#" + id).animate({
        top: "5%",
        left: 50 - percentage / 2 + "%"
    }, {
        duration: 625,
        queue: false
    });

    $('#' + divID).animate({
        height: "100%",
        width: "100%",
        left: "0%",
        top: "0%",
        borderRadius: "10px"
    }, {
        duration: 625,
        queue: false
    });
    culturalPoint = id.substring(0, id.length - 6);
    $('#' + divID).append("<p id='" + divID + "p'>" + currentCivilization[culturalPoint] + "</p>");
    $('#' + divID + "p").fadeOut(0);
    $('#' + divID + "p").delay(625).fadeIn(625);
    $('#' + divID + "p").mCustomScrollbar({
        theme: "dark-thin"
    });
}

function hideTopic(id) {
    var divID = id + "Div";

    //Calculo para que a div fique no centro horizontal do botao
    var divWidth = $(window).width();
    var buttonWidth = $("#" + id).width();
    var percentage = (buttonWidth / divWidth) * 100;
    var buttonLeftSpace = currentCivilization[id].getLeftSpaceFloat();

    $("#" + divID).empty();
    $("#" + id).animate({
        top: currentCivilization[id].topSpace,
        left: currentCivilization[id].leftSpace,
    }, {
        duration: 625,
        queue: false
    });

    //O centro horizontal é usado aqui!
    $('#' + divID).stop().delay(625).animate({
        top: currentCivilization[id].topSpace,
        left: buttonLeftSpace + percentage / 2 + "%",
        right: "",
        height: currentCivilization[id].height,
        width: "0",
        borderRadius: "100%"
    }, {
        duration: 625,
        queue: false,
        complete: function () {
            //Traz o botão e div de volta a camada inicial
            $("#" + id).css("z-index", "1");
            $("#" + id).css("right", "");
            $("#" + divID).css("z-index", "0");
        }
    });


}
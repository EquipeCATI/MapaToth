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
    buttonID = $(this).attr("id");
    divID = buttonID + "Div";

    if (selected == this) {
        
        
        $("#" + divID + "p").fadeOut(625, function () {
            $("#" + divID).empty();
            $("#" + buttonID).animate({
                top: currentCivilization[buttonID].topSpace,
                left: currentCivilization[buttonID].leftSpace,
            }, {
                duration: 625,
                queue: false
            });

            $('#' + divID).stop().delay(625).animate({
                top: currentCivilization[buttonID].topSpace,
                left: currentCivilization[buttonID].leftSpace,
                right: "",
                height: currentCivilization[buttonID].height,
                width: $("#" + buttonID).width() + "px",
                borderRadius: "100%"
            }, {
                duration: 625,
                queue: false
            });
            
            $("#" + buttonID).css("z-index", "1");
            $("#" + buttonID).css("right", "");
            $("#" + divID).css("z-index", "0");
        });



        selected = undefined;
    } else {
        var divWidth = $(window).width();

        var buttonWidth = $(this).width();

        var percentage = (100 - ((buttonWidth / divWidth) * 100)) / 2;
        $(this).css("z-index", "3");
        $("#" + divID).css("z-index", "2");
        $(this).animate({
            top: "5%",
            left: percentage + "%",
        }, {
            duration: 625,
            queue: false
        });

        $('#' + divID).animate({
            height: "100%",
            width: "100%",
            top: "0%",
            left: "0%",
            borderRadius: "0%"
        }, {
            duration: 625,
            queue: false
        });
        culturalPoint = buttonID.substring(0, buttonID.length - 6);
        $('#' + divID).append("<p id='" + divID + "p'>" + currentCivilization[culturalPoint] + "</p>");
        $('#' + divID + "p").fadeOut(0);
        $('#' + divID + "p").delay(625).fadeIn(625);
        $('#' + divID + "p").mCustomScrollbar({
            theme: "dark-thin"
        });
        selected = this;
    }




});
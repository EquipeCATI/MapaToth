function updateMarkers() {
    var year = parseInt($("#slider").val());

    $(".MapMarker").each(function () {
        $(this).stop();
        var civilization = $(this).data("civilization");
        if (civilization.originYear <= year && civilization.endingYear > year) {
            $(this).fadeIn(125);
        } else {
            $(this).fadeOut(125);
        }
    });
}

function snapToClosest() {
    var sliderValue = parseInt($("#slider").val());
    var closestDistance = 100000;
    var distance;
    var finalValue;


    $(".MapMarker").each(function () {
        var civilization = $(this).data("civilization");

        if (civilization.originYear <= sliderValue) {
            distance = sliderValue - civilization.originYear;
        } else {
            distance = civilization.originYear - sliderValue;
        }

        if (distance < closestDistance) {
            finalValue = civilization.originYear;
            closestDistance = distance;
        }

        if (civilization.endingYear <= sliderValue) {
            distance = sliderValue - civilization.endingYear;
        } else {
            distance = civilization.endingYear - sliderValue;
        }

        if (distance < closestDistance) {
            finalValue = civilization.endingYear;
            closestDistance = distance;
        }
    });


    var interval = setInterval(function () {
        if (finalValue > sliderValue) {
            var newVal = parseFloat($('#slider').val()) + 0.25;
        } else {
            var newVal = parseFloat($('#slider').val()) - 0.25;
        }

        $('#slider').val(newVal);
        $('#slider').trigger("input");

        if (parseInt($('#slider').val()) == finalValue) {
            clearInterval(interval);
        }
    }, 1);


}

function selectMarker(marker) {
    //Salvando o estado atual do mapa
    $("#mainDiv").data("map", $("#mainDiv").clone(true));

    //Leitura da posição do marcador
    var origin = marker.position();

    var x = origin.left + marker.width() / 2;
    var y = origin.top + marker.height() / 2;

    //Setando o ponto de origem de Scale, faz o zoom ir na direção do marcador
    $('.Map').css({
        transformOrigin: "" + x + "px " + y + "px"
    });

    $('.Map').transition({
        scale: '4'
    }, 1250);

    $('.MapMarker').not(marker).fadeOut(10);

    marker.transition({
        scale: '4'
    }, 1250);

    transitionToCivilizationMenu(marker);
}

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

        $("#mainDiv").append("<img src='../Conteudo/compass.jpg' class='MapButton'></img>");
        $("#mainDiv").fadeIn(1250);
    });
}

function addCivilizationButtons (){
    
    
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
    
    var cultureButton = preload.getResult("teogonyButton" + currentCivilization.name);
    $(cultureButton).css("top", currentCivilization.teogonyButton.topSpace);
    $(cultureButton).css("left", currentCivilization.teogonyButton.leftSpace);
    $(cultureButton).css("max-height", currentCivilization.teogonyButton.height);
    $(cultureButton).attr("id", "teogonyButton");
    $(cultureButton).attr("class", "CivilizationButton");

    $("#civilizationMenuDiv").append(cultureButton);
    $("#civilizationMenuDiv").append(teogonyButton);
    $("#civilizationMenuDiv").append(cosmogonyButton);
    
    var divWidth = $("#civilizationMenuDiv").width();
    
    var buttonWidth = $(".CivilizationButton").width();
    
    var percentage = (buttonWidth / divWidth) * 100;
    
    $(".CivilizationButton").css("max-width", ""+percentage+"%");
}

$(document).on('click', '.MapMarker', function () {
    selectMarker($(this));
});

$(document).on('input', '#slider', function () {
    updateMarkers();
});

$(document).on('change', '#slider', function () {
    snapToClosest();
});
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
    $(marker).css("pointer-events", "none");
    //Leitura da posição do marcador
    var origin = marker.offset();

    var x = origin.left + marker.width() / 2;
    var y = origin.top + marker.height() / 2;

    //Setando o ponto de origem de Scale, faz o zoom ir na direção do marcador
    $('#mainDiv').css({
        transformOrigin: "" + x + "px " + y + "px"
    });

    $('#mainDiv').transition({
        scale: '3'
    }, 1250);


    //    marker.transition({
    //        scale: '4'
    //    }, 1250);

    transitionToCivilizationMenu(marker);
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
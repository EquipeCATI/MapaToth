function transitionToMap() {
    currentCivilization = undefined;
    //Botôes do menu são todos ativados
    $(".menuRow").removeClass("Disabled");
    transitionToSoundNamed("mapMusic");
    $("#mainDiv").fadeOut(625, function () {
        $("#mainDiv").replaceWith($("#mainDiv").data('map'));
        $("#mainDiv").fadeOut(0);
        $("#mainDiv").fadeIn(1250);
    });
}

//Adição das bolinhas da linha do tempo, marcam a origem de uma nova civilização
function addSliderMarkers() {
    $.each(civilizations, function () {

        $("#sliderDiv").append("<img id=" + this.name + "Born class='SliderMarker' src='../Conteudo/Imagens/SliderMarker.png'>");
        var sliderMin = parseFloat($("#slider").attr("min"));
        var sliderMax = parseFloat($("#slider").attr("max"));
        var sliderSize = sliderMax - sliderMin;


        var percentage = ((this.originYear - sliderMin) / (sliderSize)) * 80;
        if (percentage > 40) {
            percentage += 8;
            percentage += "%";
        } else {
            percentage += 11;
            percentage += "%";
        }
        $("#" + this.name + "Born").css("left", percentage);


        /*Marcadores de queda da civilização
        $("#sliderDiv").append("<img id=" + this.name + "Dead class='SliderMarker' src='../Conteudo/Imagens/SliderMarker.png'>");


        percentage = ((this.endingYear - sliderMin) / (sliderMax - sliderMin)) * 80;
        if (percentage > 40) {
            percentage += 8;
            percentage += "%";
        } else {
            percentage += 11;
            percentage += "%";
        }
        $("#" + this.name + "Dead").css("left", percentage);
        */
    });

    civilizations = [];

}

function saveMap() {
    //Salvando o estado atual do mapa
    $("#mainDiv").data("map", $("#mainDiv").clone(true));
}

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

//Faz o marcador do input range andar até a posição válida mais próxima
function snapToClosest() {
    var sliderValue = parseInt($("#slider").val());
    var closestDistance = 100000;
    var distance;
    var finalValue;

    //Comparação com os valores de início e queda das civilizações
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

        /*

        if (civilization.endingYear <= sliderValue) {
            distance = sliderValue - civilization.endingYear;
        } else {
            distance = civilization.endingYear - sliderValue;
        }

        if (distance < closestDistance) {
            finalValue = civilization.endingYear;
            closestDistance = distance;
        }
        */
    });

    //Animação do marcador até o ponto definido
    $('#slider').css("pointer-events", "none");
    var interval = setInterval(function () {
        if (finalValue > sliderValue) {
            var newVal = parseFloat($('#slider').val()) + 0.25;
        } else {
            var newVal = parseFloat($('#slider').val()) - 0.25;
        }

        $('#slider').val(newVal);

        //Chama o updateMarkers
        $('#slider').trigger("input");

        if (parseInt($('#slider').val()) == finalValue) {
            var percentage = (finalValue - parseFloat($("#slider").attr("min"))) / (parseFloat($("#slider").attr("max")) - parseFloat($("#slider").attr("min")));
            //percentage = percentage / 100;
            var width = percentage * $("#slider").width();
            var div = $('#sliderVal');
            div.html("Século " + Math.abs(parseInt(finalValue)));

            if (finalValue > 0) {
                div.append(" D.C.");
            } else {
                div.append(" A.C.");
            }

            div.css('top', $("#slider").offset().top - div.outerHeight(true));
            div.css('left', $("#slider").offset().left + width);

            div.fadeIn();

            $('#slider').css("pointer-events", "auto");
            clearInterval(interval);
        }

    }, 1);
}

function selectMarker(marker) {
    //Estado atual do mapa é salvo
    saveMap();
    $(marker).css("pointer-events", "none");
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
    }, 2500, "ease");

    marker.transition({
        scale: '4'
    }, 2500, "ease", function () {
        transitionToCivilizationMenu(marker);
    });

    $('.MapMarker').not(marker).fadeOut(100);


}

$(document).on('click', '.MapMarker', function () {
    selectMarker($(this));
});

$(document).on('input', '#slider', function () {
    $("#sliderVal").fadeOut("fast");
    updateMarkers();
});

$(document).on('mouseover', '#slider', function () {
    $('#sliderVal').fadeIn();
});

$(document).on('mouseout', '#slider', function () {
    $('#sliderVal').fadeOut();
});

$(document).on('change', '#slider', function (event) {
    snapToClosest();
});
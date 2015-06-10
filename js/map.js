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

        $("#sliderDiv").append("<img id=" + this.name + "Born class='SliderMarker' src='" + preload.getResult("sliderMarker").src + "'>");
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

    //civilizations = [];

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
            var matrix = $(this).css('transform');
            var values = matrix.match(/-?[\d\.]+/g);
            if (values[0] == "0") {
                $(this).velocity({
                    scale: 1.2
                }, "snap", function () {
                    $(this).velocity({
                            scale: 1
                        },
                        "snap");
                });
            }
        } else {
            $(this).velocity({
                scale: 0
            });
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

        if (parseInt($('#slider').val()) == finalValue) {

            $('#slider').css("pointer-events", "auto");

            //Chama o updateMarkers
            $('#slider').trigger("input");

            clearInterval(interval);
        }

    }, 1);
}

$(document).on("mousemove", "#slider", function (event) {

    var percentage = (event.pageX - $("#slider").offset().left) / $(this).width();

    var numberOfValues = parseFloat($(this).attr("max")) - parseFloat($(this).attr('min'));

    var century = percentage * numberOfValues + parseFloat($(this).attr('min'));

    var div = $('#sliderVal');
    div.html("Século " + Math.abs(parseInt(century)));

    if (century > 0) {
        div.append(" D.C.");
    } else {
        div.append(" A.C.");
    }

    div.css('top', $("#slider").offset().top - div.outerHeight(true));
    div.css('left', event.pageX - div.outerWidth(true) / 2);
});

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

    $('.Map').velocity({
        scale: '4'
    }, 2500, "ease");

    marker.velocity({
        scale: '4'
    }, 2500, "ease", function () {
        transitionToCivilizationMenu(marker);
    });

    $('.MapMarker').not(marker).fadeOut(100);


}

$(document).on('click', '.MapMarker', function () {
    selectMarker($(this));
});

$(document).on('mouseover', '.MapMarker', function () {
    $(this).velocity({
        scale: 1.2
    });
});

$(document).on('mouseout', '.MapMarker', function () {
    $(this).velocity({
        scale: 1
    });
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
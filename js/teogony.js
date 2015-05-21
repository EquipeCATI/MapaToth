//Indice do Deus atual no array de Deuses
var currentGodIndex;

function transitionToCivilizationTeogony() {
    currentGodIndex = 0;
    var civ = currentCivilization;
    $("#mainDiv").fadeOut(625, function () {
        $("#mainDiv").empty();

        $("#mainDiv").css("background-image", "url('" + $(preload.getResult('teogonyBackground' + currentCivilization.name)).attr('src') + "')");

        $("#mainDiv").css("verticalAlign", "middle");

        $("#mainDiv").append("<div id='civilizationTeogony'></div>");

        var id = currentCivilization.gods[currentGodIndex].name;
        var godImg = preload.getResult(id);
        $(godImg).attr("id", "godImage");

        if (currentCivilization.gods[currentGodIndex].source == undefined) {
            currentCivilization.gods[currentGodIndex].source = $(godImg).attr('src');
        } else {
            $(godImg).attr('src', currentCivilization.gods[currentGodIndex].source);
        }
        $("#mainDiv").prepend(godImg);

        var teogonyImg = preload.getResult("teogony" + currentCivilization.name);
        $(teogonyImg).attr("id", "civilizationTeogonyImg");
        $("#civilizationTeogony").append(teogonyImg);

        var setaDireita = preload.getResult("seta");
        $(setaDireita).attr("id", "nextButton");
        $("#civilizationTeogony").append(setaDireita);

        var setaEsquerda = $(setaDireita).clone();
        setaEsquerda.attr("id", "previousButton");

        $("#civilizationTeogony").append(setaEsquerda);
        $(setaEsquerda).transition({
            rotate: '180deg'
        }, 0);


        $("#civilizationTeogony").append("<div id='descriptionDiv'></div>");

        $("#descriptionDiv").append("<p>" + currentCivilization.gods[currentGodIndex].description) + "</p>";
        $("#descriptionDiv").mCustomScrollbar({
            theme: "dark-thin"
        });
        $("#mainDiv").fadeIn(625);
    });
}

//Ler em previousButton
$(document).on('click', '#nextButton', function () {
    $(this).addClass("Disabled");
    $("#previousButton").addClass("Disabled");
    currentGodIndex++;

    if (currentGodIndex == currentCivilization.gods.length) {
        currentGodIndex = 0;
    }
    var name = currentCivilization.gods[currentGodIndex].name;
    if (currentCivilization.gods[currentGodIndex].source == undefined) {
        currentCivilization.gods[currentGodIndex].source = $(preload.getResult(name)).attr('src');
    }

    var width = $("#godImage").width();

    $("#descriptionDiv *").fadeOut(625);

    $("#godImage").transition({
        x: "" + width / 2 + "px",
        scale: "0.25",
        opacity: "0"
    }, 625, function () {
        $(this).transition({
            x: "-" + width / 2 + "px"
        }, 100, function () {
            $("#godImage").attr("src", currentCivilization.gods[currentGodIndex].source);
            $("#descriptionDiv").find("p").text(currentCivilization.gods[currentGodIndex].description);
            $("#descriptionDiv *").fadeIn(625);
            $("#godImage").fadeIn();
            $("#godImage").transition({
                x: "0px",
                scale: "1",
                opacity: 1
            }, 625, function () {
                $("#nextButton").removeClass("Disabled");
                $("#previousButton").removeClass("Disabled");
            });
        })
    });
});

$(document).on('click', '#previousButton', function () {
    //Desabilita os botões
    $(this).addClass("Disabled");
    $("#nextButton").addClass("Disabled");

    currentGodIndex--;

    //Checagem do limite do índice, caso seja -1, volta para o último Deus do array
    if (currentGodIndex == -1) {
        currentGodIndex = currentCivilization.gods.length - 1;
    }

    //Por algum motivo pegar o elemento do preload mais de uma vez não estava dando certo. Por isso o uso do source
    var name = currentCivilization.gods[currentGodIndex].name;
    if (currentCivilization.gods[currentGodIndex].source == undefined) {
        currentCivilization.gods[currentGodIndex].source = $(preload.getResult(name)).attr('src');
    }

    var width = $("#godImage").width();

    $("#descriptionDiv *").fadeOut(625);

    //Move para a esquerda, diminui e dá fade
    $("#godImage").transition({
        x: "-" + width / 2 + "px",
        scale: "0.25",
        opacity: "0"
    }, 625, function () {
        //Enquanto a imagem está invisível, é movida para a direita
        $("#godImage").transition({
            x: "" + width / 2 + "px"
        }, 100, function () {
            //Substituição do attr src para a nova imagem
            $("#godImage").attr("src", currentCivilization.gods[currentGodIndex].source);
            //Setando o texto para o novo Deus
            $("#descriptionDiv").find("p").text(currentCivilization.gods[currentGodIndex].description);
            $("#descriptionDiv *").fadeIn(625);

            //Manda a imagem de volta para o centro, com sua escala e opacidade originais
            $("#godImage").transition({
                x: "0px",
                scale: "1",
                opacity: 1
            }, 625, function () {
                //Reabilitação dos botões
                $("#previousButton").removeClass("Disabled");
                $("#nextButton").removeClass("Disabled");
            });
        })
    });
});
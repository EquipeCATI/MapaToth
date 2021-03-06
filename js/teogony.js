//Indice do Deus atual no array de Deuses
var currentGodIndex;

function transitionToCivilizationTeogony() {
    currentGodIndex = 0;
    var civ = currentCivilization;
    $("#mainDiv").fadeOut(625, function () {
        $("#contentDiv").empty();

        //$("#mainDiv").css("background-image", "url('" + $(preload.getResult('teogonyBackground' + currentCivilization.name)).attr('src') + "')");

        $("#contentDiv").append("<div id='civilizationTeogony'></div>");
        $("#civilizationTeogony").append("<div id='godImgDiv'></div>");

        var id = currentCivilization.gods[currentGodIndex].name;
        var godImg = preload.getResult(id);
        $(godImg).attr("id", "godImage");

        if (currentCivilization.gods[currentGodIndex].source == undefined) {
            currentCivilization.gods[currentGodIndex].source = $(godImg).attr('src');
        } else {
            $(godImg).attr('src', currentCivilization.gods[currentGodIndex].source);
        }
        $("#godImgDiv").append(godImg);

        var teogonyImg = preload.getResult("teogony" + currentCivilization.name);
        $(teogonyImg).attr("id", "civilizationTeogonyImg");
        $("#civilizationTeogony").append(teogonyImg);


        $("#civilizationTeogony").append("<img id='nextButton' src=''>");
        $("#nextButton").attr('src', $(preload.getResult("setaPapel")).attr('src'));

        $("#civilizationTeogony").append("<img id='previousButton' src=''>");
        $("#previousButton").attr('src', $(preload.getResult("setaPapel")).attr('src'));


        $("#civilizationTeogony").append("<div id='textDiv'></div>");
        var godName = currentCivilization.gods[currentGodIndex].name;

        $("#textDiv").append("<div id='descriptionDiv'></div>");

        var godDescription = currentCivilization.gods[currentGodIndex].description;
        $("#descriptionDiv").append("<p>" + "<span class='dropCap'>" + godDescription.substr(0, 1) + "</span>" + godDescription.substr(1, godDescription.length) + " </p>");

        $("#descriptionDiv").mCustomScrollbar({
            theme: "minimal-dark"
        });

        if (currentCivilization.dropCapFont) {
            $(".dropCap").css("font-family", currentCivilization.dropCapFont.name);
        } else {
            $(".dropCap").css("font-family", defaultDropCapFont.name);
        }

        if (currentCivilization.bodyFont) {
            $("#descriptionDiv p").css("font-family", currentCivilization.bodyFont.name);
        } else {
            $("#descriptionDiv p").css("font-family", defaultBodyFont.name);
        }

        $("#mainDiv").fadeIn(625, function () {
            addNavIconNamed("teogony");
        });
    });
}

function changeGod(direction) {
    //Desabilita os botões
    $("#previousButton").addClass("Disabled");
    $("#nextButton").addClass("Disabled");

    currentGodIndex += direction;

    //Checagem do limite do índice, caso seja -1, volta para o último Deus do array
    if (currentGodIndex == -1) {
        currentGodIndex = currentCivilization.gods.length - 1;
    }

    //Checagem do limite do índice, caso seja maior que o tamanho do array, volta para o primeiro Deus 
    if (currentGodIndex == currentCivilization.gods.length) {
        currentGodIndex = 0;
    }

    //Por algum motivo pegar o elemento do preload mais de uma vez não estava dando certo. Por isso o uso do source
    var name = currentCivilization.gods[currentGodIndex].name;
    if (currentCivilization.gods[currentGodIndex].source == undefined) {
        currentCivilization.gods[currentGodIndex].source = $(preload.getResult(name)).attr('src');
    }

    var width = $("#godImgDiv").width();

    $("#descriptionDiv *").fadeOut(625);
    $("#civilizationTeogony h1").fadeOut(625);

    //Move para a esquerda se -1, direita se 1, diminui e dá fade
    $("#godImage").velocity({
        translateX: -1 * direction * width / 2 + "px",
        scale: "0.25",
        opacity: "0"
    }, 625, function () {
        //Enquanto a imagem está invisível, é movida para a direita se -1, esquerda se 1
        $("#godImage").velocity({
            translateX: direction * width / 2 + "px"
        }, 100, function () {
            //Substituição do attr src para a nova imagem
            $("#godImage").attr("src", currentCivilization.gods[currentGodIndex].source);

            /*
            //Setando o título para o novo Deus
            $("#civilizationTeogony h1").fadeIn(625);
            var godName = currentCivilization.gods[currentGodIndex].name;
            $("#textDiv").find("h1").html("<span class='dropCap'>" + godName.substr(0, 1) + "</span>" + godName.substr(1, godName.length));

            if (currentCivilization.dropCapFont) {
                $(".teogonyDropCap").css("font-family", currentCivilization.dropCapFont.name);
            } else {
                $(".dropCap").css("font-family", defaultDropCapFont.name);
            }

            if (currentCivilization.bodyFont) {
                $("#textDiv h1").css("font-family", currentCivilization.bodyFont.name);
            } else {
                $("#textDiv h1").css("font-family", defaultBodyFont.name);
            }
            */

            //Setando o texto para o novo Deus
            var godDescription = currentCivilization.gods[currentGodIndex].description;
            $("#descriptionDiv").find("p").html("<span class='dropCap'>" + godDescription.substr(0, 1) + "</span>" + godDescription.substr(1, godDescription.length));

            if (currentCivilization.dropCapFont) {
                $(".dropCap").css("font-family", currentCivilization.dropCapFont.name);
            } else {
                $(".dropCap").css("font-family", defaultDropCapFont.name);
            }

            if (currentCivilization.bodyFont) {
                $("#descriptionDiv p").css("font-family", currentCivilization.bodyFont.name);
            } else {
                $("#descriptionDiv p").css("font-family", defaultBodyFont.name);
            }

            $("#descriptionDiv *").fadeIn(625);

            //Manda a imagem de volta para o centro, com sua escala e opacidade originais
            $("#godImage").velocity({
                translateX: "0px",
                scale: "1",
                opacity: 1
            }, 625, function () {
                //Reabilitação dos botões
                $("#previousButton").removeClass("Disabled");
                $("#nextButton").removeClass("Disabled");
            });
        })
    });
}

$(document).on('click', '#nextButton', function () {
    //Botão clicado fica "não-preenchido"
    changeGod(1);
});

$(document).on('click', '#previousButton', function () {
    changeGod(-1);
});
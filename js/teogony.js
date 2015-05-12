var currentGodIndex;

function transitionToCivilizationTeogony() {
    currentGodIndex = 0;
    var civ = currentCivilization;
    $("#mainDiv").fadeOut(1250, function () {
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

        $("#mainDiv").append("<img src='Conteudo/compass.jpg' class='MapButton'></img>");
        $("#mainDiv").fadeIn(1250);
    });
}

$(document).on('click', '#nextButton', function () {

    currentGodIndex++;

    if (currentGodIndex == currentCivilization.gods.length) {
        currentGodIndex = 0;
    }
    var name = currentCivilization.gods[currentGodIndex].name;
    if (currentCivilization.gods[currentGodIndex].source == undefined) {
        currentCivilization.gods[currentGodIndex].source = $(preload.getResult(name)).attr('src');
    }

    var width = $("#godImage").width();

    $("#descriptionDiv *").fadeOut(100);

    $("#godImage").transition({
        x: "" + width / 2 + "px",
        scale: "0.25",
        opacity: "0"
    }, function () {
        $("#descriptionDiv").empty();
        $("#godImage").transition({
            x: "-" + width / 2 + "px"
        }, 0, function () {
            $("#godImage").attr("src", currentCivilization.gods[currentGodIndex].source);
            $("#descriptionDiv").append("<p>" + currentCivilization.gods[currentGodIndex].description + "</p>");
            $("#godImage").fadeIn();
            $("#godImage").transition({
                x: "0px",
                scale: "1",
                opacity: 1
            });
        })
    });
});

$(document).on('click', '#previousButton', function () {

    currentGodIndex--;

    if (currentGodIndex == -1) {
        currentGodIndex = currentCivilization.gods.length - 1;
    }
    var name = currentCivilization.gods[currentGodIndex].name;
    if (currentCivilization.gods[currentGodIndex].source == undefined) {
        currentCivilization.gods[currentGodIndex].source = $(preload.getResult(name)).attr('src');
    }

    var width = $("#godImage").width();

    $("#descriptionDiv *").fadeOut(100);


    $("#godImage").transition({
        x: "-" + width / 2 + "px",
        scale: "0.25",
        opacity: "0"
    }, function () {
        $("#descriptionDiv").empty();


        $("#godImage").transition({
            x: "" + width / 2 + "px"
        }, 0, function () {
            $("#descriptionDiv").append("<p>" + currentCivilization.gods[currentGodIndex].description + "</p>");
            $("#godImage").attr("src", currentCivilization.gods[currentGodIndex].source);
            $("#godImage").transition({
                x: "0px",
                scale: "1",
                opacity: 1
            });
        })
    });
});
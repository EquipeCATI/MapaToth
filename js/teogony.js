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
    $(this).addClass("Disabled");
    $("#nextButton").addClass("Disabled");
    currentGodIndex--;

    if (currentGodIndex == -1) {
        currentGodIndex = currentCivilization.gods.length - 1;
    }
    var name = currentCivilization.gods[currentGodIndex].name;
    if (currentCivilization.gods[currentGodIndex].source == undefined) {
        currentCivilization.gods[currentGodIndex].source = $(preload.getResult(name)).attr('src');
    }

    var width = $("#godImage").width();

    $("#descriptionDiv *").fadeOut(625);


    $("#godImage").transition({
        x: "-" + width / 2 + "px",
        scale: "0.25",
        opacity: "0"
    }, 625, function () {
        $("#godImage").transition({
            x: "" + width / 2 + "px"
        }, 100, function () {
            $("#godImage").attr("src", currentCivilization.gods[currentGodIndex].source);
            $("#descriptionDiv").find("p").text(currentCivilization.gods[currentGodIndex].description);
            $("#descriptionDiv *").fadeIn(625);
            $("#godImage").transition({
                x: "0px",
                scale: "1",
                opacity: 1
            }, 625, function () {
                $("#previousButton").removeClass("Disabled");
                $("#nextButton").removeClass("Disabled");
            });
        })
    });
});
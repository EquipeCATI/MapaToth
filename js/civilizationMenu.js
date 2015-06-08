var currentCivilization;

function transitionToCivilizationMenu(marker) {
    //marker pois inicialmente a navegação se dava apenas no mapa,
    //mas pode ser qualquer objeto que tenha uma civilização em seu data


    if (currentCivilization != marker.data("civilization") && marker.data("civilization") != undefined) {
        currentCivilization = marker.data("civilization");
        transitionToSoundNamed(currentCivilization.name);
    }

    var civilizationName = currentCivilization.name;

    //Aqui os botões do menu são ativados
    $(".menuRow").removeClass("Disabled");
    //E o botão da civilização exibida desativado
    $("#menuRow" + civilizationName).addClass("Disabled");

    $("#mainDiv").fadeOut(625, function () {
        initNavController();
        addCivilizationNavIcon(); //navigation

        //Reajuste do zoom do mapa
        $('#mainDiv').transition({
            scale: '1'
        }, 0);

        //Objetos são retirados, mainDiv será reestrutrada
        $("#bodyDiv").empty();

        //Background específico de cada civilização
        //$("#mainDiv").css("background-image", "url('" + $(preload.getResult('menuBackground' + civilizationName)).attr('src') + "')");

        //ContentDiv é utilizada para manter o conteúdo dentro da folha
        //Ela é sempre redimensionada de acordo com a imagem da folha
        $("#bodyDiv").append("<div id='contentDiv'></div>");

        //Folha
        var bg = preload.getResult('bg')
        $(bg).attr("id", "bg");

        $("#bodyDiv").prepend(bg);

        //Conteúdo em si
        $("#contentDiv").append("<div id='civilizationMenuDiv'></div>");

        var menuBg = preload.getResult("menu" + civilizationName);
        $(menuBg).attr("id", "civilizationMenuImg");
        $(menuBg).css("opacity", "0.8");
        $("#civilizationMenuDiv").append(menuBg).fadeOut(0);

        $("#mainDiv").fadeIn(625, function () {
            var width = $("#bg").width();
            var height = $("#bg").height();
            $("#contentDiv").css("width", "" + width);
            $("#contentDiv").css("height", "" + height);
            $("#civilizationMenuDiv").fadeIn("fast");
            addCivilizationButtons();

        });
    });
}

function addCivilizationButtons() {

    addCivilizationButton("cosmogony");
    addCivilizationButton("teogony");
    addCivilizationButton("culture");

    $(".CivilizationButton").fadeTo("fast", 0.8);
}

function addCivilizationButton(topic) {

    var menuBg = preload.getResult("menu" + currentCivilization.name);

    var civilizationButton = preload.getResult(topic + "Button" + currentCivilization.name);
    $(civilizationButton).css("top", currentCivilization[topic + "Button"].topSpace);
    $(civilizationButton).css("left", currentCivilization[topic + "Button"].leftSpace);

    var height = (civilizationButton.naturalHeight / menuBg.naturalHeight) * 100;
    $(civilizationButton).css("max-height", height + "%");

    var width = (civilizationButton.naturalWidth / menuBg.naturalWidth) * 100;
    $(civilizationButton).css("max-width", width + "%");

    $(civilizationButton).attr("id", topic + "Button");
    $(civilizationButton).attr("class", "CivilizationButton");

    $(civilizationButton).hide().appendTo("#civilizationMenuDiv");
}

$(window).on("resize", function () {
    //Redimensionamento de contentDiv de acordo com a imagem
    var width = $("#bg").width();
    var height = $("#bg").height();
    $("#contentDiv").css("width", "" + width + "px");
    $("#contentDiv").css("height", "" + height + "px");
});

//Transições para cada tela
$(document).on("mouseover", ".CivilizationButton", function () {
    $(this).fadeTo("fast", 1);
    $(this).transition({
        scale: "1.05"
    }, "fast");
});

$(document).on("mouseout", ".CivilizationButton", function () {
    $(this).fadeTo("fast", 0.8);
    $(this).transition({
        scale: "1"
    }, "ease");
});



$(document).on('click', '#cultureButton', function () {
    $(this).fadeTo("fast", 0.8);
    $(this).transition({
        scale: "1"
    }, "ease");
    transitionToCivilizationCulture();
});

$(document).on('click', '#cosmogonyButton', function () {
    //cosmogonia pendente
    $(this).fadeTo("fast", 0.8);
    $(this).transition({
        scale: "1"
    }, "fast");
    transitionToCivilizationCosmogony();
});

$(document).on('click', '#teogonyButton', function () {
    $(this).fadeTo("fast", 0.8);
    $(this).transition({
        scale: "1"
    }, "fast");
    transitionToCivilizationTeogony();
});
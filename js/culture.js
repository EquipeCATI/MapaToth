function transitionToCivilizationCulture() {
    var civ = currentCivilization;

    $("#mainDiv").fadeOut(625, function () {
        $("#bodyDiv").empty();

        //$("#mainDiv").css("background-image", "url('" + $(preload.getResult('cultureBackground' + currentCivilization.name)).attr('src') + "')");

        //$("#mainDiv").css("verticalAlign", "middle");

        $("#bodyDiv").append("<div id='civilizationCulture'></div>");


        addCultureDivs();




        $("#mainDiv").fadeIn(625, function () {
            addNavIconNamed("culture");
        });
    });
}

function addCultureDivs() {
    addCultureDiv("culturalManifestation");
    addCultureDiv("subsistenceMethod");
    addCultureDiv("socialStructure");
    selected = $("#culturalManifestationButton");
    $("#culturalManifestationDiv").css("z-index", "3");
}

//Adiciona divs de acordo com a string
function addCultureDiv(topic) {
    var button = preload.getResult(topic + "Button" + currentCivilization.name);
    $(button).attr("id", topic + "Button");
    $(button).attr("class", "CultureButton");

    $("#civilizationCulture").append("<div id='" + topic + "Div' class='CultureDiv'></div>");
    $("#" + topic + "Div").append(button);
    var title = "";

    if (topic == "culturalManifestation") {
        title = "Manifestações Culturais";
    }

    if (topic == "subsistenceMethod") {
        title = "Métodos de Subsistência";
    }

    if (topic == "socialStructure") {
        title = "Estrutura Social";
    }

    $("#" + topic + "Div").append("<p class='cultureTitle'> <span class='titleDropCap'>" + title.substr(0, 1) + "</span>" + title.substr(1, currentCivilization[topic].length) + "</p>");


    $("#" + topic + "Div").append("<p class='cultureText'><span class='dropCap'>" + currentCivilization[topic].substr(0, 1) + "</span>" +
        currentCivilization[topic].substr(1, currentCivilization[topic].length) + "</p>");


    $("#" + topic + "Div").css("background-image", "url(" + preload.getResult("bg").src) + ")";
    //    $('#' + divID + "p").mCustomScrollbar({
    //        theme: "dark-thin"
    //    });
}

//Armazena o botão correspondente ao assunto exibido
var selected = $("#culturalManifestationDiv");

$(document).on('click', '.CultureButton:not(.DisabledCultureButton)', function () {
    if (this != selected) {
        showTopic($(this).attr("id"));
    }

    selected = this;
});

function showTopic(id) {
    //"culturalManifestation - Button - 6 letras a menos e adição de Div"
    //Resultado: culturalManifestationDiv
    var divID = id.substr(0, id.length - 6) + "Div";

    //Folha da frente
    var selectedId = $(selected).attr("id");
    var selectedDivID = selectedId.substr(0, selectedId.length - 6) + "Div";

    //Div a ser apresentada fica no "meio" das 3 folhas
    $("#" + divID).css("z-index", "2");

    //Animação da div da frente

    createjs.Sound.play("paperFold");
    $("#" + selectedDivID).velocity({
        translateX: "110%"
    }, 625, "ease", function () {
        //As outras folhas são colocadas atrás
        $(".CultureDiv").not($("#" + divID)).css("z-index", "1");

        //Folha selecionada é trazida para frente
        $("#" + divID).css("z-index", "3");

        //Botão da folha selecionada fica desabilitado
        $(id).addClass("DisabledCultureButton");

        //Folha(agora antiga) desce
        $(this).velocity({
            translateX: "0%"
        }, 625, "ease");
    });
}
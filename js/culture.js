function transitionToCivilizationCulture() {
    var civ = currentCivilization;

    $("#mainDiv").fadeOut(625, function () {
        $("#mainDiv").empty();

        //$("#mainDiv").css("background-image", "url('" + $(preload.getResult('cultureBackground' + currentCivilization.name)).attr('src') + "')");

        $("#mainDiv").css("verticalAlign", "middle");

        $("#mainDiv").append("<div id='civilizationCulture'></div>");

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
    selected = $("#socialStructureButton");
}

//Adiciona divs de acordo com a string
function addCultureDiv(topic) {
    var button = preload.getResult(topic + "Button" + currentCivilization.name);
    $(button).attr("id", topic + "Button");
    $(button).attr("class", "CultureButton");

    $("#civilizationCulture").append("<div id='" + topic + "Div' class='CultureDiv'></div>");
    $("#" + topic + "Div").append(button);
    $("#" + topic + "Div").append("<p>" + currentCivilization[topic] + "</p>");
    //    $('#' + divID + "p").mCustomScrollbar({
    //        theme: "dark-thin"
    //    });
}

//Armazena o botão correspondente ao assunto exibido
var selected;

$(document).on('click', '.CultureButton:not(.DisabledCultureButton)', function () {
    showTopic($(this).attr("id"));
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
    $("#" + selectedDivID).transition({
        y: "-120%"
    }, "snap", function () {
        //As outras folhas são colocadas atrás
        $(".CultureDiv").not($("#" + divID)).css("z-index", "1");

        //Folha selecionada é trazida para frente
        $("#" + divID).css("z-index", "3");

        //Botão da folha selecionada fica desabilitado
        $(id).addClass("DisabledCultureButton");

        //Folha(agora antiga) desce
        $(this).transition({
            y: "0%"
        }, "snap");
    });
}
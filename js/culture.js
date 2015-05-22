function transitionToCivilizationCulture() {
    var civ = currentCivilization;

    $("#mainDiv").fadeOut(625, function () {
        $("#mainDiv").empty();

        $("#mainDiv").css("background-image", "url('" + $(preload.getResult('cultureBackground' + currentCivilization.name)).attr('src') + "')");

        $("#mainDiv").css("verticalAlign", "middle");

        $("#mainDiv").append("<div id='civilizationCulture'></div>");

        addCultureDivs();

        $("#mainDiv").fadeIn(625, function () {

        });
    });
}

function addCultureDivs() {
    addCultureDiv("culturalManifestation");
    addCultureDiv("subsistenceMethod");
    addCultureDiv("socialStructure");
    selected = $("#socialStructureButton");
}


function addCultureDiv(topic){
    var button = preload.getResult(topic + "Button" + currentCivilization.name);
    $(button).attr("id", topic + "Button");
    $(button).attr("class", "CultureButton");

    $("#civilizationCulture").append("<div id='"+ topic +"Div' class='CultureDiv'></div>");
    $("#" + topic + "Div").append(button);
    $("#" + topic + "Div").append("<p>" + currentCivilization[topic] + "</p>");
//    $('#' + divID + "p").mCustomScrollbar({
//        theme: "dark-thin"
//    });
}

//Armazena o botão correspondente ao assunto exibido
var selected;

$(document).on('click', '.CultureButton:not(.DisabledCultureButton)', function () {

    if (selected == this) {

    } else {
        showTopic($(this).attr("id"));

        selected = this;
    }
});

function showTopic(id) {
    var divID = id.substr(0, id.length - 6) + "Div";
    var selectedId = $(selected).attr("id");
    var selectedDivID = selectedId.substr(0, selectedId.length - 6) + "Div";
    $("#" + selectedDivID).transition({
        y: "-120%"
    },"snap", function () {
        //Garante que o botão e sua div ficarão visíveis, por cima dos outros elementos
        $(".CultureDiv").css("z-index", "1");
        $("#" + divID).css("z-index", "3");
        
        $(id).addClass("DisabledCultureButton");
        
        $(this).transition({
            y: "0%"
        },"snap");
    });
}
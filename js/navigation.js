//Cria os icones de navegação, 1a tela
function initNavController() {
    var mapNavItem = preload.getResult('mapNavItem');
    $(mapNavItem).addClass("navItem");

    $("#navigationUl").html("<li id='mapNavLi' class='navLi'></li>");

    $("#mapNavLi").append(mapNavItem);
    $("#mapNavLi").addClass("CurrentNav");
    $(mapNavItem).addClass("CurrentNav");


    $(mapNavItem).fadeOut(0);
    $(mapNavItem).fadeIn(625);
}


//"cosmogony", "teogony" ou "culture"
var selectedTopicName;

//Adiciona o ícone da tela de acordo com a string com seu nome

function addCivilizationNavIcon() {

    var civilizationName = currentCivilization.name;
    var separator = preload.getResult("setaNavegacao");
    $(separator).addClass("NavSeparator");

    $("#navigationUl").append(separator);
    $(separator).fadeOut(0);

    $("#navigationUl").append("<li id='mainNavItem' class='navLi'> <img class='navItem' src='" + preload.getResult('mainNavItem' + civilizationName).src + "'/></li>");

    $("#mainNavItem").data("civilization", currentCivilization);
    $("#mainNavItem").addClass("CurrentNav");
    $("#mainNavItem > img").addClass("CurrentNav");

    $(mainNavItem).fadeOut(0);

    $("#mapNavLi").removeClass("CurrentNav");
    $("#mapNavLi > img").removeClass("CurrentNav");


    $(separator).fadeIn(625);
    $(mainNavItem).fadeIn(625)
}

function addNavIconNamed(name) {
    selectedTopicName = name;
    var navItem = preload.getResult(name + 'NavItem');
    //$(navItem).attr("id", name + "NavItem");
    $(navItem).addClass("navItem");
    $(navItem).addClass("CurrentNav");

    var separator = $(".NavSeparator").clone(true);
    separator.attr("id", name + "Separator");

    $("#navigationUl").append(separator);

    $("#navigationUl").append("<li id='" + name + "NavItem' class='navLi'></li>");
    $("#" + name + "NavItem").append(navItem);
    $("#" + name + "NavItem").addClass("CurrentNav");

    separator.fadeOut(0);
    $(navItem).fadeOut(0);

    $("#mainNavItem").fadeTo(625, 1,
        function () {

            $("#mainNavItem").removeClass("CurrentNav");
            $("#mainNavItem > img").removeClass("CurrentNav");

            separator.fadeIn(625);
            $(navItem).fadeIn(625);

        });
}

$(document).on("mouseover", ".navLi", function () {
    var div = $('#sliderVal');

    if ($(this).attr("id") == "mapNavLi") {
        div.html("Mapa");
    } else if ($(this).attr("id") == "mainNavItem") {
        div.html("Civilização " + currentCivilization.name);
    } else {
        var id = $(this).attr("id");
        var topic = id.substr(0, id.length - 7);

        if (topic == "teogony") {
            div.html("Teogonia");
        }
        if (topic == "culture") {
            div.html("Cultura");
        }
        if (topic == "cosmogony") {
            div.html("Cosmogonia");
        }
    }

    if (!$(this).hasClass("CurrentNav")) {
        $(this).velocity({
            scale: '1.2'
        }, 625, "ease");
    }

    div.css('top', $(this).offset().top + $(this).outerHeight(true) * 1.25);
    div.css('max-width', $(this).outerWidth(false) * 1.5 + "px");
    div.css('left', $(this).offset().left + $(this).outerWidth(false) / 2 - div.outerWidth(true) / 2);

    div.fadeIn("fast");
});

$(document).on('mouseout', '.navLi', function () {
    $(this).velocity({
        scale: '1'
    }, 625, "ease");

    $('#sliderVal').fadeOut("fast", function () {
        $('#sliderVal').css('max-width', "");
    });
});

//Listeners
$(document).on("click", "#mapNavLi:not(.CurrentNav)", function () {
    transitionToMap();
    initNavController();
});

//Animação de volta à tela inicial da civilização
$(document).on("click", "#mainNavItem:not(.CurrentNav)", function () {
    $("#" + selectedTopicName + "NavItem").fadeOut(625, function () {
        $(this).remove();
    });

    $("#" + selectedTopicName + "Separator").fadeOut(625, function () {
        $(this).remove();
    });

    $("#mainNavItem").fadeTo(625, 0.8, function () {
        $(this).addClass("Disabled");
    });


    transitionToCivilizationMenu($(this));
});
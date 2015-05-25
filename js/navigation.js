//Cria os icones de navegação, 1a tela
function initNavController() {
    var mapNavItem = preload.getResult('mapNavItem');
    $(mapNavItem).addClass("navItem");

    $("#navigationUl").html("<li id='mapNavLi' class='navLi'></li>");

    $("#mapNavLi").append(mapNavItem);
    $("#mapNavLi").addClass("Disabled");


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
    $("#mainNavItem").addClass("Disabled");

    $(mainNavItem).fadeOut(0);

    $("#mapNavLi").removeClass("Disabled");


    $(separator).fadeIn(625);
    $(mainNavItem).fadeIn(625)
}

function addNavIconNamed(name) {
    selectedTopicName = name;
    var navItem = preload.getResult(name + 'NavItem');
    $(navItem).attr("id", name + "NavItem");
    $(navItem).addClass("navItem");
    $(navItem).addClass("Disabled");

    var separator = $(".NavSeparator").clone(true);
    separator.attr("id", name + "Separator");

    $("#navigationUl").append(separator);

    $("#navigationUl").append("<li id='" + name + "NavItem' class='navLi'></li>");
    $("#" + name + "NavItem").append(navItem);

    separator.fadeOut(0);
    $(navItem).fadeOut(0);

    $("#mainNavItem").fadeTo(625, 1,
        function () {

            $("#mainNavItem").removeClass("Disabled");

            separator.fadeIn(625);
            $(navItem).fadeIn(625);

        });
}



//Listeners
$(document).on("click", "#mapNavLi", function () {
    transitionToMap();
    initNavController();
});

//Animação de volta à tela inicial da civilização
$(document).on("click", "#mainNavItem:not(.Disabled)", function () {
    $("#" + selectedTopicName + "NavItem").fadeOut(625, function () {
        $(this).remove();
    });

    $("#" + selectedTopicName + "Separator").fadeOut(625, function () {
        $(this).remove();
    });

    $("#mainNavItem").fadeTo(625, 0.4, function () {
        $(this).addClass("Disabled");
    });


    transitionToCivilizationMenu($(this));
});
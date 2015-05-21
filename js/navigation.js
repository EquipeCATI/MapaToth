//Cria os icones de navegação, 1a tela
function initNavController() {
    var civilizationName = currentCivilization.name;
    var mapNavItem = preload.getResult('mapNavItem');
    $(mapNavItem).addClass("navItem");
    $("#navigationUl").html("<li id='mapNavLi' class='navLi'></li>");

    $("#mapNavLi").append(mapNavItem);
    $(mapNavItem).fadeOut(0);

    var separator = preload.getResult("seta");
    $(separator).addClass("NavSeparator");

    $("#navigationUl").append(separator);
    $(separator).fadeOut(0);

    var mainNavItem = preload.getResult('mainNavItem' + civilizationName);
    $(mainNavItem).addClass("navItem");


    $("#navigationUl").append("<li id='mainNavItem' class='navLi'></li>");

    $("#mainNavItem").append(mainNavItem);
    $("#mainNavItem").addClass("Disabled");
    $(mainNavItem).fadeOut(0);

    $(mapNavItem).fadeIn(625, function () {
        $(separator).fadeIn(625, function () {
            $(mainNavItem).fadeIn(625);
        })
    });
}

//Remoção da navBar, usado para ir ao mapa
function clearNav() {

    $(".menuRow").removeClass("Disabled");
    $("#navigationUl").empty();

}

//Listeners
$(document).on("click", "#mapNavLi", function () {
    clearNav();
    transitionToMap();
});
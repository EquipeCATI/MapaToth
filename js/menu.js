var menuIsOpen = false;


function hideMenu() {
    $("#menuDiv").css("left", $("#MenuButton").offset().left + "px");
    $("#blackScreen").fadeOut();
    $("#menuDiv").velocity({
        translateY: "-100%"
    }, 625, function () {
        menuIsOpen = false;
        $("#MenuButton").css("pointer-events", "auto");
        $("#MenuCloseButton").css("pointer-events", "auto");
    });
}

function showMenu() {
    $("#menuDiv").css("left", $("#MenuButton").offset().left + "px");
    $("#blackScreen").fadeIn();
    $("#menuDiv").velocity({
        translateY: "0%"
    }, 625, function () {
        menuIsOpen = true;
        $("#MenuButton").css("pointer-events", "auto");
        $("#MenuCloseButton").css("pointer-events", "auto");
    });
}

//Clique no botão de menu
$(document).on("click", "#MenuButton", function () {
    $(this).css("pointer-events", "none");
    showMenu();
});

$(document).on("click", "#MenuCloseButton", function () {
    $(this).css("pointer-events", "none");
    hideMenu();
});

//Clique em uma das opções
$(document).on("click", ".menuRow", function () {
    var menuRow = this;
    $("#menuDiv").css("left", $("#MenuButton").offset().left + "px");
    $("#blackScreen").fadeOut();
    $("#menuDiv").velocity({
        translateY: "-100%"
    }, 625, function () {
        menuIsOpen = false;
        $("#MenuButton").css("pointer-events", "auto");
        $("#MenuCloseButton").css("pointer-events", "auto");
        if (currentCivilization == undefined) {
            saveMap();
        }
        transitionToCivilizationMenu($(menuRow));
    });

});

//Clicar fora retira o menu
$(document).on("click", "#blackScreen", function () {
    if (menuIsOpen) {
        hideMenu();
    }
});
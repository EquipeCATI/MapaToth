var menuIsOpen = false;


function hideMenu() {
    $("#menuDiv").animate({
        x: "-100%",
        translayteY: "-100%"
    }, 625, function () {
        menuIsOpen = false;
        $("#MenuButton").css("pointer-events", "auto");
        $("#MenuCloseButton").css("pointer-events", "auto");
    });
}

function showMenu() {
    $("#menuDiv").transition({
        x: "0%",
        y: "0%"
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
    $("#MenuButton").trigger("click");
    if (currentCivilization == undefined) {
        saveMap();
    }
    transitionToCivilizationMenu($(this));
});

//Clicar fora retira o menu
$(document).on("click", "#mainDiv", function () {
    if (menuIsOpen) {
        hideMenu();
    }
});
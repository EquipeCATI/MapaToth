var menuIsOpen = false;


function hideMenu() {
    $("#menuDiv").transition({
        scale: "0"
    }, 625, function () {
        menuIsOpen = false;
        $("#MenuButton").css("pointer-events", "auto");
    });
}

function showMenu() {
    $("#menuDiv").transition({
        scale: "1"
    }, 625, function () {
        menuIsOpen = true;
        $("#MenuButton").css("pointer-events", "auto");
    });
}

//Clique no botão de menu
$(document).on("click", "#MenuButton", function () {
    $(this).css("pointer-events", "none");

    if (menuIsOpen) {
        hideMenu();
    } else {
        showMenu();
    }
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
var preload = new createjs.LoadQueue(true);
var line;
var civilizations = [];
var cosmogonyDisplay = [];

function loadAssets() {
    var imgManifest = [];
    preload.on("error", handleError);
    preload.on("progress", handleProgress);

    $.each(civilizations, function () {
        //Fundo para os botões
        var img = {
            src: this.name + "/menu.png",
            id: "menu" + this.name
        };
        imgManifest.push(img);

        //Textura de background da pagina
        img = {
            src: this.name + "/menuBackground.png",
            id: "menuBackground" + this.name
        };

        imgManifest.push(img);

        //Botões
        img = {
            src: this.name + "/Cosmogonia/Botao.png",
            id: "cosmogonyButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: this.name + "/Teogonia/Botao.png",
            id: "teogonyButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: this.name + "/Cultura/Botao.png",
            id: "cultureButton" + this.name
        };
        imgManifest.push(img);
        
        //Background para Cosmogonia, Teogonia e Cultura
        
        img = {
            src: this.name + "/Cosmogonia/cosmogonyBackground.png",
            id: "cosmogonyBg" + this.name
        };
        imgManifest.push(img);

    });

    preload.loadManifest(imgManifest, true, "Conteudo/Civilizacoes/");
}

function handleComplete() {
    $("#progress").fadeOut();
    $("#mainDiv").fadeIn();
    $("#mainDiv *").fadeIn();
    updateMarkers();
}

function handleError() {
    console.log("deu merda");
}

function handleProgress(event) {
    line.animate(event.progress, function () {
        if (event.progress == 1)
            handleComplete();
    });
}


$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "Conteudo/Civilizacoes.xml",
        dataType: "xml",
        success: parseXML
    });

    $("#mainDiv").fadeOut(0);
    $("#mainDiv *").fadeOut(0);

    line = new ProgressBar.Line('#progress', {
        color: '#FCB03C'
    });
});


function parseXML(xml) {

    $(xml).find("Civilization").each(function () {
        var civilization = new Civilization($(this));
        civilizations.push(civilization);
    });
    
    $(xml).find("display").each(function () {
        var display = new CosmogonyDisplay($(this));
        cosmogonyDisplay.push(display);
    });

    loadAssets();

    $.each(civilizations, function () {
        $("#mapDiv").append("<img src='Conteudo/Civilizacoes/" + this.name + "/MarcadorMapa.png' alt='Cidade " + this.name + "' id='" + this.name + "' class='MapMarker'/>");

        var marker = $("#" + this.name);
        marker.css("top", this.mapMarker.topSpace);
        marker.css("left", this.mapMarker.leftSpace);
        marker.data("civilization", this);
    });

    civilizations = [];

    updateMarkers();
}
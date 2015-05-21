var preload = new createjs.LoadQueue(true);
var line;
var civilizations = [];

function loadAssets() {
    var imgManifest = [];
    preload.on("error", handleError);
    preload.on("progress", handleProgress);

    var img = {
        src: "seta.png",
        id: "seta"
    };
    imgManifest.push(img);

    img = {
        src: "mapNavIcon.png",
        id: "mapNavItem"
    };
    imgManifest.push(img);

    img = {
        src: "bg.png",
        id: "bg"
    };
    imgManifest.push(img);

    $.each(civilizations, function () {
        //Fundo para os botões
        img = {
            src: "Civilizacoes/" + this.name + "/menu.png",
            id: "menu" + this.name
        };
        imgManifest.push(img);

        //Textura de background da pagina inicial da civilização
        img = {
            src: "Civilizacoes/" + this.name + "/menuBackground.png",
            id: "menuBackground" + this.name
        };

        imgManifest.push(img);

        //Textura de background da teogonia da civilização
        img = {
            src: "Civilizacoes/" + this.name + "/Teogonia/teogonyBackground.png",
            id: "teogonyBackground" + this.name
        };

        imgManifest.push(img);


        //Botões
        img = {
            src: "Civilizacoes/" + this.name + "/Cosmogonia/Botao.png",
            id: "cosmogonyButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Teogonia/Botao.png",
            id: "teogonyButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/Botao.png",
            id: "cultureButton" + this.name
        };
        imgManifest.push(img);

        //Botões cultura
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/ManifestacaoCultural.png",
            id: "culturalManifestationButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/MetodoDeSubsistencia.png",
            id: "subsistenceMethodButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/EstruturaSocial.png",
            id: "socialStructureButton" + this.name
        };
        imgManifest.push(img);

        //Botoes de navegação
        img = {
            src: "Civilizacoes/" + this.name + "/mainNavItem.png",
            id: "mainNavItem" + this.name
        };
        imgManifest.push(img);

        $.each(this.gods, function () {
            img = {
                src: "Civilizacoes/" + this.civilization.name + "/Teogonia/" + this.name + ".png",
                id: this.name
            };
            imgManifest.push(img);
        });
    });

    preload.loadManifest(imgManifest, true, "Conteudo/");
}

function handleComplete() {
    $("#progress").fadeOut();
    $("#mainDiv").fadeIn();
    $("#mainDiv *").fadeIn();
    $("#MenuButton").fadeIn();
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

    //Leitura do XML
    $.ajax({
        type: "GET",
        url: "Conteudo/Civilizacoes.xml",
        dataType: "xml",
        success: parseXML
    });

    $("#mainDiv").fadeOut(10);
    $("#mainDiv *").fadeOut(10);
    $("#MenuButton").fadeOut(10);

    $('#menuDiv').css({
        transformOrigin: "0px 0px"
    });
    $("#menuDiv").transition({
        scale: "0"
    }, 0);

    line = new ProgressBar.Line('#progress', {
        color: '#FCB03C'
    });
});

function parseXML(xml) {

    //Para cada civilização lida no XML, é criado um objeto Civilization e este é salvo no array civilizations
    $(xml).find("Civilization").each(function () {
        var civilization = new Civilization($(this));
        civilizations.push(civilization);
    });

    //Carregamento de arquivos, feito aqui pois depende dos objetos Civilization 
    loadAssets();


    $.each(civilizations, function () {
        //Criação do marcador de mapa
        $("#mapDiv").append("<img src='Conteudo/Civilizacoes/" + this.name + "/MarcadorMapa.png' alt='Cidade " + this.name + "' id='" + this.name + "' class='MapMarker'/>");

        var marker = $("#" + this.name);

        //Posicionamento de acordo com os dados do XML
        marker.css("top", this.mapMarker.topSpace);
        marker.css("left", this.mapMarker.leftSpace);

        marker.data("civilization", this);

        //Criação do ícone no menu
        $("#menuUl").append("<li id='menuRow" + this.name + "' class='menuRow'><p><img src='Conteudo/Civilizacoes/" + this.name + "/MarcadorMapa.png' class='menuIcon'/>" + this.name + "</p>");

        $("#menuRow" + this.name).data("civilization", this);


    });

    civilizations = [];

    $("#menuDiv").mCustomScrollbar({
        theme: "dark-thin"
    });

    updateMarkers();
}
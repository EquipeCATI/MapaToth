var preload = new createjs.LoadQueue(true);
var line;
var civilizations = [];

//Uso da biblioteca PreloadJS, para um carregamento prévio de todas as mídias usadas
function loadAssets() {
    //O manifest é uma lista de mídias que serão carregadas
    var manifest = [];

    //Cada erro que ocorrer será lidado com a função handleError
    preload.on("error", handleError);

    //A cada item carregado, este evento aciona handleProgress
    preload.on("progress", handleProgress);

    //Extensões procuradas caso o tipo de arquivo não seja suportado
    createjs.Sound.alternateExtensions = ["mp3", "m4a", "wav", "ogg"];
    var manifestAudio = [];


    //Configurando para que sons sejam lidos no Preload
    createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);
    createjs.Sound.initializeDefaultPlugins();
    preload.installPlugin(createjs.Sound);

    //Cada uma das imagens possui um path e são obtidas pelo seu id posteriormente
    //preloadjs.getResult("id")

    var sound = {
        src: "Sons/Mapa.mp3",
        id: "mapMusic"
    };
    manifest.push(sound);

    sound = {
        src: "Sons/TrocaCultura.mp3",
        id: "paperFold"
    };
    manifest.push(sound);

    var img = {
        src: "Imagens/SetaNavegacao.png",
        id: "setaNavegacao"
    };
    manifest.push(img);

    var img = {
        src: "Imagens/SetaPapel.png",
        id: "setaPapel"
    };
    manifest.push(img);

    var img = {
        src: "Imagens/SetaPapelPreenchida.png",
        id: "setaPapelPreenchida"
    };
    manifest.push(img);

    var img = {
        src: "Imagens/Mapa.png",
        id: "map"
    };
    manifest.push(img);

    var img = {
        src: "Imagens/Som.png",
        id: "sound"
    };
    manifest.push(img);

    var img = {
        src: "Imagens/SemSom.png",
        id: "noSound"
    };
    manifest.push(img);

    img = {
        src: "Imagens/IconeNavegacaoMapa.png",
        id: "mapNavItem"
    };
    manifest.push(img);

    img = {
        src: "Imagens/IconeNavegacaoCultura.png",
        id: "cultureNavItem"
    };
    manifest.push(img);

    img = {
        src: "Imagens/IconeNavegacaoTeogonia.png",
        id: "teogonyNavItem"
    };
    manifest.push(img);

    img = {
        src: "Imagens/FundoConteudo.png",
        id: "bg"
    };
    manifest.push(img);

    //Mídia variável, lida de cada uma das civilizações cadastradas
    $.each(civilizations, function () {


        sound = {
            src: "Civilizacoes/" + this.name + "/Sons/Musica.mp3",
            id: this.name
        };
        manifest.push(sound);

        /*
        sound = {
            src: "Civilizacoes/" + this.name + "/Cosmogonia/Sons/Musica.mp3",
            id: this.name + "Culture"
        };
        manifest.push(sound);

        sound = {
            src: "Civilizacoes/" + this.name + "/Teogonia/Sons/Musica.mp3",
            id: this.name + "Teogony"
        };
        manifest.push(sound);
        */



        //Fundo para os botões
        img = {
            src: "Civilizacoes/" + this.name + "/Imagens/TelaInicial.png",
            id: "menu" + this.name
        };
        manifest.push(img);

        /*

        //Textura de background da pagina inicial da civilização
        img = {
            src: "Civilizacoes/" + this.name + "/menuBackground.png",
            id: "menuBackground" + this.name
        };

        manifest.push(img);

        //Textura de background da teogonia da civilização
        img = {
            src: "Civilizacoes/" + this.name + "/Teogonia/teogonyBackground.png",
            id: "teogonyBackground" + this.name
        };

        manifest.push(img);
        
        */

        //Botões
        img = {
            src: "Civilizacoes/" + this.name + "/Cosmogonia/Botao.png",
            id: "cosmogonyButton" + this.name
        };
        manifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Teogonia/Botao.png",
            id: "teogonyButton" + this.name
        };
        manifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/Botao.png",
            id: "cultureButton" + this.name
        };
        manifest.push(img);

        //Botões cultura
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/ManifestacaoCultural.png",
            id: "culturalManifestationButton" + this.name
        };
        manifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/MetodoDeSubsistencia.png",
            id: "subsistenceMethodButton" + this.name
        };
        manifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/EstruturaSocial.png",
            id: "socialStructureButton" + this.name
        };
        manifest.push(img);

        //Botão de navegação
        img = {
            src: "Civilizacoes/" + this.name + "/Imagens/IconeNavegacao.png",
            id: "mainNavItem" + this.name
        };
        manifest.push(img);

        //ícone do mapa
        img = {
            src: "Civilizacoes/" + this.name + "/Imagens/MarcadorMapa.png",
            id: "marker" + this.name
        };
        manifest.push(img);

        //Imagens dos Deuses
        $.each(this.gods, function () {
            img = {
                src: "Civilizacoes/" + this.civilization.name + "/Teogonia/" + this.name + ".png",
                id: this.name
            };
            manifest.push(img);
        });
    });

    preload.loadManifest(manifest, true, "Conteudo/");
}

function handleComplete() {
    $("#progress").fadeOut();
    $("#mainDiv").fadeIn();
    $("#mainDiv *").fadeIn();
    initNavController();
    $("#header").fadeIn(function () {
        createjs.Sound.play("mapMusic", {
            volume: 0.7,
            loop: -1
        });
    });

    addCivilizations();
}

function handleError() {
    console.log("erro");
}

//Animação da barra de carregamento de acordo com o progress informado no evento
function handleProgress(event) {
    line.animate(event.progress, function () {
        if (event.progress == 1) {
            preloadFinished = true;
            handleComplete();
        }

    });
}

$(document).ready(function () {

    //Leitura do XML
    $.ajax({
        type: "GET",
        url: "Conteudo/Civilizacoes/Civilizacoes.xml",
        dataType: "xml",
        success: parseXML
    });

    //Elementos iniciais são escondidos e só reaparecem após o carregamento
    $("#mainDiv").fadeOut(10);
    $("#mainDiv *").fadeOut(10);
    $("#header").fadeOut(10);

    //ponto de transformação do menu mudado para o canto esquerdo
    $('#menuDiv').css({
        transformOrigin: "0px 0px"
    });

    //Uso da biblioteca progressBar para a criação de uma barra de carregamento em SVG
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
}

function addCivilizations() {
    $.each(civilizations, function () {
        //Criação do marcador de mapa

        var markerImg = preload.getResult("marker" + this.name);
        $(markerImg).attr("alt", "Cidade " + this.name);
        $(markerImg).attr("id", this.name);
        $(markerImg).addClass("MapMarker");

        $("#mapDiv").append(markerImg);

        var marker = $("#" + this.name);

        //Posicionamento de acordo com os dados do XML
        marker.css("top", this.mapMarker.topSpace);
        marker.css("left", this.mapMarker.leftSpace);

        marker.data("civilization", this);

        //Criação do ícone no menu
        var mainNavImg = preload.getResult("mainNavItem" + this.name);
        $(mainNavImg).addClass("menuIcon");

        $("#menuUl").append("<li id='menuRow" + this.name + "' class='menuRow'><p></p>");
        $("#menuRow" + this.name + " > p").append(mainNavImg);
        $("#menuRow" + this.name + " > p").append(this.name);
        $("#menuRow" + this.name).data("civilization", this);


    });

    var children = $("#menuUl").children();
    if (children.length % 2 != 0) {
        var last = $(children).last();
        $(last).css("display", "block");
    }

    addSliderMarkers();

    $("#menuDiv ul").mCustomScrollbar({
        theme: "dark-thin"
    });

    //Ícones de marcadores no mapa são carregados

    updateMarkers(); //map.js
}
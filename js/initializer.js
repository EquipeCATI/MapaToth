var preload = new createjs.LoadQueue(true);
var line;
var defaultDropCapFont;
var defaultBodyFont;
var civilizations = [];
var cosmogonyDisplay = [];

$(document).ready(function () {

    //Leitura do XML
    $.ajax({
        type: "GET",
        url: "Conteudo/Fontes/fontConfig.xml",
        dataType: "xml",
        success: parseFonts
    });

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
    $("#menuDiv").fadeOut(10);


    line = new ProgressBar.Circle('#progress', {
        color: '#49392d',
        strokeWidth: 3,
        trailWidth: 1,
        trailColor: '#99897d',
        duration: 1500,
        text: {
            value: '0',
            className: "progressText"
        },
        step: function (state, bar) {
            bar.setText((bar.value() * 100).toFixed(0) + "%");
        }
    });

    $("#compass").velocity({
        rotateZ: "-45deg"
    }, 625, rotateCompass);


    hideMenu();
});

function handleComplete(event) {
    $("#initialDiv").css("position", "fixed");
    $("#compass").clearQueue();
    $("#compass").stop();
    $("#compass").velocity("stop");
    $("#compass").velocity("stop", true);
    $("#initialDiv").velocity({
        translateY: "100%"
    }, 2500, function () {
        $(this).fadeOut();
    });


    $("#mainDiv").fadeIn();
    $("#mainDiv *:not(#blackScreen)").fadeIn();
    $("#menuDiv").fadeIn();
    initNavController();
    $(window).trigger("resize");

    $("#header").fadeIn(function () {
        createjs.Sound.play("mapMusic", {
            volume: 0.7,
            loop: -1
        });
    });

    addCivilizations();
    updateMarkers(); //map.js
    $("#slider").trigger("input");
}

function handleError(event) {
    //console.log("erro lendo o arquivo: " + event.fileName);
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
    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]);
    createjs.Sound.initializeDefaultPlugins();

    //Cada uma das imagens possui um path e são obtidas pelo seu id posteriormente
    //preloadjs.getResult("id")

    var sound = {
        src: "Sons/Mapa.mp3",
        id: "mapMusic"
    };
    manifestAudio.push(sound);

    sound = {
        src: "Sons/TrocaCultura.mp3",
        id: "paperFold"
    };
    manifestAudio.push(sound);

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
        src: "Imagens/IconeNavegacaoCosmogonia.png",
        id: "cosmogonyNavItem"
    };
    manifest.push(img);

    img = {
        src: "Imagens/FundoConteudo.png",
        id: "bg"
    };
    manifest.push(img);

    img = {
        src: "Imagens/SliderMarker.png",
        id: "sliderMarker"
    };
    manifest.push(img);

    img = {
        src: "Imagens/SetaReiniciar.png",
        id: "setaReiniciar"
    };
    manifest.push(img);





    //Mídia variável, lida de cada uma das civilizações cadastradas
    $.each(civilizations, function () {


        sound = {
            src: "Civilizacoes/" + this.name + "/Sons/Musica.mp3",
            id: this.name
        };
        manifestAudio.push(sound);

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
    createjs.Sound.registerSounds(manifestAudio, "Conteudo/");
}



function rotateCompass() {
    $("#compass").velocity({
        rotateZ: 45 - 45 * line.value() + "deg"
    }, 1250 - 1250 * line.value(), function () {
        $("#compass").velocity({
            rotateZ: -45 + 45 * line.value() + "deg"
        }, 1250 - 1250 * line.value(), rotateCompass);
    });
}

function parseFonts(xml) {
    defaultDropCapFont = new Font($(xml).find("dropCapFont"));
    defaultBodyFont = new Font($(xml).find("bodyFont"));

    $('head').append("<style>\
                @font-face {\
                    font-family: '" + defaultDropCapFont.name + "';\
                    src: url('../Conteudo/Fontes/" + defaultDropCapFont.name + "." + defaultDropCapFont.format + "');\
                }\
            </style>");

    $('head').append("<style>\
                @font-face {\
                    font-family: '" + defaultBodyFont.name + "';\
                    src: url('../Conteudo/Fontes/" + defaultBodyFont.name + "." + defaultBodyFont.format + "');\
                }\
            </style>");

}


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
    var mostAncientCentury = civilizations[0].originCentury;
    var mostRecentCentury = civilizations[0].endingCentury;

    $.each(civilizations, function () {
        //Criação do marcador de mapa

        if (this.originCentury < mostAncientCentury) {
            mostAncientCentury = this.originCentury;
        }

        if (this.endingCentury > mostRecentCentury) {
            mostRecentCentury = this.originCentury;
        }

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

        if (this.dropCapFont) {
            $('head').append("<style>\
                @font-face {\
                    font-family: '" + this.dropCapFont.name + "';\
                    src: url('../Conteudo/Civilizacoes/" + this.name + "/Fontes/" + this.dropCapFont.name + "." + this.dropCapFont.format + "');\
                }\
            </style>");
        }

        if (this.bodyFont) {
            $('head').append("<style>\
                @font-face {\
                    font-family: '" + this.bodyFont.name + "';\
                    src: url('../Conteudo/Civilizacoes/" + this.name + "/Fontes/" + this.bodyFont.name + "." + this.bodyFont.format + "');\
                }\
            </style>");
        }

    });

    $("#slider").attr("min", mostAncientCentury - 5 + "");
    $("#slider").attr("max", mostRecentCentury + 5 + "");

    var children = $("#menuUl").children();
    if (children.length % 2 != 0) {
        var last = $(children).last();
        $(last).css("display", "block");
    }

    addSliderMarkers();


    $("#menuDiv").mCustomScrollbar({
        theme: "dark-thin"
    });

    //Ícones de marcadores no mapa são carregados


}
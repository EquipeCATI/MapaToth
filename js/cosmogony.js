    var currentDisplayIndex = 0;

    function transitionToCivilizationCosmogony() {
        for (var i = 0; i < $(currentCivilization.display).length; i++) {
            cosmogonyDisplay[i] = {
                animationSource: "Conteudo/Civilizacoes/" + currentCivilization.name + "/Cosmogonia/animations/" + currentCivilization.display[i].animation + ".swf"
            };
        }

        $("#mainDiv").fadeOut(165, function () {

            //Se tirar o contentDiv, n precisa pegar a folha de novo
            //o content anterior era o templo
            $("#contentDiv").empty();

            //Folha
            //var bg = preload.getResult('bg')
            //$(bg).attr("id", "bg");

            //$("#bodyDiv").prepend(bg);

            //montando a disposição inicual da página.
            $("#contentDiv").append("<div id='cosmogonyDiv'></div>");
            $("#cosmogonyDiv").append("<div id='cosmogonyText'></div>");

            //Construção do object
            //$("#cosmogonyText").append("<p id='text'>'"+ cosmogonyDisplay[0].animation+"'</p>");
            $("#cosmogonyText").append('<object codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,2,0" >');
            $("#cosmogonyText").append('<param class="swfSource" name=movie value="' + cosmogonyDisplay[0].animationSource + '">');
            $("#cosmogonyText").append('<param name=quality value=high>');
            $("#cosmogonyText").append('<embed class="swfSource" src="' + cosmogonyDisplay[0].animationSource + '" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash"></embed></object>');

            //fim
            $("#cosmogonyDiv").append("<img id='cosmoNext' src=''>");
            $("#cosmoNext").attr('src', $(preload.getResult("setaPapelPreenchida")).attr('src'));

            $("#cosmogonyDiv").append("<img id='cosmoPrev' src=''>");
            $("#cosmoPrev").attr('src', $(preload.getResult("setaPapelPreenchida")).attr('src'));

            $("#cosmoPrev").css("display", "none");






            //$("#mainDiv").append("<img src='../Conteudo/compass.jpg' class='cosmoNext'></img>");
            //$("#cosmogonyDiv").append("<img src='../Conteudo/compass.jpg' class='cosmoBack'></img>");
            //$("#cosmogonyDiv").append("<img src='../Conteudo/compass.jpg' class='MapButton'></img>");
            $("#mainDiv").fadeIn(1250, function () {
                addNavIconNamed("cosmogony");
            });
        });
    }


    //Listeners da navegação
    $(document).on('click', '#cosmoNext', function () {
        currentDisplayIndex++;
        $("#cosmogonyText").fadeOut(900, function () {
            $(".swfSource").attr('src', cosmogonyDisplay[currentDisplayIndex].animationSource);
            $("#cosmogonyText").fadeIn(900);
        });
        $("#cosmogonyAnimation").empty(); //ajustar depois de decidir como serão feitas as animações.


        checkNavigation();



    });


    $(document).on('click', '#cosmoPrev', function () {
        currentDisplayIndex--;
        $("#cosmogonyText").fadeOut(900, function () {
            $(".swfSource").attr('src', cosmogonyDisplay[currentDisplayIndex].animationSource);
            $("#cosmogonyText").fadeIn(900);
        });
        checkNavigation();


    });

    $(document).on('click', '#rewind', function () {
        currentDisplayIndex = 0;
        $("#cosmogonyText").fadeOut(900, function () {
            $(".swfSource").attr('src', cosmogonyDisplay[currentDisplayIndex].animationSource);
            $("#cosmogonyText").fadeIn(900);
        });
        checkNavigation();

    });

    //controle do aparecimento dos botões.
    function checkNavigation() {

        if (cosmogonyDisplay[currentDisplayIndex + 1] == undefined) { //quando é a última página
            $("#cosmoNext").fadeOut(900, function () {

                $("#cosmoNext").attr("src", "Conteudo/Civilizacoes/Grega/rewind.png");
                $("#cosmoNext").fadeIn(900, function () {
                    $("#cosmoNext").attr("id", "rewind");
                });
            });

            //Próximas 3 linhas apenas para controle de interface.
            $("#cosmoPrev").fadeOut(900, function () {
                $("#cosmoPrev").fadeIn(900);
            });

        } else if (currentDisplayIndex == 0) { //quando é a primmeira página

            if ($("#rewind").parents("#cosmogonyDiv").length == 1) { //checa se rewind é filho de cosmogonyDiv.
                $("#rewind").fadeOut(900, function () {
                    $("#rewind").attr("src", $(preload.getResult("setaPapelPreenchida")).attr('src'));
                    $("#rewind").fadeIn(900, function () {
                        $("#rewind").attr("id", "cosmoNext");
                    });
                });
            } else {
                $("#cosmoNext").fadeOut(900, function () {
                    $("#cosmoNext").fadeIn(900);
                });
            }


            $("#cosmoPrev").fadeOut(900);

        } else { //quando é umas das páginas intermediárias

            if ($("#rewind").parents("#cosmogonyDiv").length == 1) { //checa se rewind é filho de cosmogonyDiv.
                $("#rewind").fadeOut(900, function () {
                    $("#rewind").attr("src", $(preload.getResult("setaPapelPreenchida")).attr('src'));
                    $("#rewind").fadeIn(900, function () {
                        $("#rewind").attr("id", "cosmoNext");
                    });
                });
                $("#cosmoPrev").fadeOut(900, function () {
                    $("#cosmoPrev").fadeIn(900);
                });
            } else {
                $("#cosmoNext").fadeOut(900, function () {
                    $("#cosmoNext").fadeIn(900);
                });
                if (currentDisplayIndex - 1 == 0) {
                    setTimeout(function () { // criando um delay para sincronizar o surgimento da interface.
                        $("#cosmoPrev").fadeIn(900);
                    }, 900);
                } else {
                    $("#cosmoPrev").fadeOut(900, function () {
                        $("#cosmoPrev").fadeIn(900);
                    });
                }
            }

        }
    }
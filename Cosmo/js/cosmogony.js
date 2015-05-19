    var currentDisplayIndex = 0;   
    function transitionToCivilizationCosmogony() {

            $("#mainDiv").fadeOut(1250, function () {

                $("#mainDiv").empty();        
                $("#mainDiv").css("background-image", "url('" + $(preload.getResult('cosmogonyBg' + currentCivilization.name)).attr('src') + "')");

                //$("#mainDiv").css("verticalAlign", "bottom");
                $("#mainDiv").append("<div id='cosmogonyDiv'></div>");
                $("#cosmogonyDiv").append("<div id='cosmogonyText'></div>");
                $("#cosmogonyDiv").append("<div id='cosmogonyAnimation'></div>");
                $("#cosmogonyText").append("<p id='text'>'"+ cosmogonyDisplay[0].cosmoText+"'</p>");
                $("#cosmogonyDiv").append("<img id='cosmoNext' src='Conteudo/Civilizacoes/Grega/seta.png'>");
                //discutir com Jagni onde vai ficar a imagem antes de colocar no preload.
                $("#cosmogonyDiv").append("<img id='cosmoPrev' src='Conteudo/Civilizacoes/Grega/seta.png'>");
                $("#cosmoPrev").transit({
                    rotate: '180deg'        
                },0);
                $("#cosmoPrev").css("display", "none");
                //discutir com Jagni onde vai ficar a imagem antes de colocar no preload.






                //$("#mainDiv").append("<img src='../Conteudo/compass.jpg' class='cosmoNext'></img>");
                //$("#cosmogonyDiv").append("<img src='../Conteudo/compass.jpg' class='cosmoBack'></img>");
                $("#cosmogonyDiv").append("<img src='../Conteudo/compass.jpg' class='MapButton'></img>");
                $("#mainDiv").fadeIn(1250);
            });
        }


    //Listeners da navegação
                $(document).on('click', '#cosmoNext', function () {
                    currentDisplayIndex++;
                    $("#cosmogonyText").fadeOut(900, function(){
                        $("#cosmogonyText").find("p").text(cosmogonyDisplay[currentDisplayIndex].cosmoText);
                        $("#cosmogonyText").fadeIn(900);
                    });
                    $("#cosmogonyAnimation").empty();//ajustar depois de decidir como serão feitas as animações.


                    checkNavigation();



                });


                $(document).on('click', '#cosmoPrev', function () {
                    currentDisplayIndex--;
                    $("#cosmogonyText").fadeOut(900, function(){
                        $("#cosmogonyText").find("p").text(cosmogonyDisplay[currentDisplayIndex].cosmoText);
                        $("#cosmogonyText").fadeIn(900);
                    });
                    checkNavigation();


                });

                $(document).on('click', '#rewind', function () {
                    currentDisplayIndex = 0;
                    $("#cosmogonyText").fadeOut(900, function(){
                        $("#cosmogonyText").find("p").text(cosmogonyDisplay[currentDisplayIndex].cosmoText);
                        $("#cosmogonyText").fadeIn(900);
                    });
                    checkNavigation();

                });

                //controle do aparecimento dos botões.
                function checkNavigation(){

                    if(cosmogonyDisplay[currentDisplayIndex + 1] == undefined){//quando é a última página
                        $("#cosmoNext").fadeOut(900, function(){
                            
                            $("#cosmoNext").attr("src", "Conteudo/Civilizacoes/Grega/rewind.png");
                            $("#cosmoNext").fadeIn(900, function(){
                                $("#cosmoNext").attr("id", "rewind");
                            });
                        }); 
                        //Próximas 3 linhas apenas para controle de interface.
                        $("#cosmoPrev").fadeOut(900, function(){
                            $("#cosmoPrev").fadeIn(900);
                        });

                    }
                    else if(currentDisplayIndex == 0){//quando é a primmeira página

                            if($("#rewind").parents("#cosmogonyDiv").length == 1){//checa se rewind é filho de cosmogonyDiv.
                                $("#rewind").fadeOut(900, function(){
                                $("#rewind").attr("src", "Conteudo/Civilizacoes/Grega/seta.png");
                                    $("#rewind").fadeIn(900, function(){
                                        $("#rewind").attr("id", "cosmoNext");
                                    });   
                                });
                            }
                            else{
                                $("#cosmoNext").fadeOut(900, function(){
                                    $("#cosmoNext").fadeIn(900);
                                });
                            }


                        $("#cosmoPrev").fadeOut(900);

                    }
                    else{//quando é umas das páginas intermediárias
                                    
                        if($("#rewind").parents("#cosmogonyDiv").length == 1){//checa se rewind é filho de cosmogonyDiv.
                                $("#rewind").fadeOut(900, function(){
                                    $("#rewind").attr("src", "Conteudo/Civilizacoes/Grega/seta.png");
                                    $("#rewind").fadeIn(900, function(){
                                        $("#rewind").attr("id", "cosmoNext");
                                    });   
                                });
                                $("#cosmoPrev").fadeOut(900, function(){
                                    $("#cosmoPrev").fadeIn(900);
                                });
                            }
                            else{
                                $("#cosmoNext").fadeOut(900, function(){
                                    $("#cosmoNext").fadeIn(900);
                                });
                                if(currentDisplayIndex -1 == 0){
                                    setTimeout(function(){// criando um delay pra sincronizar o surgimento da interface.
                                    $("#cosmoPrev").fadeIn(900);
                                    }, 900);                            
                                }
                                else{
                                    $("#cosmoPrev").fadeOut(900, function(){
                                    $("#cosmoPrev").fadeIn(900);
                                    });
                                }
                            }
                        
                    }
                }
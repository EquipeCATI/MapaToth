    var currentDisplayIndex = 0;   
    function transitionToCivilizationCosmogony() {

            $("#mainDiv").fadeOut(165, function () {

                $("#mainDiv").empty();        
               // $("#mainDiv").css("background-image", "url('" + $(preload.getResult('cosmogonyBg' + currentCivilization.name)).attr('src') + "')");

                //Folha
                var bg = preload.getResult('bg')
                $(bg).attr("id", "bg");

                $("#mainDiv").prepend(bg);
                
                //montando a disposição inicual da página.
                $("#mainDiv").append("<div id='cosmogonyDiv'></div>");
                $("#cosmogonyDiv").append("<div id='cosmogonyText'></div>");
                
                //Construção do object
                //$("#cosmogonyText").append("<p id='text'>'"+ cosmogonyDisplay[0].animation+"'</p>");
                $("#cosmogonyText").append('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,2,0"');
                //$("#cosmogonyText").append('<param name=movie value="'+$(preload.getResult("animation0")).attr('src')+'">');
                $("#cosmogonyText").append('<param name=quality value=high>');
               // $("#cosmogonyText").append('<embed src="'+$(preload.getResult("animation0")).attr('src')+'" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash"></embed></object>');     
                
                //fim
                $("#cosmogonyDiv").append("<img id='cosmoNext' src=''>");
                $("#cosmoNext").attr('src', $(preload.getResult("setaPapelPreenchida")).attr('src'));

                $("#cosmogonyDiv").append("<img id='cosmoPrev' src=''>");
                $("#cosmoPrev").attr('src', $(preload.getResult("setaPapelPreenchida")).attr('src'));
                
                $("#cosmoPrev").css("display", "none");






                //$("#mainDiv").append("<img src='../Conteudo/compass.jpg' class='cosmoNext'></img>");
                //$("#cosmogonyDiv").append("<img src='../Conteudo/compass.jpg' class='cosmoBack'></img>");
                //$("#cosmogonyDiv").append("<img src='../Conteudo/compass.jpg' class='MapButton'></img>");
                $("#mainDiv").fadeIn(1250);
            });
        }


    //Listeners da navegação
                $(document).on('click', '#cosmoNext', function () {
                    currentDisplayIndex++;
                    $("#cosmogonyText").fadeOut(900, function(){
                        $("#cosmogonyText").find("p").text(cosmogonyDisplay[currentDisplayIndex].animation);
                        $("#cosmogonyText").fadeIn(900);
                    });
                    $("#cosmogonyAnimation").empty();//ajustar depois de decidir como serão feitas as animações.


                    checkNavigation();



                });


                $(document).on('click', '#cosmoPrev', function () {
                    currentDisplayIndex--;
                    $("#cosmogonyText").fadeOut(900, function(){
                        $("#cosmogonyText").find("p").text(cosmogonyDisplay[currentDisplayIndex].animation);
                        $("#cosmogonyText").fadeIn(900);
                    });
                    checkNavigation();


                });

                $(document).on('click', '#rewind', function () {
                    currentDisplayIndex = 0;
                    $("#cosmogonyText").fadeOut(900, function(){
                        $("#cosmogonyText").find("p").text(cosmogonyDisplay[currentDisplayIndex].animation);
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
                                $("#rewind").attr("src", $(preload.getResult("setaPapelPreenchida")).attr('src'));
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
                                    $("#rewind").attr("src", $(preload.getResult("setaPapelPreenchida")).attr('src'));
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
                                    setTimeout(function(){// criando um delay para sincronizar o surgimento da interface.
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
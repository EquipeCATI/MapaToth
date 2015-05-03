var civilizations = [];

function Civilization(xmlNode){
    this.name = $(xmlNode).find("name").text();
    this.mapMarker = new MapMarker($(xmlNode).find("mapMarker"));
    this.originYear = $(xmlNode).find("originYear").text();
    this.endingYear = $(xmlNode).find("endingYear").text();
}

function MapMarker(xmlNode){
    this.topSpace = $(xmlNode).find("top").text();
    this.leftSpace = $(xmlNode).find("left").text();
}

function parseXML(xml){
    
    $(xml).find("Civilization").each(function()
    {        
        var civilization = new Civilization($(this));
        civilizations.push(civilization);
    });
                                     
    $.each(civilizations, function() {
        var DOMMarker = 
        $("#mapDiv").append("<img src='grecia.jpg' alt='Cidade " + this.name + "' id='" + this.name + "' class='mapMarker'/>");
        $("#"+this.name).css("top", this.mapMarker.topSpace);
        $("#"+this.name).css("left", this.mapMarker.leftSpace);
    });
}

$(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: "civilizations.xml",
        dataType: "xml",
        success: parseXML
    });
    
    
    
    $(".mapMarker").click(function() {
       
    });
    
    $("#slider").change( function() {
        $.each(civilizations, function() {
            if(this.originYear < $("#slider").val() && this.endingYear > $("#slider").val()){
                $("#"+this.name).fadeIn();
            }
            
            else{
                $("#"+this.name).fadeOut();
            }
        });
    
    });
    
});

$(document).on('click', '.mapMarker', function() { 
    var originalDiv = $("#mapDiv").clone(true);

    //Leitura da posição do marcador
    var origin = $(this).position();

    var x = origin.left + $(this).width()/2;
    var y = origin.top + $(this).height()/2;

    //Setando o ponto de origem de Scale, faz o zoom ir na direção do marcador
    $('.map').css({ transformOrigin: "" + x + "px " + y + "px"});

    $('.map').transition({
        scale : '3'
    }, 1250);

    $(this).transition({
        scale : '3'
    }, 1250, function(){

        //Restaurando o mapa ao estado salvo, pode ficar hidden nas outras telas e ser restaurado quando o botao de voltar for clicado
        $("#mapDiv").empty();
        $("#mapDiv").replaceWith(originalDiv);
    });
});

 //Salvando o estado atual do mapa
       
        
        
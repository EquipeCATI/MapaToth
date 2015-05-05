var civilizations = [];

function Civilization(xmlNode){
    this.name = $(xmlNode).find("name").text();
    this.mapMarker = new MapMarker($(xmlNode).find("mapMarker"));
    this.originYear = parseInt($(xmlNode).find("originYear").text());
    this.endingYear = parseInt($(xmlNode).find("endingYear").text());
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
        $("#mapDiv").append("<img src='MapMarker.png' alt='Cidade " + this.name + "' id='" + this.name + "' class='MapMarker'/>");
        $("#"+this.name).css("top", this.mapMarker.topSpace);
        $("#"+this.name).css("left", this.mapMarker.leftSpace);
    });
    
    updateMarkers();
}

function updateMarkers(){
    var year = parseInt($("#slider").val());
    $.each(civilizations, function() {
        if(this.originYear <= year && this.endingYear > year){
            $("#"+this.name).fadeIn();
        }

        else{
            $("#"+this.name).fadeOut();
        }
    });
}

function snapToClosest(){
    var sliderValue = parseInt($("#slider").val());
    var closestDistance = 100000;
    var distance;
    var finalValue;
    
    $.each(civilizations, function() {
        if (this.originYear <= sliderValue){
            distance = sliderValue - this.originYear;
        }
        else{
            distance = this.originYear - sliderValue;
        }
        
        if(distance < closestDistance){
            finalValue = this.originYear;
            closestDistance = distance;
        }
        
        if (this.endingYear <= sliderValue){
            distance = sliderValue - this.endingYear;
        }
        else{
            distance = this.endingYear - sliderValue;
        }
        
        if(distance < closestDistance){
            finalValue = this.endingYear;
            closestDistance = distance;
        }
    });

    
    var interval = setInterval(function() {
        if(finalValue > sliderValue){
            var newVal = parseFloat($('#slider').val()) + 0.25;
        }
        else{
            var newVal = parseFloat($('#slider').val()) - 0.25;
        }
        
        $('#slider').val(newVal);
        $('#slider').trigger("input");
        
        if(parseInt($('#slider').val()) == finalValue){
            clearInterval(interval);
        }
    }, 1);
    
    
}

$(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: "civilizations.xml",
        dataType: "xml",
        success: parseXML
    });
    
    
    $("#slider").on('input', function(){
        updateMarkers();
    });
    
    $("#slider").on('change', function(){
        snapToClosest();
    });
});

function selectMarker(civilizationName){
    
    var marker = $('#' + civilizationName);
    //Salvando o estado atual do mapa
    var originalDiv = $("#mapDiv").clone(true);

    //Leitura da posição do marcador
    var origin = marker.position();

    var x = origin.left + marker.width()/2;
    var y = origin.top + marker.height()/2;

    //Setando o ponto de origem de Scale, faz o zoom ir na direção do marcador
    $('.Map').css({ transformOrigin: "" + x + "px " + y + "px"});

    $('.Map').transition({
        scale : '4'
    }, 1250);
    
    $('.MapMarker').not(marker).fadeOut(200);
    
    marker.transition({
        scale : '4'
    }, 1250, function(){

        //Restaurando o mapa ao estado salvo, pode ficar hidden nas outras telas e ser restaurado quando o botao de voltar for clicado
//        $("#mapDiv").empty();
//        $("#mapDiv").replaceWith(originalDiv);
        
    });
    
    $("#mainDiv").fadeOut(1250, function (){
        $("#mapDiv").empty();
//        $("#mapDiv").replaceWith(originalDiv);
        $("#mainDiv").css("background-image", "url('')");
        $("#mainDiv").css("background-color", "blue");
        
        $("#mainDiv").css("verticalAlign", "bottom");        
        $("#mainDiv").append("<div id='civilizationMenu'></div>");
        $("#civilizationMenu").append("<img src='Civilizações/" + civilizationName + "/menu.png' id='civilizationMenuImg'></img>")
        $("#mainDiv").fadeIn(1250);
    });
}

$(document).on('click', '.MapMarker', function(){
    selectMarker($(this).attr('id'));
});

       
        
        

$(document).on('mouseover', '.MapButton', function(){
    $(".MapButton").animate({
        left: '0%'
    });
});

$(document).on('mouseout', '.MapButton', function(){
    $(".MapButton").animate({
        left: '-20px'
    });
});

$(document).on('click', '.MapButton', function(){
    var origin = $("#civilizationMenuDiv").position();

    var x = $("#civilizationMenuDiv").width()/2;
    var y = $("#civilizationMenuDiv").height();

    //Setando o ponto de origem de Scale, faz o zoom ir na direção do marcador
    $('#civilizationMenuDiv').css({ transformOrigin: "" + x + "px " + y + "px"});
    
    $("#civilizationMenuDiv").transition({
        scale : '0.25'
    }, 1250);
    
    transitionToMap();  
});

$(document).on('click', '.CultureButton', function(){
      
});

$(document).on('click', '.CosmogonyButton', function(){
     
});

$(document).on('click', '.TeogonyButton', function(){
      
});

function transitionToMap(){
    $("#mainDiv").fadeOut(625, function (){  
        $("#mainDiv").replaceWith($("#mainDiv").data('map'));
        $("#mainDiv").fadeOut(0);
        $("#mainDiv").fadeIn(1250);
    });
}
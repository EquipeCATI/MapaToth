function Civilization(xmlNode) {

    this.name = $(xmlNode).find("name").text();
    this.mapMarker = new MapMarker($(xmlNode).find("mapMarker"));
    this.originYear = parseInt($(xmlNode).find("originYear").text());
    this.endingYear = parseInt($(xmlNode).find("endingYear").text());


    this.cosmogonyButton = new CivilizationButton($(xmlNode).find("menuButtons"), "cosmogonyButton");
    this.teogonyButton = new CivilizationButton($(xmlNode).find("menuButtons"), "teogonyButton");
    this.cultureButton = new CivilizationButton($(xmlNode).find("menuButtons"), "cultureButton");


    this.culturalManifestation = $(xmlNode).find("culturalManifestation").text();
    this.subsistenceMethod = $(xmlNode).find("subsistenceMethod").text();
    this.socialStructure = $(xmlNode).find("socialStructure").text();


    this.mapMarker.civilization = this;

    var nodes = $(xmlNode).find("god");
    var gods = [];
    for (var i = 0; i < nodes.length; i++) {
        gods.push(new God(nodes[i], this));
    }

    this.gods = gods;
    
    var animations = $(xmlNode).find('animationSWF');
    for(var i = 0; i < animations.length; i++){
        cosmogonyDisplay.push(new CosmogonyDisplay(animations[i], this));
    }
    
    this.display = cosmogonyDisplay;
    cosmogonyDisplay = [];//cosmogonyDisplay está sendo aproveitada para manipular os dados em cosmogony.js
    
}

function God(xmlNode, civilization) {
    this.name = $(xmlNode).find("godName").text();
    this.description = $(xmlNode).find("godDescription").text();
    this.civilization = civilization;
    this.source = undefined; //Usado para evitar erro citado em teogony
}

function CivilizationButton(xmlNode, buttonName) {
    //Width e height sao proporcoes percentuais do botao para a imagem de fundo
    //agora sao calculadas em civilizationMenu.js
    this.topSpace = $(xmlNode).find(buttonName).find("top").text();
    this.leftSpace = $(xmlNode).find(buttonName).find("left").text();

    //Métodos que retornam os valores float dos atributos
    this.getHeightFloat = function () {
        return parseFloat(this.height.substring(0, this.height.length - 1));
    }
    this.getTopSpaceFloat = function () {
        return parseFloat(this.topSpace.substring(0, this.topSpace.length - 1));
    }
    this.getLeftSpaceFloat = function () {
        return parseFloat(this.leftSpace.substring(0, this.leftSpace.length - 1));
    }
}

function MapMarker(xmlNode) {
    this.topSpace = $(xmlNode).find("top").text();
    this.leftSpace = $(xmlNode).find("left").text();
    this.civilization;
}

function CosmogonyDisplay(xmlNode, civilization){
    this.animation = $(xmlNode).text();
    this.civilization = civilization;

}
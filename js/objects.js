function Civilization(xmlNode) {
    this.name = $(xmlNode).find("name").text();
    this.mapMarker = new MapMarker($(xmlNode).find("mapMarker"));
    this.originYear = parseInt($(xmlNode).find("originYear").text());
    this.endingYear = parseInt($(xmlNode).find("endingYear").text());

    this.cosmogonyButton = new CivilizationButton($(xmlNode).find("menuButtons"), "cosmogonyButton");
    this.teogonyButton = new CivilizationButton($(xmlNode).find("menuButtons"), "teogonyButton");
    this.cultureButton = new CivilizationButton($(xmlNode).find("menuButtons"), "cultureButton");
    
    this.mapMarker.civilization = this;
    
    var nodes = $(xmlNode).find("god");
    var gods = [];
    for(var i = 0; i < nodes.length; i++){
        gods.push(new God(nodes[i], this));
    }
    
    this.gods = gods;
}

function God(xmlNode, civilization){
    this.name = $(xmlNode).find("godName").text();
    this.description = $(xmlNode).find("godDescription").text();
    this.civilization = civilization;
    this.source = undefined;
}

function CivilizationButton(xmlNode, buttonName) {
    this.height = $(xmlNode).find("height").text();

    this.topSpace = $(xmlNode).find(buttonName).find("top").text();
    this.leftSpace = $(xmlNode).find(buttonName).find("left").text();
}

function MapMarker(xmlNode) {
    this.topSpace = $(xmlNode).find("top").text();
    this.leftSpace = $(xmlNode).find("left").text();
    this.civilization;
}
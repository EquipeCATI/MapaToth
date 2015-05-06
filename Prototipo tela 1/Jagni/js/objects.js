function Civilization(xmlNode){
    this.name = $(xmlNode).find("name").text();
    this.mapMarker = new MapMarker($(xmlNode).find("mapMarker"));
    this.originYear = parseInt($(xmlNode).find("originYear").text());
    this.endingYear = parseInt($(xmlNode).find("endingYear").text());
    
    this.mapMarker.civilization = this;
}

function MapMarker(xmlNode){
    this.topSpace = $(xmlNode).find("top").text();
    this.leftSpace = $(xmlNode).find("left").text();
    this.civilization;
}
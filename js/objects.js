function Civilization(xmlNode) {
    this.name = $(xmlNode).find("name").text();
    this.mapMarker = new MapMarker($(xmlNode).find("mapMarker"));
    this.originYear = parseInt($(xmlNode).find("originYear").text());
    this.endingYear = parseInt($(xmlNode).find("endingYear").text());

    this.cosmogonyButton = new CivilizationButton($(xmlNode).find("menuButtons"), "cosmogonyButton");
    this.teogonyButton = new CivilizationButton($(xmlNode).find("menuButtons"), "teogonyButton");
    this.cultureButton = new CivilizationButton($(xmlNode).find("menuButtons"), "cultureButton");

    this.gods = [];
    this.mapMarker.civilization = this;
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
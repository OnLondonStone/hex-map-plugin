import { Sector } from "./makemap.js";
import { openTab, allSystemsTable } from "./utilities.js";

export function getSectorData(){
    const sectorData = document.getElementById("hex-container").sectorDataContainer;
    const sectorMap = sectorData.sector.SectorMap;
    return sectorMap;
}

export function generateMap(e){
    const dataContainer = {};
    let gen = e.target.parentElement;
    //Uses default values:
    let col = gen.col.value;
    let row = gen.row.value;
    let scale = gen.scale.value;
    //Gets user input col and row values or uses default:
    if(!col){col = 8;}
    if(!row){row = 10}
    if(!scale){scale = 40}
    if(document.querySelectorAll("#hex-container").length === 0){
        dataContainer.sector = new Sector(col, row, scale);
    }
    //Creates Tab Display
    document.getElementById("tab-display").style.display = "block";
    let tab = document.getElementsByClassName("tab-links");
    for(let t = 0; t < tab.length; t++){
        tab[t].style.display = "block";
        tab[t].addEventListener('click', openTab)
    }
    let tabLinks = document.getElementsByClassName("tab-links");
    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById("all-systems").className += " active";
    allSystemsTable(dataContainer.sector.systemList);

    document.getElementById("content-container").style.height=`${document.getElementById("svg-container").offsetHeight}px`;

    document.getElementById("run-button").style.display = "block";
    document.getElementById("reset-button").style.display = "block";

    //Hides Map Generator div
    document.getElementById("map-generator").style.display = "none";
    document.getElementById("hex-container").sectorDataContainer = dataContainer;
}

//Resets map
export function resetMap(){
    //fix CSS on generator section
    document.getElementById("map-generator").style.display = "inline-flex";
    document.getElementById("run-button").style.display = "none";
    document.getElementById("reset-button").style.display = "none";

    if(document.getElementById("system-information-content") !== null){
        let systemContent = document.getElementById("system-information-content");
        let oldSystem = systemContent.firstElementChild;
        let allContent = document.getElementById("all-systems-content");    
        let oldAll = allContent.firstElementChild;

        if (oldSystem !== null) systemContent.removeChild(oldSystem);
        if (oldAll !== null) allContent.removeChild(oldAll);
    }

    if(document.querySelectorAll("#hex-container").length > 0){
        let mapContainer = document.getElementById("svg-container");
        let map = document.getElementById("hex-container");
        mapContainer.removeChild(map);
    }

    document.getElementById("tab-display").style.display = "none";

    let tabLinks = document.getElementsByClassName("tab-links");
    for(let t = 0; t < tabLinks.length; t++){
        tabLinks[t].style.display = "none";
    }
}
export function runSimulation(){
    const sectorMap = getSectorData();
    const activeHexes = [];
    sectorMap.SectorMap.forEach(checkActiveHex, activeHexes);
    let maxValue = 0;
    //At some point work out how to make this simpler!
    activeHexes.forEach((hexKey) =>{ 
        origin = sectorMap.SectorMap.get(hexKey);
        origin.system.economicData.findTradePartners(hexKey);
        origin.system.economicData.tradeRoutes.forEach(
            (route, routeKey) =>{
                route.exchangeGoods();
                sectorMap.TradeMap.set(routeKey, route);
            });
    });
    activeHexes.forEach((hexKey) =>{
        origin = sectorMap.SectorMap.get(hexKey);
        origin.system.economicData.tradeRoutes.forEach((route) =>{
            if(route.tradeRouteVolume > maxValue){maxValue = route.tradeRouteVolume};
        })
    })
    activeHexes.forEach((hexKey) =>{
        origin = sectorMap.SectorMap.get(hexKey);
        origin.system.economicData.tradeRoutes.forEach((route) =>{
            //Issue in route.routeHexesArray
            if(route.routeHexesArray.length > 0){
                console.log(route, route.routeHexesArray)
            route.drawConnectingLine(maxValue, route.routeHexesArray)};})
    })
}

export function checkActiveHex(value, key){        
    if(value.system){this.push(key)}
}





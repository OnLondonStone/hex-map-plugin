/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from create-block-hex-map-block block)' );
import { Sector } from "./modules/makemap.js";
import { openTab, allSystemsTable } from "./modules/utilities.js";

export function getSectorData(){
    const sectorData = document.getElementById("hex-container").sectorDataContainer;
    const sectorMap = sectorData.sector.SectorMap;
    return sectorMap;
}

document.getElementById("generator-button").addEventListener('click', generateMap);
document.getElementById("reset-button").addEventListener('click', resetMap);
document.getElementById("run-button").addEventListener('click', runSimulation);

function generateMap(e){
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

    document.getElementById("run-button").style.display = "block";
    document.getElementById("reset-button").style.display = "block";

    //Hides Map Generator div
    document.getElementById("map-generator").style.display = "none";
    document.getElementById("hex-container").sectorDataContainer = dataContainer;
}

//Resets map
function resetMap(){
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
function runSimulation(){
    const sectorMap = getSectorData();
    const activeHexes = [];
    sectorMap.forEach(checkActiveHex, activeHexes);
    activeHexes.forEach((hexKey) =>{ 
        let origin = sectorMap.get(hexKey);
        let distance = 0;
        let tradeRoutePoints = [];
        origin.edges.forEach((edge) => findTradeRoutes(edge, hexKey, distance, origin, tradeRoutePoints));
    })
}

function checkActiveHex(value, key){        
    if(value.system){this.push(key)}
}

function findTradeRoutes(edgeKey, startKey, distance, origin, tradeRoutePoints){
    const sectorMap = getSectorData();
    const start = sectorMap.get(startKey);
    const target = sectorMap.get(edgeKey);
    const continuedDemandArray = [];

    distance ++;

    if(target.system && start.system){start.system.economicData.findTradePartners(start, target, continuedDemandArray)};

    origin.system.economicData.tradeInfo.demand.forEach((demand) =>{
        if(demand.demandAmount > demand.foundSupply){
            const index = continuedDemandArray.indexOf(demand.id);
            if (index > -1){
                continuedDemandArray.splice(index, 1);
            }
            else {continuedDemandArray.push(demand.id);}
        }
    })        
    if (continuedDemandArray.length > 0 && distance < 2){
        target.edges.forEach((edge) => findTradeRoutes(edge, edgeKey, distance, origin, tradeRoutePoints));
    }
}
/* eslint-enable no-console */

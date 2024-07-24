import { getSectorData } from "./utilities";

export function runTradeSimulation(){
    const sector = getSectorData();
    const activeHexes = [];
    sector.SectorMap.forEach(checkActiveHex, activeHexes);
    let maxValue = 0;
    console.log("Beep")

    activeHexes.forEach((hexKey) =>{ 
        origin = sector.SectorMap.get(hexKey);
        let range = origin.system.economicData.tradeRange;
        let tradePartners = origin.system.economicData.findTradePartners(hexKey, range);
        if(tradePartners.length > 0){    
        origin.system.economicData.setTradeRoutes(hexKey, tradePartners)}
    });
    activeHexes.forEach((hexKey) =>{
        origin = sector.SectorMap.get(hexKey);
        origin.system.economicData.tradeRoutes.forEach((route) =>{
            if(route.tradeRouteVolume > maxValue){maxValue = route.tradeRouteVolume};
        })
    })
    activeHexes.forEach((hexKey) =>{
        origin = sector.SectorMap.get(hexKey);
        origin.system.economicData.tradeRoutes.forEach((route) =>{
            //Issue in route.routeHexesArray
            if(route.routeHexesArray.length > 0){
            route.drawConnectingLine(maxValue, route.routeHexesArray)};})
    })
}

export function checkActiveHex(value, key){        
    if(value.system){this.push(key)}
}

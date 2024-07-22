import { getSectorData } from "./mapCode.js";
import { uniformCostSearchSystems, uniformCostSearchPathfinder, reconstructPath } from "./pathfinding.js";

export class TradeRoute{
    constructor(startHex, endHex, tradeData, maxRange){
        this.startId = startHex.id;
        this.endId = endHex.id;
        this.routeKey = this.startId + " <=> " + this.endId;
        this.maxRange = maxRange;
        this.routeHexesArray= this.findRoute(startHex.hexKey, endHex.hexKey, this.maxRange);

        this.startTradeInfo = startHex.system.economicData.tradeInfo;
        this.endTradeInfo = endHex.system.economicData.tradeInfo;

        this.startTradeData = tradeData;

        this.routeTradeCapacity = this.setHighestTradeCapacity(startHex.system.economicData.tradeCapacity, endHex.system.economicData.tradeCapacity)
        this.tradeRouteVolume = 0
        this.tradeRouteProfit = 0;
        this.tradeRouteDetails = []; 
    }
    //Red Blob Games to the rescue
    findRoute(start, end, range){
        const sectorMap = document.getElementById("hex-container").sectorDataContainer.sector.SectorMap.SectorMap;
        let startHex = sectorMap.get(start);
        let endHex = sectorMap.get(end);

        let pathFinder = uniformCostSearchPathfinder(start, end, range);
        let route = reconstructPath(pathFinder, start, end);

        return route;
    }

    setHighestTradeCapacity(startCapacity, endCapacity){
        if(startCapacity >= endCapacity){
            return startCapacity;
        }
        else return endCapacity;
    }

    exchangeGoods(){
        this.startTradeData.sellingIdArray.forEach((id) =>{
            let sellGood = this.startTradeInfo.supply.find((good) => good.id == id);
            let buyGood = this.endTradeInfo.demand.find((good) => good.id == id);
            let type = `sell`
            if(sellGood != undefined && buyGood != undefined){this.calculateSale(id, sellGood, buyGood, type);}
        });
        this.startTradeData.buyingIdArray.forEach((id) =>{
            let buyGood = this.startTradeInfo.demand.find((good) => good.id == id);
            let sellGood = this.endTradeInfo.supply.find((good) => good.id == id);
            let type = `buy`
            if(sellGood && buyGood){this.calculateSale(id, sellGood, buyGood, type);}
        });
    }

    calculateSale(id, sellGood, buyGood, type){
            //This is where dynamic pricing would go - IF I HAD ANY
        let maxSellOffer = sellGood.supplyAmount;
        let maxBuyOffer = buyGood.demandAmount;
        let tradeCapacity = this.routeTradeCapacity;

        let exchangeArray = [maxSellOffer, maxBuyOffer, tradeCapacity]
        let offerAmount = Math.min(...exchangeArray);

        let sellPrice = buyGood.price
        let profit = buyGood.price - sellGood.price;

        //THIS IS WHERE YOU CAN ABORT THE SALE
        //TEMP VALUE
        let sale = true;

        if(sale = true){
            maxSellOffer -= offerAmount;
            maxBuyOffer -= offerAmount;

            this.tradeRouteVolume += offerAmount;
            this.tradeRouteProfit += profit;
            this.tradeRouteDetails.push({exchangeType : type, goodId : id, offerAmount : offerAmount, sellPrice : sellPrice, profit : profit}) 
        }
    }
    drawConnectingLine(maxValue, pathArray){
        const width = this.calculateTradeRouteWidth(this.tradeRouteVolume, maxValue);
        const routeKey = this.routeKey;
        const tradeGroup = document.getElementById("trade-group");
        const sectorData = getSectorData();

        if(pathArray.length == 0){
            return;
        }

        let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let pathStart = sectorData.SectorMap.get(pathArray[0])
        let pathString = `M${pathStart.centerPoint.x} ${pathStart.centerPoint.y} `;
        for(let i = 1; i < pathArray.length; i++) {
            let step = sectorData.SectorMap.get(pathArray[i]);
            let stepCoords = step.centerPoint;
            
            let x = stepCoords.x;
            let y = stepCoords.y;
            pathString += `L${x} ${y} `
        }


        newPath.setAttribute("d", pathString)
        newPath.setAttribute("class","tradeLine");
        newPath.setAttribute("id", routeKey);
        newPath.setAttribute("style", `fill:none; stroke:red; stroke-width: ${width}`);
        


        newPath.addEventListener("click", this.tradeRouteOnClick);

        tradeGroup.appendChild(newPath);
    }
    calculateTradeRouteWidth(routeValue, maxValue){
        let maxWidth = 20
        let width;
        //Oh god, basic maths
        let min = maxValue / 100;
        let widthPercent = routeValue / (min*100);
        console.log(widthPercent);//Working
        width = Math.tanh(widthPercent) *20;
        if(width < 4){ width = 4};

        return width;
    }
    tradeRouteOnClick(){
        const SectorTradeRoutes = document.getElementById("hex-container").sectorDataContainer.sector.SectorMap.TradeMap;
        console.log(this.id);
        let clickedRoute = SectorTradeRoutes.get(this.id);
        console.log(clickedRoute);
    }
}
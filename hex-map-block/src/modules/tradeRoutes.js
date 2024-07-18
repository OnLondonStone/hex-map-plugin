export class TradeRoute{
    constructor(startHex, endHex, tradeData){
        this.startId = startHex.id;
        this.endId = endHex.id;
        this.startCenterPoint = startHex.centerPoint;
        this.endCenterPoint = endHex.centerPoint;
        this.routeKey = this.startId + " <=> " + this.endId;

        this.startTradeInfo = startHex.system.economicData.tradeInfo;
        this.endTradeInfo = endHex.system.economicData.tradeInfo;

        this.startTradeData = tradeData;

        this.routeTradeCapacity = this.setHighestTradeCapacity(startHex.system.economicData.tradeCapacity, endHex.system.economicData.tradeCapacity)
        this.tradeRouteVolume = 0
        this.tradeRouteProfit = 0;
        this.tradeRouteDetails = []; 
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
    drawConnectingLine(maxValue){
        const startCenterPoint = this.startCenterPoint; 
        const endCenterPoint = this.endCenterPoint; 
        const width = this.calculateTradeRouteWidth(this.tradeRouteVolume, maxValue);
        const routeKey = this.routeKey;
        const tradeGroup = document.getElementById("trade-group");

        let newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    
        newLine.setAttribute("x1", `${startCenterPoint.x}` );
        newLine.setAttribute("y1",`${startCenterPoint.y}`);
        newLine.setAttribute("x2", `${endCenterPoint.x}` );
        newLine.setAttribute("y2",`${endCenterPoint.y}`);
        newLine.setAttribute("class","tradeLine");
        newLine.setAttribute("id", routeKey);
        newLine.setAttribute("style", `stroke:red; stroke-width: ${width}`);
        
        newLine.addEventListener("click", this.tradeRouteOnClick);

        tradeGroup.appendChild(newLine);
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
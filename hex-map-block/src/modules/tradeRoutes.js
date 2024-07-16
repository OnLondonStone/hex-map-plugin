export class TradeRoute{
    constructor(origin, target, tradeRouteData){
        this.originId = origin.id;
        this.targetId = target.id;
        this.originCenterPoint = origin.centerPoint;
        this.targetCenterPoint = target.centerPoint;
        this.data = tradeRouteData;
        this.trafficWeight = this.setTrafficWeight(this.data);
        this.drawConnectingLine(this.originId, this.targetId, this.originCenterPoint, this.targetCenterPoint, this.trafficWeight)        
    }
    setTrafficWeight(data){
        let total = 0;
        data.forEach(item => {
            total = item.weight + total;
        });
        return total;
    }
    drawConnectingLine(originId, targetId, originCenterPoint, targetCenterPoint, width){
        const tradeGroup = document.getElementById("trade-group");

        if (width > 10){
            width = 10;
        }
        let newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    
        newLine.setAttribute("x1", `${originCenterPoint.x}` );
        newLine.setAttribute("y1",`${originCenterPoint.y}`);
        newLine.setAttribute("x2", `${targetCenterPoint.x}` );
        newLine.setAttribute("y2",`${targetCenterPoint.y}`);
        newLine.setAttribute("class","tradeLine");
        newLine.setAttribute("id",`{origin : ${originId}, destination : ${targetId}}`);
        newLine.setAttribute("style", `stroke:red; stroke-width: ${width}`);
    
        tradeGroup.appendChild(newLine);
    }
}
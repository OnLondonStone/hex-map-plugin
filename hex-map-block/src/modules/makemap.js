import { openTab, generateInfoBox, generateTradeBox, rollDice, direction_differences } from "./utilities.js";
import { System } from "./system.js";
//TRY AND REPLACE ALL USES OF map with SECTOR if Map
//Something deeply cursed is happening in the hex coordinates. I try not to think about it

export class Sector{
    constructor(col, row, scale){
        this.col = col;
        this.row = row;
        this.scale = scale;
        this.SectorMap = this.makeSectorMap(this.col, this.row, this.scale);
        this.systemList = this.makeSystemList(this.SectorMap);
    }

    //Creates 
    makeSectorMap(col, row, scale){
        const SectorMap = new Map();
        const TradeMap = new Map();
        let hexContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        hexContainer.setAttribute("id", "hex-container");
        hexContainer.id = "hex-container";
        document.getElementById("svg-container").appendChild(hexContainer);
        //Fix width;
        let margin = 3;
        let r = scale
        let svgHeight = ((row + 0.5) * ((Math.sqrt(3) * r))) + (margin*2);
        let svgWidth = ((col + 0.5) * (3/2 * r) + (margin*2));
        document.getElementById("hex-container").setAttribute("height", `${Math.floor(svgHeight)}`);
        document.getElementById("hex-container").setAttribute("width", `${Math.floor(svgWidth)}`);
        
        //Switching order of hex and trade group makes each clickable - implement toggle?

        let hexGroup = document.createElementNS("http://www.w3.org/2000/svg","g");
        hexGroup.setAttribute("id", "hex-group");
        hexContainer.appendChild(hexGroup);

        let tradeGroup = document.createElementNS("http://www.w3.org/2000/svg","g");
        tradeGroup.setAttribute("id", "trade-group");
        hexContainer.appendChild(tradeGroup);



        for(let c = 0; c < col; c++){
            let colNum = c + 1;
            for (let r = 0; r < row; r++){
                let rowNum = r + 1;
                let hex = new Hex(colNum, rowNum, scale);
                SectorMap.set(hex.hexKey, hex);
            }
        }
        SectorMap.forEach((hex)=>{hex.edges = hex.setEdges(this.col, this.row, hex, SectorMap)});

        return {SectorMap : SectorMap, TradeMap : TradeMap};
    }
    //Merge into above for each
    makeSystemList(Sector){
        let systemList = new Map();
        let listKey = 0;
        Sector.SectorMap.forEach((hex, systemKey) => {
            if(hex.system){
                let tableRow = {localID: systemKey, hex: hex.id, name: hex.system.tableData.Name, uwp: hex.system.tableData.UWP};
                systemList.set(listKey, tableRow);
                listKey ++;
            }
        });
        return systemList;
    }
}
//Bring up to standard - half done
export class Hex {
    constructor(col, row, hexSize){
        //Hexes are 0 index
        this.col = col;
        this.row = row;
        this.colNum = col - 1;
        this.rowNum = row - 1;
        this.hexKey = [this.colNum, this.rowNum];
        this.hexSize = hexSize;
        this.centerPoint = this.hexCenter(this.col, this.row, this.hexSize);
        this.axialCoord = this.oddqToAxial(this.col, this.row);
        this.edges;
        this.id = `${this.colNum}, ${this.rowNum}`;
        this.system = this.setSystem(this.id, this.centerPoint);
        this.moveCost = this.setMoveCost(this.system);
        this.init();
    }    
    init(){
        //Create Hex
        this.createHex();
    }
    //Returns center point of given col and row values
    hexCenter(col, row, hexSize){
        let margin = 3;
        let x = col * (3/2 * hexSize) - (hexSize/2) + margin;
        let y = row * (Math.sqrt(3) * hexSize) - (Math.sqrt(3) * hexSize / 2) + margin;
        //2nd Column offset
        if (!(this.col%2)){y += (Math.sqrt(3)/2 * hexSize)}
        return {"x":x, "y":y};
    }
    //Credit to RedBlobGames for 100% of this:
    oddqToAxial(col, row){
            let q = col;
            let r = row - (col - (((col%2) === 0? col : 0)));
            return {'q':q, 'r':r};
    }
    //Creates hex element
    createHex(){
        let newHex = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        let newHexGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

        newHex.setAttribute("points", this.hexPoints());
        newHex.setAttribute("id",`${this.id}`);
        newHexGroup.setAttribute("class","hex");

        //Adds onclick event
        newHexGroup.setAttribute("class","hex-group");
        newHexGroup.addEventListener("click", ()=>{this.hexOnClick(this);});
        
        //Adds the new hex element to container
        newHexGroup.appendChild(newHex);
        document.getElementById("hex-group").appendChild(newHexGroup);

        if(this.system){
            this.setMarker(newHexGroup);
        }
    }   
    setSystem(id, centerPoint){
        if(rollDice(1)>3){return new System(id, centerPoint)}
        else{return null};
    } 
    hexOnClick(hex){
        let info = document.getElementById("system-information-content");
        let trade = document.getElementById("system-trade-content");
        let currentTab = document.getElementsByClassName("tab-links active");
        let currentTabID = currentTab[0].id;
        //Bad - case switch?
        if(currentTabID === "all-systems"){currentTab = {target : {id : "system-information"}}};
        if(currentTabID === "system-information"){currentTab = {target : {id : "system-information"}}};
        if(currentTabID === "system-trade"){currentTab = {target : {id : "system-trade"}}};

        if(hex.system){
            if(info.hasChildNodes()){info.innerHTML = "";}
            if(trade.hasChildNodes()){trade.innerHTML = "";}
            generateInfoBox(hex.system.tableData)
            if(hex.system.economicData){generateTradeBox(hex.system.economicData)}
            openTab(currentTab, hex);
        }
    
        document.querySelectorAll(".clicked-hex").forEach((hex)=> hex.setAttribute("class", "hex"));
        document.getElementById(hex.id).setAttribute("class","clicked-hex");
    }    
    //Gets from hexCenter(), creates points for hex polygon
    hexPoints(){
        this.hexCenter();
        let x = this.centerPoint.x;
        let y = this.centerPoint.y;
        let points = ``;

        //Create Points list
        for(let i = 0; i<6; i++){
            const angleDeg = 60 * i;
            const angleRad = Math.PI/180 * angleDeg;
            let xPoint = this.hexSize * Math.cos(angleRad);
            let yPoint = this.hexSize * Math.sin(angleRad);
            //Above gives pixel coordinates at a 0,0 point.
            //Now to translate that to correct location.
            xPoint += x;
            yPoint += y;
            points += `${Math.floor(xPoint)}, ${Math.floor(yPoint)} `;
        }
        return points;
    }
    setMarker(newHex){
        //Useful code for creating a dot at the middle of a hex.
        let cx = this.centerPoint.x;
        let cy = this.centerPoint.y;

        let mark = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        mark.setAttribute("cx", cx);
        mark.setAttribute("cy", cy);
        mark.setAttribute("r", 10);
        mark.setAttribute("id", "marker");
        newHex.appendChild(mark);
    }
    setMoveCost(system){
        let cost = 1;
        if(!system){cost = 3};
        return cost;
    }
    setEdges(col, row, hex, SectorMap){
        let edges = [];
        let parity = hex.col & 1;
        let dif = direction_differences[parity]  
        //THIS IS WRONG?
        dif.forEach((direction) => {
            let edgeCol = hex.col + direction[0];
            let edgeRow = hex.row + direction[1];
            if(edgeCol > 0 && edgeCol <= col && edgeRow > 0 && edgeRow <= row){
                SectorMap.forEach((hex, key)=>{if(hex.col == edgeCol && hex.row == edgeRow){
                    edges.push({key : key, cost : hex.moveCost})}})
            }})
        return edges;
    }
}
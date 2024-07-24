import { TRADEGOODS } from "./economyConstants.js";

export const direction_differences = [
  // even cols 
  [[+1,  0], [+1, -1], [ 0, -1], 
   [-1, -1], [-1,  0], [ 0, +1]],
  // odd cols 
  [[+1, +1], [+1,  0], [ 0, -1], 
   [-1,  0], [-1, +1], [ 0, +1]],
];

export function getSectorData(){
  const sectorData = document.getElementById("hex-container").sectorDataContainer;
  return sectorData;
}

export function getSystem(hexKey){
  const sectorData = getSectorData();
  let system = sectorData.SectorMap.get(hexKey);
  return system;
}

export function rollDice(numDice){

  let total = 0;
  for (let i=0; i < numDice; i++){
      total += Math.floor(Math.random() * 6 + 1);
  }
  return total
}
//Tab Control Code
//Currently only works for System Information
export function openTab(event) {
  // Declare all variables
  let i, tabContent, tabLinks;
  // Get all elements with class="" and hide them
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  // Get all elements with class="tabLinks" and remove the class "active"
  tabLinks = document.getElementsByClassName("tab-links");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  //Creates tab content if not already created
  // Show the current tab, and add an "active" class to the button that opened the tab
  let activeTab = event.target.id;
  let tab = document.getElementById(activeTab);
  tab.className += " active";
  if(activeTab != undefined){
  activeTab += "-content";
  document.getElementById(activeTab).style.display = "block";
  //this might not be working either way

  }
}

export function generateInfoBox(tableData){
  let container = document.getElementById("content-container");
  let infoBox = document.getElementById("system-information-content");

  if(infoBox === undefined || infoBox === null){
    infoBox = document.createElement("div")
    infoBox.setAttribute("id", "system-information-content");
  }

  //Creates table
  let displayTable = document.createElement("table");

  displayTable.setAttribute("class", "info-table");

  //Populates rows:
  let labels = [];
  let values = [];
  for(const data in tableData){
      labels.push(data);
      values.push(tableData[data]);
  }

  for(let i = 0; i < labels.length; i++){
      let row = displayTable.insertRow(i)
      let label = row.insertCell(0);
      let value = row.insertCell(1);
      label.innerHTML = labels[i];
      value.innerHTML = values[i]; 
  }
  container.appendChild(infoBox)
  infoBox.appendChild(displayTable);
}

//hex.system.systemData.economy.tradeData, "system-trade-table", "system-trade"
export function generateTradeBox(data){

  let supply = data.tradeInfo.supply;
  let demand = data.tradeInfo.demand;
  let container = document.getElementById("content-container");
  let tradeBox = document.getElementById("system-trade-content");

  if(tradeBox === null){
    tradeBox = document.createElement("div")
    tradeBox.setAttribute("id", "system-trade-content");
  }
  //Creates table
  let displayTable = document.createElement("table");
  let tblbody = document.createElement("tbody");
  displayTable.setAttribute("class", "info-table");

  //Populates rows:
  let supplyIndex = [];
  let demandIndex = [];

  let goodsList = TRADEGOODS.map(({ goodsName }) => goodsName);

  goodsList.forEach((item, index) =>{
    let matchSupply = supply.find(({ good }) => good === item);
    if(matchSupply){supplyIndex.push({index : index, amount : matchSupply.supplyAmount, price : matchSupply.price})}
    let matchDemand = demand.find(({ good }) => good === item);
    if(matchDemand){demandIndex.push({index : index, amount : matchDemand.demandAmount, price : matchDemand.price})}
  });

  //Create Headings:
  let headingRow = document.createElement("tr");
  let label1Cell = document.createElement("td");
  let label1CellText = document.createTextNode("Trade Goods");

  let label2Cell = document.createElement("td");
  let label2CellText = document.createTextNode("Supply");

  let label3Cell = document.createElement("td");
  let label3CellText = document.createTextNode("Demand");

  label1Cell.appendChild(label1CellText);
  label2Cell.appendChild(label2CellText);
  label3Cell.appendChild(label3CellText);

  headingRow.appendChild(label1Cell);
  headingRow.appendChild(label2Cell);
  headingRow.appendChild(label3Cell);

  tblbody.appendChild(headingRow);

  for (let i = 0; i < goodsList.length; i ++){
    let row = document.createElement("tr");

    let goodsListCell = document.createElement("td");
    let supplyIndexCell = document.createElement("td");
    let demandIndexCell = document.createElement("td");
    
    let goodsListText = document.createTextNode(goodsList[i]);

    let supplyItem = supplyIndex.find(({ index }) => index === i);
    let demandItem = demandIndex.find(({ index }) => index === i);

    let supplyPriceText = document.createTextNode("Not available");
    let demandPriceText = document.createTextNode("Not needed");

    if(supplyItem){supplyPriceText = document.createTextNode(`${supplyItem.amount} units, at ${supplyItem.price} per unit`)}
    if(demandItem){demandPriceText = document.createTextNode(`${demandItem.amount} units, at ${demandItem.price} per unit`)}

    goodsListCell.appendChild(goodsListText);
    supplyIndexCell.appendChild(supplyPriceText);
    demandIndexCell.appendChild(demandPriceText);

    row.appendChild(goodsListCell);
    row.appendChild(supplyIndexCell);
    row.appendChild(demandIndexCell);

    if(!(supplyPriceText.textContent === "Not available" && demandPriceText.textContent === "Not needed")){
      tblbody.appendChild(row);
    }
  }
  container.appendChild(tradeBox)
  displayTable.appendChild(tblbody);
  tradeBox.appendChild(displayTable);
}
//Bring into standard with above table
//Currently not working
export function allSystemsTable(systemsList){
  let systemsBox = document.getElementById("all-systems-content");
  //Creates table
  let displayTable = document.createElement("table");

  document.getElementById("content-container").style.height=`${document.getElementById("svg-container").offsetHeight}px`;
 
  displayTable.setAttribute("class", "info-table");
  systemsBox.appendChild(displayTable);
  //Creates headings - Maybe there's a better way of doing it?
  let headings = displayTable.insertRow(0);
  let headingHex = headings.insertCell(0);
  headingHex.innerHTML = "Hex";
  let headingName = headings.insertCell(1);
  headingName.innerHTML = "Name";
  let headingUWP = headings.insertCell(2);
  headingUWP.innerHTML = "UWP";

  //Creates rows
  for(let i = 1; i < systemsList.length; i++){
      let listItem = systemsList[i-1][1];

      let row = displayTable.insertRow(i);
      let hex = row.insertCell(0);
      let name = row.insertCell(1);
      let uwp = row.insertCell(2);
      
      hex.innerHTML = listItem.hex;
      name.innerHTML = listItem.name;
      uwp.innerHTML = listItem.uwp;
  } 
}
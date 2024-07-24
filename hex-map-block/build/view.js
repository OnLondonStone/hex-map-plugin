/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/economy.js":
/*!********************************!*\
  !*** ./src/modules/economy.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Economy: () => (/* binding */ Economy)
/* harmony export */ });
/* harmony import */ var _economyConstants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./economyConstants.js */ "./src/modules/economyConstants.js");
/* harmony import */ var _tradeRoutes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tradeRoutes.js */ "./src/modules/tradeRoutes.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities.js */ "./src/modules/utilities.js");
/* harmony import */ var _pathfinding_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pathfinding.js */ "./src/modules/pathfinding.js");




class Economy {
  constructor(hexKey, techLevel, government, popRoll, tradeCodes) {
    this.techLevel = techLevel;
    this.govtTier = government;
    this.tradeCodes = tradeCodes;
    this.popRoll = popRoll;
    this.tradeCapacity = this.setTradeCapacity(this.tradeCodes, this.popRoll);
    this.tradeInfo = this.setTradeInfo(this.popRoll, this.tradeCodes, _economyConstants_js__WEBPACK_IMPORTED_MODULE_0__.BASICTRADEGOODS);
    this.tradeBalance = 0;
    this.tradeRange = this.setTradeRange(this.techLevel, this.tradeCodes);
    this.tradeRoutes = new Map();
  }
  setTradeCapacity(tradeCodes, pop) {
    let tradeMultiplier;
    let tradeCapacity;
    if (tradeCodes.includes("Ba")) {
      tradeMultiplier = 0;
    }
    if (tradeCodes.includes("Lo")) {
      tradeMultiplier = 1;
    }
    if (tradeCodes.includes("Ni")) {
      tradeMultiplier = 2;
    }
    if (tradeCodes.includes("Ph")) {
      tradeMultiplier = 4;
    }
    if (tradeCodes.includes("Hi")) {
      tradeMultiplier = 8;
    }
    tradeCapacity = tradeMultiplier * pop;
    return tradeCapacity;
  }
  //Poss check for duplicated values
  setTradeInfo(pop, tradeCodes) {
    let supplyArray = [];
    let demandArray = [];
    let tradeInfo = {};
    tradeCodes.forEach(code => {
      let codeArray = [code];
      supplyArray.push(...this.setSupply(pop, codeArray));
      demandArray.push(...this.setDemand(pop, codeArray));
    });
    tradeInfo.supply = supplyArray;
    tradeInfo.demand = demandArray;
    tradeInfo = this.setInitialPricing(tradeInfo);
    return tradeInfo;
  }
  setSystemModifiers(tradeCodes) {
    let modifiers = [];
    tradeCodes.forEach(code => {
      modifiers.push(_economyConstants_js__WEBPACK_IMPORTED_MODULE_0__.TRADECODES[code].modifiers);
    });
    return modifiers;
  }
  //Not working -?
  setSupply(pop, tradeCodes) {
    let supplies = [];
    let supplyArray = [];
    tradeCodes.forEach(code => {
      let codeConst = _economyConstants_js__WEBPACK_IMPORTED_MODULE_0__.TRADECODES[code];
      let newGoods = codeConst.tradeGoods.supply;
      supplies.push(...newGoods);
      supplies.forEach(good => {
        let tradeGood = this.getGoodsDetails(good);
        let supplyAmount;
        if (codeConst.modifier.supplyEffect.includes(tradeGood.goodsClass)) {
          supplyAmount = 10 * codeConst.modifier.strength * (pop * pop);
        } else {
          supplyAmount = 1 * (pop * pop);
        }
        tradeGood.supplyAmount = supplyAmount;
        supplyArray.push({
          id: tradeGood.id,
          good: tradeGood.goodsName,
          basePrice: tradeGood.basePrice,
          supplyAmount: tradeGood.supplyAmount,
          foundDemand: 0
        });
      });
    });
    return supplyArray;
  }
  //Not working -?
  setDemand(pop, tradeCodes) {
    let demands = [];
    let demandsArray = [];
    tradeCodes.forEach(code => {
      let codeConst = _economyConstants_js__WEBPACK_IMPORTED_MODULE_0__.TRADECODES[code];
      let newGoods = codeConst.tradeGoods.demand;
      demands.push(...newGoods);
      demands.forEach(good => {
        let tradeGood = this.getGoodsDetails(good);
        let demandAmount;
        if (codeConst.modifier.demandEffect.includes(tradeGood.goodsClass)) {
          demandAmount = 10 * codeConst.modifier.strength * (pop * pop);
        } else {
          demandAmount = 1 * (pop * pop);
        }
        tradeGood.demandAmount = demandAmount;
        demandsArray.push({
          id: tradeGood.id,
          good: tradeGood.goodsName,
          basePrice: tradeGood.basePrice,
          demandAmount: tradeGood.demandAmount,
          foundSupply: 0
        });
      });
    });
    return demandsArray;
  }
  getGoodsDetails(goodID) {
    let selectedGood = _economyConstants_js__WEBPACK_IMPORTED_MODULE_0__.TRADEGOODS.find(({
      id
    }) => id === goodID);
    return selectedGood;
  }
  setInitialPricing(tradeInfo) {
    let updatedSupply = this.updateSupply(tradeInfo.supply);
    let updatedDemand = this.updateDemand(tradeInfo.demand);
    tradeInfo.supply = updatedSupply;
    tradeInfo.demand = updatedDemand;
    return tradeInfo;
  }
  updateSupply(supply) {
    supply.forEach(good => {
      good.price = good.basePrice;
      //good.price = good.price.toPrecision(4);
    });
    return supply;
  }
  updateDemand(demand) {
    demand.forEach(good => {
      good.price = good.basePrice;
      //good.price = good.price.toPrecision(4);
    });
    return demand;
  }
  setTradeRange(tech, tradeCodes) {
    let tradeRange = 1;
    if (tech == 11) {
      tradeRange = 2;
    }
    ;
    if (tech == 12) {
      tradeRange = 3;
    }
    ;
    if (tech == 13) {
      tradeRange = 4;
    }
    ;
    if (tech == 14) {
      tradeRange = 5;
    }
    ;
    if (tech >= 15) {
      tradeRange = 6;
    }
    ;
    if (tradeCodes.includes("Ba")) {
      tradeRange = 0;
    }
    ;
    return tradeRange;
  }
  findTradePartners(startKey, tradeRange) {
    let tradePartnersList = (0,_pathfinding_js__WEBPACK_IMPORTED_MODULE_3__.uniformCostSearchSystems)(startKey, tradeRange);
    //Returns an array of hexKeys
    return tradePartnersList;
  }
  //This is a map, called from runSimulation, hexKey is origin
  setTradeRoutes(startKey, tradePartnersList) {
    const tradeRange = this.tradeRange;
    tradePartnersList.forEach(hexKey => {
      let hex = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_2__.getSystem)(hexKey);
      if (hex.system) {
        let tradeRoute = new _tradeRoutes_js__WEBPACK_IMPORTED_MODULE_1__.TradeRoute(startKey, hexKey, tradeRange);
        this.tradeRoutes.set(hexKey, tradeRoute);
      }
      console.log(this.tradeRoutes);
    });
  }
}

/***/ }),

/***/ "./src/modules/economyConstants.js":
/*!*****************************************!*\
  !*** ./src/modules/economyConstants.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BASICTRADEGOODS: () => (/* binding */ BASICTRADEGOODS),
/* harmony export */   TRADECODES: () => (/* binding */ TRADECODES),
/* harmony export */   TRADEGOODS: () => (/* binding */ TRADEGOODS)
/* harmony export */ });
//Change TradeCodes to array?
//Supply Demand Rework
//Supply
//In - 7-8, 9-F
//Ag - 4, 8 - 5-7
const TRADECODES = {
  "Template": {
    codeName: "Name",
    //Poss replace with supplies and demands
    tradeGoods: {
      supply: [],
      demand: []
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: ""
  },
  "As": {
    codeName: "Asteroid Belt",
    tradeGoods: {
      supply: [31, 42, 44, 45, 53],
      demand: [15, 21, 22, 25, 32]
    },
    modifier: {
      strength: 2,
      supplyEffect: ["Mining"],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "De": {
    codeName: "Desert",
    tradeGoods: {
      supply: [31, 41, 42, 44, 45, 51, 54],
      demand: []
    },
    modifier: {
      strength: 1,
      supplyEffect: ["Resource", "Mining"],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "Fl": {
    codeName: "Fluid Oceans",
    tradeGoods: {
      supply: [41, 44],
      demand: [15]
    },
    modifier: {
      strength: 0.5,
      supplyEffect: ["Resource"],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "Ga": {
    codeName: "Garden",
    tradeGoods: {
      supply: [33, 34, 51, 55],
      demand: []
    },
    modifier: {
      strength: 2,
      supplyEffect: ["Resource"],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "He": {
    codeName: "Hell-World",
    tradeGoods: {
      supply: [],
      demand: []
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "Ic": {
    codeName: "Ice-Capped",
    tradeGoods: {
      supply: [31, 41, 44, 53],
      demand: [15, 32]
    },
    modifier: {
      strength: 1,
      supplyEffect: ["Resource"],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "Oc": {
    codeName: "Ocean World",
    tradeGoods: {
      supply: [26, 35, 41, 42, 51, 54],
      demand: []
    },
    modifier: {
      strength: 0.5,
      supplyEffect: ["Resource"],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "Va": {
    codeName: "Vacuum",
    tradeGoods: {
      supply: [],
      demand: []
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "Wa": {
    codeName: "Water World",
    tradeGoods: {
      supply: [26, 35, 41, 42, 51, 54],
      demand: []
    },
    modifier: {
      strength: 1,
      supplyEffect: ["Resource"],
      demandEffect: []
    },
    codeClass: "Planetary"
  },
  "Di": {
    codeName: "Die-Back",
    tradeGoods: {
      supply: [],
      demand: []
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: "Population"
  },
  "Ba": {
    codeName: "Barren",
    tradeGoods: {
      supply: [],
      demand: []
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: "Population"
  },
  "Lo": {
    codeName: "Low Population",
    tradeGoods: {
      supply: [11, 12, 13, 14, 15, 16, 45],
      demand: [33]
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: "Population"
  },
  "Ni": {
    codeName: "Non-Industrial",
    tradeGoods: {
      supply: [11, 12, 13, 14, 15, 16, 52],
      demand: [11, 12, 16, 21, 22, 43, 53, 56]
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: ["Consumables", "Industrial"]
    },
    codeClass: "Population"
  },
  "Ph": {
    codeName: "Pre-High Population",
    tradeGoods: {
      supply: [11, 12, 13, 14, 15, 16, 35, 36, 42],
      demand: [13, 15, 23, 34, 51, 52, 56]
    },
    modifier: {
      strength: 0.5,
      supplyEffect: [],
      demandEffect: ["Consumables", "Industrial"]
    },
    codeClass: "Population"
  },
  "Hi": {
    codeName: "High Population",
    tradeGoods: {
      supply: [11, 12, 13, 14, 15, 16, 35, 36, 42],
      demand: [13, 15, 23, 34, 51, 52, 56]
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: ["Consumables", "Industrial"]
    },
    codeClass: "Population"
  },
  "Pa": {
    codeName: "Pre-Agricultural",
    tradeGoods: {
      supply: [26, 33, 34, 52, 54, 55],
      demand: [12, 41, 46]
    },
    modifier: {
      strength: 0.5,
      supplyEffect: ["Organic"],
      demandEffect: ["Industrial"]
    },
    codeClass: "Output"
  },
  "Ag": {
    codeName: "Agricultural",
    tradeGoods: {
      supply: [26, 33, 34, 52, 54, 55],
      demand: [12, 41, 46]
    },
    modifier: {
      strength: 1,
      supplyEffect: ["Organic"],
      demandEffect: ["Industrial"]
    },
    codeClass: "Output"
  },
  "Na": {
    codeName: "Non-Agricultural",
    tradeGoods: {
      supply: [],
      demand: [52]
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: ["Consumables"]
    },
    codeClass: "Economic"
  },
  "Pi": {
    codeName: "Pre-Industrial",
    tradeGoods: {
      supply: [21, 22, 23, 24, 25, 43, 46, 56],
      demand: [14, 16, 26, 31, 36, 44, 45, 53, 54]
    },
    modifier: {
      strength: 0.5,
      supplyEffect: ["Industrial"],
      demandEffect: ["Resource", "Mining"]
    },
    codeClass: "Output"
  },
  "In": {
    codeName: "Industrial",
    tradeGoods: {
      supply: [21, 22, 23, 24, 25, 43, 46, 56],
      demand: [14, 16, 26, 31, 36, 44, 45, 53, 54]
    },
    modifier: {
      strength: 1,
      supplyEffect: ["Industrial"],
      demandEffect: ["Resource", "Mining"]
    },
    codeClass: "Output"
  },
  "Po": {
    codeName: "Poor",
    tradeGoods: {
      supply: [11],
      demand: [11, 14, 24, 36, 51]
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: "Economic"
  },
  "Pr": {
    codeName: "Pre-Rich",
    tradeGoods: {
      supply: [],
      demand: [21, 23, 25, 31, 32, 35, 36, 42, 43, 44, 51, 55]
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: "Economic"
  },
  "Ri": {
    codeName: "Rich",
    tradeGoods: {
      supply: [],
      demand: [21, 23, 25, 31, 32, 35, 36, 42, 43, 44, 51, 55]
    },
    modifier: {
      strength: 1,
      supplyEffect: [],
      demandEffect: []
    },
    codeClass: "Economic"
  }
};
//Supply Output = Pop * *(0.5 if poor, 2 if Rich, 1.5 if Pre-Rich)
//Demand = 
// Classes = Basic/Advanced Industrial, Basic/Advanced Resource, Basic/Advanced Organic, Luxury, Basic/Advanced Comsumables

const TRADEGOODS = [{
  id: 11,
  goodsName: "Basic Electronics",
  goodsClass: "Industrial",
  basePrice: 10
}, {
  id: 12,
  goodsName: "Basic Machine Parts",
  goodsClass: "Industrial",
  basePrice: 10
}, {
  id: 13,
  goodsName: "Basic Manufactured Goods",
  goodsClass: "Industrial",
  basePrice: 10
}, {
  id: 14,
  goodsName: "Basic Raw Materials",
  goodsClass: "Resource",
  basePrice: 5
}, {
  id: 15,
  goodsName: "Basic Consumables",
  goodsClass: "Comsumables",
  basePrice: 2
}, {
  id: 16,
  goodsName: "Basic Ore",
  goodsClass: "Mining",
  basePrice: 1
}, {
  id: 21,
  goodsName: "Advanced Electronics",
  goodsClass: "Industrial",
  basePrice: 100
}, {
  id: 22,
  goodsName: "Advanced Machine Parts",
  goodsClass: "Industrial",
  basePrice: 75
}, {
  id: 23,
  goodsName: "Advanced Manufactured Goods",
  goodsClass: "Industrial",
  basePrice: 100
}, {
  id: 24,
  goodsName: "Advanced Weapons",
  goodsClass: "Industrial",
  basePrice: 150
}, {
  id: 25,
  goodsName: "Advanced Vehicles",
  goodsClass: "Industrial",
  basePrice: 180
}, {
  id: 26,
  goodsName: "Biochemicals",
  goodsClass: "Resource",
  basePrice: 50
}, {
  id: 31,
  goodsName: "Crystals and Gems",
  goodsClass: "Mining",
  basePrice: 20
}, {
  id: 32,
  goodsName: "Cybernetics",
  goodsClass: "Industial",
  basePrice: 250
}, {
  id: 33,
  goodsName: "Live Animals",
  goodsClass: "Resource",
  basePrice: 10
}, {
  id: 34,
  goodsName: "Luxury Consumables",
  goodsClass: "Consumables",
  basePrice: 20
}, {
  id: 35,
  goodsName: "Luxury Goods",
  goodsClass: "Industrial",
  basePrice: 200
}, {
  id: 36,
  goodsName: "Medical Supplies",
  goodsClass: "Industrial",
  basePrice: 50
}, {
  id: 41,
  goodsName: "Petrochemicals",
  goodsClass: "Resource",
  basePrice: 10
}, {
  id: 42,
  goodsName: "Pharmaceuticals",
  goodsClass: "Industrial",
  basePrice: 100
}, {
  id: 43,
  goodsName: "Polymers",
  goodsClass: "Resource",
  basePrice: 7
}, {
  id: 44,
  goodsName: "Precious Metals",
  goodsClass: "Resource",
  basePrice: 50
}, {
  id: 45,
  goodsName: "Radioactives",
  goodsClass: "Resource",
  basePrice: 1000
}, {
  id: 46,
  goodsName: "Robots",
  goodsClass: "Industrial",
  basePrice: 400
}, {
  id: 51,
  goodsName: "Spices",
  goodsClass: "Comsumables",
  basePrice: 6
}, {
  id: 52,
  goodsName: "Textiles",
  goodsClass: "Industrial",
  basePrice: 3
}, {
  id: 53,
  goodsName: "Uncommon Ore",
  goodsClass: "Mining",
  basePrice: 5
}, {
  id: 54,
  goodsName: "Uncommon Raw Materials",
  goodsClass: "Resource",
  basePrice: 20
}, {
  id: 55,
  goodsName: "Wood",
  goodsClass: "Resource",
  basePrice: 1
}, {
  id: 56,
  goodsName: "Vehicles",
  goodsClass: "Industrial",
  basePrice: 15
}];
//Currently not being used - fold into 
const BASICTRADEGOODS = [11, 12, 13, 14, 15, 16];

/***/ }),

/***/ "./src/modules/makemap.js":
/*!********************************!*\
  !*** ./src/modules/makemap.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hex: () => (/* binding */ Hex),
/* harmony export */   Sector: () => (/* binding */ Sector)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities.js */ "./src/modules/utilities.js");
/* harmony import */ var _system_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./system.js */ "./src/modules/system.js");


//TRY AND REPLACE ALL USES OF map with SECTOR if Map

class Sector {
  constructor(col, row, scale) {
    this.col = col;
    this.row = row;
    this.scale = scale;
    this.TradeMap = new Map();
    this.systemList = [];
    this.SectorMap = this.makeSectorMap(this.col, this.row, this.scale, this.systemList);
  }

  //Creates 
  makeSectorMap(col, row, scale, systemList) {
    const SectorMap = new Map();
    let hexContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    hexContainer.setAttribute("id", "hex-container");
    hexContainer.id = "hex-container";
    document.getElementById("svg-container").appendChild(hexContainer);
    //Fix width;
    let margin = 3;
    let r = scale;
    let svgHeight = (row + 0.5) * (Math.sqrt(3) * r) + margin * 2;
    let svgWidth = (col + 0.5) * (3 / 2 * r) + margin * 2;
    document.getElementById("hex-container").setAttribute("height", `${Math.floor(svgHeight)}`);
    document.getElementById("hex-container").setAttribute("width", `${Math.floor(svgWidth)}`);

    //Switching order of hex and trade group makes each clickable - implement toggle?

    let hexGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    hexGroup.setAttribute("id", "hex-group");
    hexContainer.appendChild(hexGroup);
    let tradeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    tradeGroup.setAttribute("id", "trade-group");
    hexContainer.appendChild(tradeGroup);
    for (let c = 0; c < col; c++) {
      let colNum = c + 1;
      for (let r = 0; r < row; r++) {
        let rowNum = r + 1;
        let hex = new Hex(colNum, rowNum, scale);
        SectorMap.set(hex.hexKey, hex);
        if (hex.system) {
          let tableRow = {
            hex: hex.id,
            name: hex.system.tableData.Name,
            uwp: hex.system.tableData.UWP
          };
          _utilities_js__WEBPACK_IMPORTED_MODULE_0__.DOMIdToHexKeyMap.set(`Row: ${hex.id}`, hex.hexKey);
          _utilities_js__WEBPACK_IMPORTED_MODULE_0__.HexKeyToDOMIdMap.set(hex.hexKey, `Row: ${hex.id}`);
          systemList.push([hex.hexKey, tableRow]);
        }
      }
    }
    SectorMap.forEach(hex => {
      hex.edges = hex.setEdges(hex.colNum, hex.rowNum, hex.hexKey, SectorMap, col, row);
    });
    return SectorMap;
  }
}

//Bring up to standard - half done
class Hex {
  constructor(col, row, hexSize) {
    //Hexes are 0 index
    this.colNum = col - 1;
    this.rowNum = row - 1;
    this.hexKey = [this.colNum, this.rowNum];
    this.hexSize = hexSize;
    this.centerPoint = this.hexCenter(col, row, hexSize);
    this.edges;
    this.id = `${this.colNum},${this.rowNum}`;
    this.system = this.setSystem(this.id, this.centerPoint);
    this.moveCost = this.setMoveCost(this.system);
    this.hexDOM = this.createHex(this.id, this.centerPoint, this.hexSize, this.hexKey);
  }
  //Returns center point of given col and row values
  hexCenter(col, row, hexSize) {
    let margin = 3;
    let x = col * (3 / 2 * hexSize) - hexSize / 2 + margin;
    let y = row * (Math.sqrt(3) * hexSize) - Math.sqrt(3) * hexSize / 2 + margin;
    //2nd Column offset
    if (!(col % 2)) {
      y += Math.sqrt(3) / 2 * hexSize;
    }
    return {
      "x": x,
      "y": y
    };
  }
  //Creates hex element
  createHex(id, centerpoint, hexSize, hexKey) {
    let newHex = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    let newHexGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    newHex.setAttribute("points", this.hexPoints(centerpoint, hexSize));
    newHex.setAttribute("id", `${id}`);
    newHexGroup.setAttribute("class", "hex");

    //Adds onclick event
    newHexGroup.setAttribute("class", "hex-group");
    newHexGroup.addEventListener("click", () => {
      this.hexOnClick(this);
    });

    //Adds hover
    newHexGroup.onmouseover = function () {
      let rowId = _utilities_js__WEBPACK_IMPORTED_MODULE_0__.HexKeyToDOMIdMap.get(hexKey);
      let container = document.getElementById("content-container");
      let relatedTableEntry = document.getElementById(rowId);
      if (relatedTableEntry != null) {
        (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.scrollParentToChild)(container, relatedTableEntry);
        let rowCells = relatedTableEntry.childNodes;
        rowCells.forEach(function (cell) {
          cell.setAttribute("class", "allSystemsCellHover");
        });
      }
    };
    newHexGroup.onmouseout = function () {
      let rowId = _utilities_js__WEBPACK_IMPORTED_MODULE_0__.HexKeyToDOMIdMap.get(hexKey);
      let table = document.getElementById("all-systems-table");
      let relatedTableEntry = document.getElementById(rowId);
      if (relatedTableEntry != null) {
        let rowCells = relatedTableEntry.childNodes;
        rowCells.forEach(function (cell) {
          cell.setAttribute("class", "allSystemsCell");
        });
      }
    };

    //Adds the new hex element to container
    newHexGroup.appendChild(newHex);
    document.getElementById("hex-group").appendChild(newHexGroup);
    if (this.system) {
      this.setMarker(centerpoint, newHexGroup);
    }
    return newHex;
  }
  setSystem(id, centerPoint) {
    if ((0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.rollDice)(1) > 3) {
      return new _system_js__WEBPACK_IMPORTED_MODULE_1__.System(id, centerPoint);
    } else {
      return null;
    }
    ;
  }
  hexOnClick(hex) {
    let info = document.getElementById("system-information-content");
    let trade = document.getElementById("system-trade-content");
    let currentTab = document.getElementsByClassName("tab-links active");
    let currentTabID = currentTab[0].id;
    //Bad - case switch?
    if (currentTabID === "all-systems") {
      currentTab = {
        target: {
          id: "system-information"
        }
      };
    }
    ;
    if (currentTabID === "system-information") {
      currentTab = {
        target: {
          id: "system-information"
        }
      };
    }
    ;
    if (currentTabID === "system-trade") {
      currentTab = {
        target: {
          id: "system-trade"
        }
      };
    }
    ;
    if (hex.system) {
      if (info.hasChildNodes()) {
        info.innerHTML = "";
      }
      if (trade.hasChildNodes()) {
        trade.innerHTML = "";
      }
      (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.generateInfoBox)(hex.system.tableData);
      if (hex.system.economicData) {
        (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.generateTradeBox)(hex.system.economicData);
      }
      (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.openTab)(currentTab, hex);
    }
    document.querySelectorAll(".clicked-hex").forEach(hex => hex.setAttribute("class", "hex"));
    document.getElementById(hex.id).setAttribute("class", "clicked-hex");
  }
  //Gets from hexCenter(), creates points for hex polygon
  hexPoints(centerpoint, hexSize) {
    this.hexCenter();
    let x = centerpoint.x;
    let y = centerpoint.y;
    let points = ``;

    //Create Points list
    for (let i = 0; i < 6; i++) {
      const angleDeg = 60 * i;
      const angleRad = Math.PI / 180 * angleDeg;
      let xPoint = hexSize * Math.cos(angleRad);
      let yPoint = hexSize * Math.sin(angleRad);
      //Above gives pixel coordinates at a 0,0 point.
      //Now to translate that to correct location.
      xPoint += x;
      yPoint += y;
      points += `${Math.floor(xPoint)}, ${Math.floor(yPoint)} `;
    }
    return points;
  }
  setMarker(centerpoint, newHex) {
    //Useful code for creating a dot at the middle of a hex.
    let cx = centerpoint.x;
    let cy = centerpoint.y;
    let mark = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    mark.setAttribute("cx", cx);
    mark.setAttribute("cy", cy);
    mark.setAttribute("r", 10);
    mark.setAttribute("id", "marker");
    newHex.appendChild(mark);
  }
  setMoveCost(system) {
    let cost = 1;
    if (!system) {
      cost = 3;
    }
    ;
    return cost;
  }
  setEdges(col, row, hexKey, SectorMap, colMax, rowMax) {
    let edges = [];
    let parity = col & 1;
    let dif = _utilities_js__WEBPACK_IMPORTED_MODULE_0__.direction_differences[parity];
    dif.forEach(direction => {
      let edgeCol = col + direction[0];
      let edgeRow = row + direction[1];
      if (edgeCol >= 0 && edgeCol <= colMax && edgeRow >= 0 && edgeRow <= rowMax) {
        //Have to find each edge's key from col and row. I guess it saves having to do it each time by saving it to the hex object?
        SectorMap.forEach((hex, key) => {
          if (hex.colNum == edgeCol && hex.rowNum == edgeRow) {
            edges.push({
              key: key,
              cost: hex.moveCost
            });
          }
        });
      }
    });
    return edges;
  }
}

/***/ }),

/***/ "./src/modules/mapCode.js":
/*!********************************!*\
  !*** ./src/modules/mapCode.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateMap: () => (/* binding */ generateMap),
/* harmony export */   resetMap: () => (/* binding */ resetMap)
/* harmony export */ });
/* harmony import */ var _makemap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makemap.js */ "./src/modules/makemap.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities.js */ "./src/modules/utilities.js");


//Data structure:
//document.getElementById("hex-container").sectorDataContainer.sector.SectorMap.get([hexKey]);

function generateMap(e) {
  let dataContainer;
  let gen = e.target.parentElement;
  //Uses default values:
  let col = gen.col.value;
  let row = gen.row.value;
  let scale = gen.scale.value;
  //Gets user input col and row values or uses default:
  if (!col) {
    col = 8;
  }
  if (!row) {
    row = 10;
  }
  if (!scale) {
    scale = 40;
  }
  if (document.querySelectorAll("#hex-container").length === 0) {
    dataContainer = new _makemap_js__WEBPACK_IMPORTED_MODULE_0__.Sector(col, row, scale);
  }
  //Creates Tab Display
  document.getElementById("tab-display").style.display = "block";
  let tab = document.getElementsByClassName("tab-links");
  for (let t = 0; t < tab.length; t++) {
    tab[t].style.display = "block";
    tab[t].addEventListener('click', _utilities_js__WEBPACK_IMPORTED_MODULE_1__.openTab);
  }
  let tabLinks = document.getElementsByClassName("tab-links");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  document.getElementById("all-systems").className += " active";
  (0,_utilities_js__WEBPACK_IMPORTED_MODULE_1__.allSystemsTable)(dataContainer.systemList);
  document.getElementById("content-container").style.height = `${document.getElementById("svg-container").offsetHeight}px`;
  document.getElementById("run-button").style.display = "block";
  document.getElementById("reset-button").style.display = "block";

  //Hides Map Generator div
  document.getElementById("map-generator").style.display = "none";
  document.getElementById("hex-container").sectorDataContainer = dataContainer;
}

//Resets map
function resetMap() {
  //fix CSS on generator section
  document.getElementById("map-generator").style.display = "inline-flex";
  document.getElementById("run-button").style.display = "none";
  document.getElementById("reset-button").style.display = "none";
  if (document.getElementById("system-information-content") !== null) {
    let systemContent = document.getElementById("system-information-content");
    let oldSystem = systemContent.firstElementChild;
    let allContent = document.getElementById("all-systems-content");
    let oldAll = allContent.firstElementChild;
    if (oldSystem !== null) systemContent.removeChild(oldSystem);
    if (oldAll !== null) allContent.removeChild(oldAll);
  }
  if (document.querySelectorAll("#hex-container").length > 0) {
    let mapContainer = document.getElementById("svg-container");
    let map = document.getElementById("hex-container");
    mapContainer.removeChild(map);
  }
  document.getElementById("tab-display").style.display = "none";
  let tabLinks = document.getElementsByClassName("tab-links");
  for (let t = 0; t < tabLinks.length; t++) {
    tabLinks[t].style.display = "none";
  }
}

/***/ }),

/***/ "./src/modules/pathfinding.js":
/*!************************************!*\
  !*** ./src/modules/pathfinding.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PriorityQueue: () => (/* binding */ PriorityQueue),
/* harmony export */   reconstructPath: () => (/* binding */ reconstructPath),
/* harmony export */   uniformCostSearchPathfinder: () => (/* binding */ uniformCostSearchPathfinder),
/* harmony export */   uniformCostSearchSystems: () => (/* binding */ uniformCostSearchSystems)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");

//Needs updating
//https://www.geeksforgeeks.org/implementation-priority-queue-javascript/
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Helper Methods
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }
  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }
  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }
  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }
  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }
  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }
  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }
  peek() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }

  // Removing an element will remove the
  // top element with highest priority then
  // heapifyDown will be called 
  get() {
    if (this.heap.length === 0) {
      return null;
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }
  put(item) {
    this.heap.push(item);
    this.heapifyUp();
  }
  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }
  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index] < this.heap[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
  isEmpty() {
    // return true if the queue is empty.
    if (this.heap.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}
function uniformCostSearchSystems(start, range) {
  const frontier = new PriorityQueue();
  const sectorData = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.getSectorData)();
  const graph = sectorData.SectorMap;
  const reached = [];
  const costSoFar = new Map(); //Location, float

  frontier.put(start);
  costSoFar.set(start, 0);
  while (!frontier.isEmpty()) {
    let currentKey = frontier.get();
    let current = graph.get(currentKey);
    let neighbours = current.edges;
    neighbours.forEach(hex => {
      let costToHere = costSoFar.get(currentKey);
      let newCost = costToHere + hex.cost;
      if (!costSoFar.has(hex.key) && newCost <= hex.cost && newCost <= range) {
        costSoFar.set(hex.key, newCost);
        frontier.put(hex.key);
        reached.push(hex.key);
      }
    });
  }
  //Returns an array of [hex.key...].
  return reached;
}
function uniformCostSearchPathfinder(start, goal, range) {
  const frontier = new PriorityQueue();
  const sectorData = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.getSectorData)();
  const graph = sectorData.SectorMap;
  const cameFrom = new Map(); // Location, optional location B <= A
  const costSoFar = new Map(); //Location, float

  frontier.put(start);
  cameFrom.set(start, null);
  costSoFar.set(start, 0);
  while (!frontier.isEmpty()) {
    let currentKey = frontier.get();
    let current = graph.get(currentKey);
    let neighbours = current.edges;
    if (currentKey == goal) {
      break;
    }
    neighbours.forEach(hex => {
      let costToHere = costSoFar.get(currentKey);
      let newCost = costToHere + hex.cost;
      if (!costSoFar.has(hex.key) && newCost <= hex.cost && newCost <= range) {
        costSoFar.set(hex.key, newCost);
        frontier.put(hex.key);
        cameFrom.set(hex.key, currentKey);
      }
    });
  }
  return cameFrom;
}
function reconstructPath(cameFrom, start, goal) {
  let current = goal;
  let path = [];
  if (!cameFrom.get(goal)) {
    return;
  }
  while (current != start) {
    path.push(current);
    current = cameFrom.get(current);
  }
  path.push(start);
  path.reverse();
  return path;
}

/***/ }),

/***/ "./src/modules/simulation.js":
/*!***********************************!*\
  !*** ./src/modules/simulation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkActiveHex: () => (/* binding */ checkActiveHex),
/* harmony export */   runTradeSimulation: () => (/* binding */ runTradeSimulation)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");

function runTradeSimulation() {
  const sector = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.getSectorData)();
  const activeHexes = [];
  sector.SectorMap.forEach(checkActiveHex, activeHexes);
  let maxValue = 0;
  console.log("Beep");
  activeHexes.forEach(hexKey => {
    origin = sector.SectorMap.get(hexKey);
    let range = origin.system.economicData.tradeRange;
    let tradePartners = origin.system.economicData.findTradePartners(hexKey, range);
    if (tradePartners.length > 0) {
      origin.system.economicData.setTradeRoutes(hexKey, tradePartners);
    }
  });
  activeHexes.forEach(hexKey => {
    origin = sector.SectorMap.get(hexKey);
    origin.system.economicData.tradeRoutes.forEach(route => {
      if (route.tradeRouteVolume > maxValue) {
        maxValue = route.tradeRouteVolume;
      }
      ;
    });
  });
  activeHexes.forEach(hexKey => {
    origin = sector.SectorMap.get(hexKey);
    origin.system.economicData.tradeRoutes.forEach(route => {
      //Issue in route.routeHexesArray
      if (route.routeHexesArray.length > 0) {
        route.drawConnectingLine(maxValue, route.routeHexesArray);
      }
      ;
    });
  });
}
function checkActiveHex(value, key) {
  if (value.system) {
    this.push(key);
  }
}

/***/ }),

/***/ "./src/modules/system.js":
/*!*******************************!*\
  !*** ./src/modules/system.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   System: () => (/* binding */ System)
/* harmony export */ });
/* harmony import */ var _economy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./economy.js */ "./src/modules/economy.js");
/* harmony import */ var _economyConstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./economyConstants.js */ "./src/modules/economyConstants.js");
/* harmony import */ var _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./systemConstants.js */ "./src/modules/systemConstants.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities.js */ "./src/modules/utilities.js");




class System {
  constructor(hexKey, id, centerPoint) {
    this.id = id;
    this.centerPoint = centerPoint;
    this.systemRolls = this.setSystemRolls();
    this.systemData = this.setSystemData(this.systemRolls);
    this.uwp = this.setUWP(this.systemRolls);
    this.economicData = new _economy_js__WEBPACK_IMPORTED_MODULE_0__.Economy(hexKey, this.systemRolls.get('tl'), this.systemRolls.get('government'), this.systemRolls.get('population'), this.systemData.tradeCodes);
    this.tableData = this.setTableData();
  }
  setSystemRolls() {
    let systemRolls = new Map([]);
    //Planet Size:
    let planetSize = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_3__.rollDice)(2) - 2;
    systemRolls.set('planetSize', planetSize);

    //Atmo Type:
    let atmoType = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_3__.rollDice)(2) - 7 + systemRolls.get('planetSize');
    if (atmoType < 0) {
      atmoType = 0;
    }
    systemRolls.set('atmoType', atmoType);

    //Hydro Perc:
    let hydroMod = 0;
    let atmo = systemRolls.get('atmoType');
    if (atmo === 0 || atmo === 1 || atmo === 10 || atmo === 11 || atmo === 12) {
      hydroMod = -4;
    }
    let hydroResult = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_3__.rollDice)(2) - 7 + systemRolls.get('planetSize') + hydroMod;
    hydroResult < 0 ? systemRolls.set('hydroType', 0) : systemRolls.set('hydroType', hydroResult);

    //Pop:
    let popRoll = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_3__.rollDice)(2) - 2;
    systemRolls.set('population', popRoll);

    //Gov Type:
    let govRoll = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_3__.rollDice)(2) - 7 + systemRolls.get('population');
    let govType = govRoll;
    if (govRoll > 13) {
      govType = 13;
    }
    if (govRoll < 0) {
      govType = 0;
    }
    systemRolls.set('government', govType);

    //Law Level:
    let lawRoll = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_3__.rollDice)(2) - 7 + govType;
    if (lawRoll < 0) {
      govRoll = 0;
      lawRoll = 0;
    }
    ;
    systemRolls.set('lawLevel', lawRoll);

    //Starport:
    let starport = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_3__.rollDice)(2);
    systemRolls.set('starport', starport);

    //TL:
    let starportDM;
    if (starport >= 11) {
      starportDM = 6;
    } else if (starport > 8 && starport < 11) {
      starportDM = 4;
    } else if (starport > 6 && starport < 8) {
      starportDM = 2;
    } else if (starport > 2 && starport < 7) {
      starportDM = 0;
    } else starportDM = -4;
    let sizeDM = 0;
    if (planetSize > 1 && planetSize < 5) {
      sizeDM = 1;
    } else if (planetSize < 2) {
      sizeDM = 2;
    } else sizeDM = 0;

    //TEMP
    let atmoDM = 0;
    if (atmoType < 4 || atmoType > 9) {
      atmoDM = 1;
    }
    let hydroDM = 0;
    if (hydroResult === 0 || hydroResult === 9) {
      hydroDM = 1;
    } else if (hydroResult === 10) {
      hydroDM = 2;
    }
    let popDM = 0;
    if (popRoll > 0 && popRoll < 6 || popRoll === 9) {
      popDM = 1;
    } else if (popRoll === 10) {
      popDM = 2;
    } else if (popRoll === 11) {
      popDM = 3;
    } else if (popRoll === 12) {
      popDM = 4;
    }
    let govDM = 0;
    if (govType === 0 || govType === 5) {
      govDM = 1;
    } else if (govType === 7) {
      govDM = 2;
    } else if (govType === 13 || govType === 14) {
      govDM = -2;
    }
    let TL = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_3__.rollDice)(1) + starportDM + sizeDM + atmoDM + hydroDM + popDM + govDM;
    if (TL < 0) {
      TL = 0;
    }
    systemRolls.set('tl', TL);
    return systemRolls;
  }
  setSystemData(systemRolls) {
    return {
      systemName: this.generateName(),
      size: this.setSize(systemRolls.get('planetSize')),
      atmosphere: this.setAtmosphere(systemRolls.get('atmoType')),
      hydrographics: this.setHydrographics(systemRolls.get('hydroType'), systemRolls.get('planetSize')),
      population: this.setPopulation(systemRolls.get('population')),
      government: this.setGovernment(systemRolls.get('government')),
      lawLevel: this.setLaw(systemRolls.get('lawLevel')),
      techLevel: this.setTL(systemRolls.get('tl')),
      starport: this.setStarport(systemRolls.get('starport')),
      tradeCodes: this.setTradeCodes(systemRolls, _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.TRADECODEREQS)
    };
  }

  //Returns formatted system data for table - redundant?
  setTableData() {
    let formattedPop = this.systemData.population.totalPopulation.toLocaleString();
    let tradeCodeLongArray = [];
    let formattedTradeCodes;
    let formatedHydroPercent = `${this.systemData.hydrographics.hydroPercent}%`;
    this.systemData.tradeCodes.forEach(code => {
      tradeCodeLongArray.push(_economyConstants_js__WEBPACK_IMPORTED_MODULE_1__.TRADECODES[code].codeName);
    });
    formattedTradeCodes = tradeCodeLongArray.join(", ");
    return {
      "UWP": `${this.uwp}`,
      "Name": this.systemData.systemName,
      "Size": `${this.systemData.size.size} km`,
      "Gravity": `${this.systemData.size.gravity} Earth Normal`,
      "Atmosphere": `${this.systemData.atmosphere.atmo} at ${this.systemData.atmosphere.psi} psi.`,
      "Hydropgraphics": formatedHydroPercent,
      "Population": formattedPop,
      "Government": this.systemData.government.governmentType,
      "Law Level": this.systemData.lawLevel.lawLevel,
      "Starport Grade": this.systemData.starport,
      "Tech Level": this.systemData.techLevel.tl,
      "Trade Code": formattedTradeCodes
    };
  }
  //  Name
  generateName() {
    //Code from internet to make a random string of letters.
    let randString = (length = 6) => {
      return Math.random().toString(20).substr(2, length);
    };
    let systemName = randString(6);
    return systemName;
  }
  //  Size
  setSize(sizeRoll) {
    let sizeIndex = sizeRoll;
    return {
      size: _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.SIZE[sizeIndex],
      gravity: _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.GRAVITY[sizeIndex]
    };
  }
  //  Atmosphere
  setAtmosphere(atmoRoll) {
    const psiCalc = (min, max) => {
      return Math.floor(Math.random() * (max * 1000 - min * 1000 + 1 + min * 1000)) / 1000;
    };
    let atmoIndex = atmoRoll;
    let psi = psiCalc(_systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.PSIMIN[atmoIndex], _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.PSIMAX[atmoIndex]);
    return {
      atmo: _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.ATMO[atmoIndex],
      psi: psi
    };
  }
  //  Hydrographics
  setHydrographics(hydro, size) {
    //For dumb reasons, despite producing values over 10, hydro is maxed at 10;
    let hydroIndex = hydro;
    hydro > 10 ? hydro = 10 : hydro;
    const hydroCalc = (min, max) => {
      return Math.floor(100 * (Math.random() * (max - min + 1 + min))) / 100;
    };
    let hydroPercent = hydroCalc(_systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.HYDROMIN[hydroIndex], _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.HYDROMAX[hydroIndex]);
    let hydroDesc = hydro;
    if (size <= 1) {
      hydroPercent = 0;
      hydroDesc = 11;
    }
    return {
      hydroPercent: hydroPercent,
      hydroDesc: _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.HYDRO[hydroIndex]
    };
  }
  //  Population
  setPopulation(pop) {
    //Numbers are a bit fudged, but who cares.
    let popRoll = pop;
    let totalPop = Math.pow(10, popRoll) + Math.floor(Math.random() * Math.pow(10, popRoll)) - 1;
    return {
      totalPopulation: totalPop
    };
  }
  //  Government
  setGovernment(govRoll) {
    let govIndex = govRoll;
    return {
      governmentType: _systemConstants_js__WEBPACK_IMPORTED_MODULE_2__.SYSTEM.GOV[govIndex]
    };
  }
  //  Laws
  setLaw(lawRoll) {
    let law = lawRoll;
    if (law > 9) {
      law = 9;
    }
    ;
    if (law < 0) {
      law = 0;
    }
    ;
    return {
      lawLevel: law
    };
  }
  //  Starports
  setStarport(stClass) {
    let starport;
    if (stClass > 10) {
      starport = "A";
    } else if (stClass === 10 || stClass === 9) {
      starport = "B";
    } else if (stClass === 8 || stClass === 7) {
      starport = "C";
    } else if (stClass === 6 || stClass === 5) {
      starport = "D";
    } else if (stClass === 4 || stClass === 3) {
      starport = "E";
    } else starport = "X";
    return starport;
  }
  //  Tech Level
  setTL(techRoll) {
    return {
      tl: techRoll
    };
  }
  // Trade Codes
  setTradeCodes(rolls, reqArray) {
    let tradeCodesArray = [];
    let size = rolls.get('planetSize');
    let atmo = rolls.get('atmoType');
    let hydro = rolls.get('hydroType');
    let pop = rolls.get('population');
    let gov = rolls.get('government');
    let law = rolls.get('lawLevel');
    reqArray.forEach(req => {
      let checkArray = [];
      if (req.siz.length === 0 || req.siz.includes(size)) {
        checkArray.push(true);
      } else {
        checkArray.push(false);
      }
      if (req.atm.length === 0 || req.atm.includes(atmo)) {
        checkArray.push(true);
      } else {
        checkArray.push(false);
      }
      if (req.hyd.length === 0 || req.hyd.includes(hydro)) {
        checkArray.push(true);
      } else {
        checkArray.push(false);
      }
      if (req.pop.length === 0 || req.pop.includes(pop)) {
        checkArray.push(true);
      } else {
        checkArray.push(false);
      }
      if (req.gov.length === 0 || req.gov.includes(gov)) {
        checkArray.push(true);
      } else {
        checkArray.push(false);
      }
      if (req.law.length === 0 || req.law.includes(law)) {
        checkArray.push(true);
      } else {
        checkArray.push(false);
      }
      if (checkArray.includes(false)) {
        return;
      } else {
        tradeCodesArray.push(req.code);
      }
    });
    return tradeCodesArray;
  }
  //  Creates Universal World Profile
  setUWP(rolls) {
    let uwp = `${this.systemData.starport}-` + `${this.numToHex(rolls.get('planetSize'))}` + `${this.numToHex(rolls.get('atmoType'))}` + `${this.numToHex(rolls.get('hydroType'))}` + `${this.numToHex(rolls.get('population'))}` + `${this.numToHex(rolls.get('government'))}` + `${this.numToHex(rolls.get('lawLevel'))}` + `${this.numToHex(rolls.get('tl'))}`;
    return uwp;
  }
  numToHex(num) {
    let code = num.toString(16);
    code = code.toUpperCase();
    return code;
  }
}

/***/ }),

/***/ "./src/modules/systemConstants.js":
/*!****************************************!*\
  !*** ./src/modules/systemConstants.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SYSTEM: () => (/* binding */ SYSTEM),
/* harmony export */   TRADECODEREQS: () => (/* binding */ TRADECODEREQS)
/* harmony export */ });
const SYSTEM = {
  SIZE: [800, 1600, 3200, 4800, 6400, 8000, 9600, 11200, 12800, 14400, 16000],
  GRAVITY: ["Negligible", 0.05, 0.15, 0.25, 0.35, 0.45, 0.7, 0.9, 1.0, 1.25, 1.4],
  ATMO: ["None", "Trace", "Very Thin, Tainted", "Very Thin", "Thin, Tainted", "Thin", "Standard", "Standard, Tainted", "Dense", "Dense, Tainted", "Exotic", "Corrosive", "Insidious", "Dense, High", "Thin, Low", "Unusual"],
  PSIMIN: [0, 0.001, 0.1, 0.1, 0.43, 0.43, 0.71, 0.71, 1.5, 1.5, 0.43, 0.43, 0.43, 1.5, 0.1, 0],
  PSIMAX: [0, 0.09, 0.42, 0.42, 0.7, 0.7, 1.49, 1.49, 2.49, 2.49, 2.49, 2.49, 2.49, 5, 0.5, 5],
  HYDROMIN: [0, 6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
  HYDROMAX: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 100],
  HYDRO: ["Desert World", "Dry World", "A few small seas", "Small seas and oceans", "Wet World", "Large oceans", "", "Terran Standard", "Water world", "Only a few small islands and archipelagos", "Almost entirely water", "None"],
  GOV: ["None", "Company/Corporation", "Participating Democracy", "Self-Perpetuating Oligarchy", "Representative Democracy", "Feudal Technocracy", "Captive Government", "Balkanisation", "Civil Service Bureaucracy", "Impersonal Bureaucracy", "Charismatic Dictator", "Non-Charistmatic Dictator", "Charismatic Oligarchy", "Religious Dictatorship"]
};
const TRADECODEREQS = [{
  code: "As",
  siz: [0],
  atm: [0],
  hyd: [0],
  pop: [],
  gov: [],
  law: []
}, {
  code: "De",
  siz: [],
  atm: [2, 3, 4, 5, 6, 7, 8, 9],
  hyd: [0],
  pop: [],
  gov: [],
  law: []
}, {
  code: "Fl",
  siz: [],
  atm: [10, 11, 12],
  hyd: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  pop: [],
  gov: [],
  law: []
}, {
  code: "Ga",
  siz: [6, 7, 8],
  atm: [5, 6, 8],
  hyd: [5, 6, 7],
  pop: [],
  gov: [],
  law: []
},
//Hellworld seems disconnected from other tags, remove?
{
  code: "He",
  siz: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  atm: [2, 3, 7, 8, 10, 11, 12],
  hyd: [0, 1, 2],
  pop: [],
  gov: [],
  law: []
}, {
  code: "Ic",
  siz: [],
  atm: [0, 1],
  hyd: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  pop: [],
  gov: [],
  law: []
}, {
  code: "Oc",
  siz: [10, 11, 12],
  atm: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  hyd: [10],
  pop: [],
  gov: [],
  law: []
}, {
  code: "Va",
  siz: [],
  atm: [0],
  hyd: [],
  pop: [],
  gov: [],
  law: []
}, {
  code: "Wa",
  siz: [3, 4, 5, 6, 7, 8, 9, 10],
  atm: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  hyd: [10],
  pop: [],
  gov: [],
  law: []
}, {
  code: "Ba",
  siz: [],
  atm: [],
  hyd: [],
  pop: [0],
  gov: [],
  law: []
}, {
  code: "Lo",
  siz: [],
  atm: [],
  hyd: [],
  pop: [1, 2, 3],
  gov: [],
  law: []
}, {
  code: "Ni",
  siz: [],
  atm: [],
  hyd: [],
  pop: [4, 5, 6],
  gov: [],
  law: []
}, {
  code: "Ph",
  siz: [],
  atm: [],
  hyd: [],
  pop: [7, 8],
  gov: [],
  law: []
}, {
  code: "Hi",
  siz: [],
  atm: [],
  hyd: [],
  pop: [9, 10, 11, 12, 13, 14, 15],
  gov: [],
  law: []
}, {
  code: "Pa",
  siz: [],
  atm: [4, 5, 6, 7, 8, 9],
  hyd: [4, 5, 6, 7, 8],
  pop: [4, 8],
  gov: [],
  law: []
}, {
  code: "Ag",
  siz: [],
  atm: [4, 5, 6, 7, 8, 9],
  hyd: [4, 5, 6, 7, 8],
  pop: [5, 6, 7],
  gov: [],
  law: []
}, {
  code: "Na",
  siz: [],
  atm: [0, 1, 2, 3],
  hyd: [],
  pop: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  gov: [],
  law: []
}, {
  code: "Pi",
  siz: [],
  atm: [0, 1, 2, 4, 7, 9],
  hyd: [],
  pop: [7, 8],
  gov: [],
  law: []
}, {
  code: "In",
  siz: [],
  atm: [0, 1, 2, 3, 7, 9, 10, 11, 12],
  hyd: [],
  pop: [9, 10, 11, 12, 13, 14, 15],
  gov: [],
  law: []
}, {
  code: "Po",
  siz: [],
  atm: [2, 3, 4, 5],
  hyd: [0, 1, 2, 3],
  pop: [],
  gov: [],
  law: []
}, {
  code: "Pr",
  siz: [],
  atm: [6, 8],
  hyd: [],
  pop: [5, 9],
  gov: [],
  law: []
}, {
  code: "Ri",
  siz: [],
  atm: [6, 8],
  hyd: [],
  pop: [6, 7, 8],
  gov: [],
  law: []
}];

/***/ }),

/***/ "./src/modules/tradeRoutes.js":
/*!************************************!*\
  !*** ./src/modules/tradeRoutes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TradeRoute: () => (/* binding */ TradeRoute)
/* harmony export */ });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities.js */ "./src/modules/utilities.js");
/* harmony import */ var _pathfinding_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathfinding.js */ "./src/modules/pathfinding.js");


class TradeRoute {
  constructor(start, end, maxRange) {
    this.startKey = start;
    this.endKey = end;
    this.routeKey = `${start}=>${end}`;
    this.routeHexesArray = this.findRoute(start, end, maxRange);
    this.startSystem = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.getSystem)(start);
    this.endSystem = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.getSystem)(end);
    this.startTradeInfo = this.startSystem.system.economicData.tradeInfo;
    this.endTradeInfo = this.endSystem.system.economicData.tradeInfo;
    this.routeTradeCapacity = this.setHighestTradeCapacity(this.startSystem.system.economicData.tradeCapacity, this.endSystem.system.economicData.tradeCapacity);
    //Need to fix tradeRouteVolume to fix line width.
    this.tradeRouteVolume = 0;
    this.tradeRouteProfit = 0;
    this.tradeRouteDetails = [];
  }
  //Red Blob Games to the rescue
  findRoute(start, end, range) {
    let pathFinder = (0,_pathfinding_js__WEBPACK_IMPORTED_MODULE_1__.uniformCostSearchPathfinder)(start, end, range);
    let route = (0,_pathfinding_js__WEBPACK_IMPORTED_MODULE_1__.reconstructPath)(pathFinder, start, end);
    return route;
  }
  setHighestTradeCapacity(startCapacity, endCapacity) {
    if (startCapacity >= endCapacity) {
      return startCapacity;
    } else return endCapacity;
  }
  exchangeGoods() {
    this.startTradeData.sellingIdArray.forEach(id => {
      let sellGood = this.startTradeInfo.supply.find(good => good.id == id);
      let buyGood = this.endTradeInfo.demand.find(good => good.id == id);
      let type = `sell`;
      if (sellGood != undefined && buyGood != undefined) {
        this.calculateSale(id, sellGood, buyGood, type);
      }
    });
    this.startTradeData.buyingIdArray.forEach(id => {
      let buyGood = this.startTradeInfo.demand.find(good => good.id == id);
      let sellGood = this.endTradeInfo.supply.find(good => good.id == id);
      let type = `buy`;
      if (sellGood && buyGood) {
        this.calculateSale(id, sellGood, buyGood, type);
      }
    });
  }
  calculateSale(id, sellGood, buyGood, type) {
    //This is where dynamic pricing would go - IF I HAD ANY
    let maxSellOffer = sellGood.supplyAmount;
    let maxBuyOffer = buyGood.demandAmount;
    let tradeCapacity = this.routeTradeCapacity;
    let exchangeArray = [maxSellOffer, maxBuyOffer, tradeCapacity];
    let offerAmount = Math.min(...exchangeArray);
    let sellPrice = buyGood.price;
    let profit = buyGood.price - sellGood.price;

    //THIS IS WHERE YOU CAN ABORT THE SALE
    //TEMP VALUE
    let sale = true;
    if (sale = true) {
      maxSellOffer -= offerAmount;
      maxBuyOffer -= offerAmount;
      this.tradeRouteVolume += offerAmount;
      this.tradeRouteProfit += profit;
      this.tradeRouteDetails.push({
        exchangeType: type,
        goodId: id,
        offerAmount: offerAmount,
        sellPrice: sellPrice,
        profit: profit
      });
    }
  }
  drawConnectingLine(maxValue, pathArray) {
    const width = this.calculateTradeRouteWidth(this.tradeRouteVolume, maxValue);
    const routeKey = this.routeKey;
    const tradeGroup = document.getElementById("trade-group");
    const sectorData = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_0__.getSectorData)();
    if (pathArray.length == 0) {
      return;
    }
    let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathStart = sectorData.SectorMap.get(pathArray[0]);
    let pathString = `M${pathStart.centerPoint.x} ${pathStart.centerPoint.y} `;
    for (let i = 1; i < pathArray.length; i++) {
      let step = sectorData.SectorMap.get(pathArray[i]);
      let stepCoords = step.centerPoint;
      let x = stepCoords.x;
      let y = stepCoords.y;
      pathString += `L${x} ${y} `;
    }
    newPath.setAttribute("d", pathString);
    newPath.setAttribute("class", "tradeLine");
    newPath.setAttribute("id", routeKey);
    newPath.setAttribute("style", `fill:none; stroke:red; stroke-width: ${width}`);
    newPath.addEventListener("click", this.tradeRouteOnClick);
    tradeGroup.appendChild(newPath);
  }
  calculateTradeRouteWidth(routeValue, maxValue) {
    let maxWidth = 20;
    let width;
    //Oh god, basic maths
    let min = maxValue / 100;
    let widthPercent = routeValue / (min * 100);
    width = Math.tanh(widthPercent) * 20;
    if (width < 4) {
      width = 4;
    }
    ;
    return width;
  }
  tradeRouteOnClick() {
    const SectorTradeRoutes = document.getElementById("hex-container").sectorDataContainer.SectorMap;
    console.log(this.id);
    let clickedRoute = SectorTradeRoutes.get(this.id);
    console.log(clickedRoute);
  }
}

/***/ }),

/***/ "./src/modules/utilities.js":
/*!**********************************!*\
  !*** ./src/modules/utilities.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMIdToHexKeyMap: () => (/* binding */ DOMIdToHexKeyMap),
/* harmony export */   HexKeyToDOMIdMap: () => (/* binding */ HexKeyToDOMIdMap),
/* harmony export */   allSystemsTable: () => (/* binding */ allSystemsTable),
/* harmony export */   direction_differences: () => (/* binding */ direction_differences),
/* harmony export */   generateInfoBox: () => (/* binding */ generateInfoBox),
/* harmony export */   generateTradeBox: () => (/* binding */ generateTradeBox),
/* harmony export */   getSectorData: () => (/* binding */ getSectorData),
/* harmony export */   getSystem: () => (/* binding */ getSystem),
/* harmony export */   openTab: () => (/* binding */ openTab),
/* harmony export */   rollDice: () => (/* binding */ rollDice),
/* harmony export */   scrollParentToChild: () => (/* binding */ scrollParentToChild)
/* harmony export */ });
/* harmony import */ var _economyConstants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./economyConstants.js */ "./src/modules/economyConstants.js");

const DOMIdToHexKeyMap = new Map();
const HexKeyToDOMIdMap = new Map();
const direction_differences = [
// even cols 
[[+1, 0], [+1, -1], [0, -1], [-1, -1], [-1, 0], [0, +1]],
// odd cols 
[[+1, +1], [+1, 0], [0, -1], [-1, 0], [-1, +1], [0, +1]]];
function getSectorData() {
  const sectorData = document.getElementById("hex-container").sectorDataContainer;
  return sectorData;
}
function getSystem(hexKey) {
  const sectorData = getSectorData();
  let system = sectorData.SectorMap.get(hexKey);
  return system;
}
function rollDice(numDice) {
  let total = 0;
  for (let i = 0; i < numDice; i++) {
    total += Math.floor(Math.random() * 6 + 1);
  }
  return total;
}
//Tab Control Code
//Currently only works for System Information
function openTab(event) {
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
  if (activeTab != undefined) {
    activeTab += "-content";
    document.getElementById(activeTab).style.display = "block";
    //this might not be working either way
  }
}
function generateInfoBox(tableData) {
  let container = document.getElementById("content-container");
  let infoBox = document.getElementById("system-information-content");
  if (infoBox === undefined || infoBox === null) {
    infoBox = document.createElement("div");
    infoBox.setAttribute("id", "system-information-content");
  }

  //Creates table
  let displayTable = document.createElement("table");
  displayTable.setAttribute("class", "info-table");
  displayTable.setAttribute("id", "all-systems-table");

  //Populates rows:
  let labels = [];
  let values = [];
  for (const data in tableData) {
    labels.push(data);
    values.push(tableData[data]);
  }
  for (let i = 0; i < labels.length; i++) {
    let row = displayTable.insertRow(i);
    let label = row.insertCell(0);
    let value = row.insertCell(1);
    label.innerHTML = labels[i];
    value.innerHTML = values[i];
  }
  container.appendChild(infoBox);
  infoBox.appendChild(displayTable);
}

//hex.system.systemData.economy.tradeData, "system-trade-table", "system-trade"
function generateTradeBox(data) {
  let supply = data.tradeInfo.supply;
  let demand = data.tradeInfo.demand;
  let container = document.getElementById("content-container");
  let tradeBox = document.getElementById("system-trade-content");
  if (tradeBox === null) {
    tradeBox = document.createElement("div");
    tradeBox.setAttribute("id", "system-trade-content");
  }
  //Creates table
  let displayTable = document.createElement("table");
  let tblbody = document.createElement("tbody");
  displayTable.setAttribute("class", "info-table");

  //Populates rows:
  let supplyIndex = [];
  let demandIndex = [];
  let goodsList = _economyConstants_js__WEBPACK_IMPORTED_MODULE_0__.TRADEGOODS.map(({
    goodsName
  }) => goodsName);
  goodsList.forEach((item, index) => {
    let matchSupply = supply.find(({
      good
    }) => good === item);
    if (matchSupply) {
      supplyIndex.push({
        index: index,
        amount: matchSupply.supplyAmount,
        price: matchSupply.price
      });
    }
    let matchDemand = demand.find(({
      good
    }) => good === item);
    if (matchDemand) {
      demandIndex.push({
        index: index,
        amount: matchDemand.demandAmount,
        price: matchDemand.price
      });
    }
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
  for (let i = 0; i < goodsList.length; i++) {
    let row = document.createElement("tr");
    let goodsListCell = document.createElement("td");
    let supplyIndexCell = document.createElement("td");
    let demandIndexCell = document.createElement("td");
    let goodsListText = document.createTextNode(goodsList[i]);
    let supplyItem = supplyIndex.find(({
      index
    }) => index === i);
    let demandItem = demandIndex.find(({
      index
    }) => index === i);
    let supplyPriceText = document.createTextNode("Not available");
    let demandPriceText = document.createTextNode("Not needed");
    if (supplyItem) {
      supplyPriceText = document.createTextNode(`${supplyItem.amount} units, at ${supplyItem.price} per unit`);
    }
    if (demandItem) {
      demandPriceText = document.createTextNode(`${demandItem.amount} units, at ${demandItem.price} per unit`);
    }
    goodsListCell.appendChild(goodsListText);
    supplyIndexCell.appendChild(supplyPriceText);
    demandIndexCell.appendChild(demandPriceText);
    row.appendChild(goodsListCell);
    row.appendChild(supplyIndexCell);
    row.appendChild(demandIndexCell);
    if (!(supplyPriceText.textContent === "Not available" && demandPriceText.textContent === "Not needed")) {
      tblbody.appendChild(row);
    }
  }
  container.appendChild(tradeBox);
  displayTable.appendChild(tblbody);
  tradeBox.appendChild(displayTable);
}
//Bring into standard with above table
//Currently not working
function allSystemsTable(systemsList) {
  let systemsBox = document.getElementById("all-systems-content");
  //Creates table
  let displayTable = document.createElement("table");
  document.getElementById("content-container").style.height = `${document.getElementById("svg-container").offsetHeight}px`;
  displayTable.setAttribute("class", "info-table");
  displayTable.setAttribute("id", "all-systems-table");
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
  for (let i = 1; i <= systemsList.length; i++) {
    let listKey = systemsList[i - 1][0];
    let listItem = systemsList[i - 1][1];
    let row = displayTable.insertRow(i);
    let hex = row.insertCell(0);
    hex.setAttribute("class", "allSystemsCell");
    let name = row.insertCell(1);
    name.setAttribute("class", "allSystemsCell");
    let uwp = row.insertCell(2);
    uwp.setAttribute("class", "allSystemsCell");
    row.setAttribute("id", `Row: ${listKey}`);
    row.setAttribute("class", "allSystemsRow");
    let relatedHex;
    row.onmouseover = event => {
      let selectedRowHex = event.currentTarget.id;
      let hexKey = DOMIdToHexKeyMap.get(selectedRowHex);
      relatedHex = getSystem(hexKey);
      let rowCells = event.currentTarget.childNodes;
      rowCells.forEach(function (cell) {
        cell.setAttribute("class", "allSystemsCellHover");
      });
      document.getElementById(`${relatedHex.id}`).setAttribute("class", "hover-hex");
      //this doesn't leave the original hex as clicked-hex
    };
    row.onmouseout = event => {
      let selectedRowHex = event.currentTarget.id;
      let hexKey = DOMIdToHexKeyMap.get(selectedRowHex);
      relatedHex = getSystem(hexKey);
      let rowCells = event.currentTarget.childNodes;
      rowCells.forEach(function (cell) {
        cell.setAttribute("class", "allSystemsCell");
      });
      let relatedHexPolygon = document.getElementById(`${relatedHex.id}`);
      if (relatedHexPolygon.getAttribute("class") != "clicked-hex") {
        relatedHexPolygon.setAttribute("class", "hex");
      }
    };
    row.onclick = function () {
      relatedHex.hexOnClick(relatedHex);
      document.getElementById(`${relatedHex.id}`).setAttribute("class", "clicked-hex");
    };
    hex.innerHTML = listItem.hex;
    name.innerHTML = listItem.name;
    uwp.innerHTML = listItem.uwp;
  }
}
//Code from https://stackoverflow.com/questions/45408920/plain-javascript-scrollintoview-inside-div
function scrollParentToChild(parent, child) {
  // Where is the parent on page
  var parentRect = parent.getBoundingClientRect();
  // What can you see?
  var parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth
  };

  // Where is the child
  var childRect = child.getBoundingClientRect();
  // Is the child viewable?
  var isViewable = childRect.top >= parentRect.top && childRect.bottom <= parentRect.top + parentViewableArea.height;

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // Should we scroll using top or bottom? Find the smaller ABS adjustment
    const scrollTop = childRect.top - parentRect.top;
    const scrollBot = childRect.bottom - parentRect.bottom;
    if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
      // we're near the top of the list
      parent.scrollTop += scrollTop;
    } else {
      // we're near the bottom of the list
      parent.scrollTop += scrollBot;
    }
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_mapCode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/mapCode.js */ "./src/modules/mapCode.js");
/* harmony import */ var _modules_simulation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/simulation.js */ "./src/modules/simulation.js");
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


document.getElementById("generator-button").addEventListener('click', _modules_mapCode_js__WEBPACK_IMPORTED_MODULE_0__.generateMap);
document.getElementById("reset-button").addEventListener('click', _modules_mapCode_js__WEBPACK_IMPORTED_MODULE_0__.resetMap);
document.getElementById("run-button").addEventListener('click', _modules_simulation_js__WEBPACK_IMPORTED_MODULE_1__.runTradeSimulation);
/* eslint-enable no-console */
/******/ })()
;
//# sourceMappingURL=view.js.map
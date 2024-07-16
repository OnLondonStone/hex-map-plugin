import { Economy } from "./economy.js";
import { TRADECODES } from "./economyConstants.js";
import { SYSTEM, TRADECODEREQS } from "./systemConstants.js";
import { rollDice } from "./utilities.js";

export class System{
    constructor(id, centerPoint){
        this.id = id;
        this.centerPoint = centerPoint;
        this.systemRolls = this.setSystemRolls();
        this.systemData = {
            systemName : this.generateName(),
            size : this.setSize(this.systemRolls.get('planetSize')),
            atmosphere : this.setAtmosphere(this.systemRolls.get('atmoType')),
            hydrographics : this.setHydrographics(this.systemRolls.get('hydroType'), this.systemRolls.get('planetSize')),
            population : this.setPopulation(this.systemRolls.get('population')),
            government : this.setGovernment(this.systemRolls.get('government')),
            lawLevel : this.setLaw(this.systemRolls.get('lawLevel')),
            techLevel : this.setTL(this.systemRolls.get('tl')),
            starport : this.setStarport(this.systemRolls.get('starport')),
            tradeCodes : this.setTradeCodes(this.systemRolls, TRADECODEREQS)
        }
        this.uwp = this.setUWP(this.systemRolls);
        this.economicData = new Economy(this.systemRolls.get('tl'), this.systemRolls.get('government'), this.systemRolls.get('population'), this.systemData.tradeCodes);
        this.init();
    }
    init(){
        this.tableData();
    }
    setSystemRolls(){
        let systemRolls = new Map([])
        //Planet Size:
        let planetSize = rollDice(2) - 2;
        systemRolls.set('planetSize', planetSize);
    
        //Atmo Type:
        let atmoType = rollDice(2) - 7 + systemRolls.get('planetSize');
        if(atmoType < 0){atmoType = 0}
        systemRolls.set('atmoType', atmoType);
    
        //Hydro Perc:
        let hydroMod = 0;
        let atmo = systemRolls.get('atmoType');
        if(atmo === 0 || atmo === 1 || atmo === 10 || atmo === 11 || atmo === 12){hydroMod = -4;}
        let hydroResult = rollDice(2) - 7 + systemRolls.get('planetSize') + hydroMod;
        hydroResult < 0 ? systemRolls.set('hydroType', 0) : systemRolls.set('hydroType', hydroResult);
    
        //Pop:
        let popRoll = rollDice(2) - 2;
        systemRolls.set('population', popRoll);
    
        //Gov Type:
        let govRoll = rollDice(2) - 7 + systemRolls.get('population');
        let govType = govRoll;
        if(govRoll > 13){govType = 13}
        if(govRoll < 0){govType = 0}
        systemRolls.set('government', govType);
    
        //Law Level:
        let lawRoll = rollDice(2) - 7 + govType;
        if(lawRoll < 0){govRoll = 0; lawRoll = 0};

        systemRolls.set('lawLevel', lawRoll);
    
        //Starport:
        let starport = rollDice(2);
        systemRolls.set('starport', starport);
    
        //TL:
        let starportDM;
        if(starport >= 11){starportDM = 6}
            else if(starport > 8 && starport < 11){starportDM = 4}
            else if(starport > 6 && starport < 8){starportDM = 2}
            else if(starport > 2 && starport < 7){starportDM = 0}
            else starportDM = -4;
    
        let sizeDM = 0;
        if(planetSize > 1 && planetSize < 5){sizeDM = 1}
            else if (planetSize < 2){sizeDM = 2}
                else sizeDM = 0;
        
        //TEMP
        let atmoDM = 0;
        if(atmoType < 4 || atmoType > 9){atmoDM = 1}
    
        let hydroDM = 0;
        if(hydroResult === 0 || hydroResult === 9){hydroDM = 1}
            else if(hydroResult === 10){hydroDM = 2}
    
        let popDM = 0;
        if((popRoll > 0 && popRoll < 6) || popRoll === 9){popDM = 1}
            else if(popRoll === 10){popDM = 2}
            else if(popRoll === 11){popDM = 3}
            else if(popRoll === 12){popDM = 4}
    
        let govDM = 0;
        if(govType === 0 || govType === 5){govDM = 1}
            else if (govType === 7){govDM = 2}
            else if (govType === 13 || govType === 14){govDM = -2}
    
        let TL = rollDice(1) + starportDM + sizeDM + atmoDM + hydroDM + popDM + govDM;
        if(TL < 0){TL = 0}
        systemRolls.set('tl', TL);
    
        return systemRolls;
    }

    //Returns formatted system data for table - redundant?
    tableData(){ 
        let formattedPop = this.systemData.population.totalPopulation.toLocaleString();
        let tradeCodeLongArray = [];
        let formattedTradeCodes;
        let formatedHydroPercent = `${this.systemData.hydrographics.hydroPercent}%`;

        this.systemData.tradeCodes.forEach((code) => {
            tradeCodeLongArray.push(TRADECODES[code].codeName)
        })

        formattedTradeCodes = tradeCodeLongArray.join(", ")

        return this.tableData = 
                {"UWP":`${this.uwp}`,
                "Name": this.systemData.systemName,
                "Size":`${this.systemData.size.size} km`,
                "Gravity":`${this.systemData.size.gravity} Earth Normal`, 
                "Atmosphere":`${this.systemData.atmosphere.atmo} at ${this.systemData.atmosphere.psi} psi.`, 
                "Hydropgraphics": formatedHydroPercent, 
                "Population":formattedPop,
                "Government":this.systemData.government.governmentType,
                "Law Level": this.systemData.lawLevel.lawLevel,
                "Starport Grade": this.systemData.starport,
                "Tech Level": this.systemData.techLevel.tl,
                "Trade Code": formattedTradeCodes,
                }                
    }
//  Name
    generateName(){
        //Code from internet to make a random string of letters.
        let randString = (length=6) => {return Math.random().toString(20).substr(2, length)};
        let systemName = randString(6);
        return systemName;
    }
//  Size
    setSize(sizeRoll){
        let sizeIndex = sizeRoll;
        return {size : SYSTEM.SIZE[sizeIndex], gravity : SYSTEM.GRAVITY[sizeIndex]};
    }
//  Atmosphere
    setAtmosphere(atmoRoll){
        const psiCalc = (min, max) => {return (Math.floor(Math.random()*(((max*1000)-(min*1000)+1)+(min*1000))))/1000};
        let atmoIndex = atmoRoll;
        let psi = psiCalc(SYSTEM.PSIMIN[atmoIndex], SYSTEM.PSIMAX[atmoIndex]);
        return {atmo : SYSTEM.ATMO[atmoIndex], psi : psi};
    }
//  Hydrographics
    setHydrographics(hydro, size){
        //For dumb reasons, despite producing values over 10, hydro is maxed at 10;
        let hydroIndex = hydro;
        hydro > 10 ? hydro = 10 : hydro; 
        const hydroCalc = (min, max) => {return (Math.floor((100*(Math.random()*(((max - min) + 1) + min))))/100);};
        let hydroPercent = hydroCalc(SYSTEM.HYDROMIN[hydroIndex], SYSTEM.HYDROMAX[hydroIndex]);
        let hydroDesc = hydro;
        if(size <= 1){
                hydroPercent = 0; 
                hydroDesc = 11;
            }
        return {hydroPercent : hydroPercent, hydroDesc : SYSTEM.HYDRO[hydroIndex]};
    }
//  Population
    setPopulation(pop){
        //Numbers are a bit fudged, but who cares.
        let popRoll = pop;
        let totalPop = Math.pow(10, popRoll) + (Math.floor(Math.random()*Math.pow(10, popRoll))) - 1; 
        return {totalPopulation : totalPop};
    }
//  Government
    setGovernment(govRoll){
        let govIndex = govRoll;
        return {governmentType : SYSTEM.GOV[govIndex]}
    }
//  Laws
    setLaw(lawRoll){
        let law = lawRoll
        if (law > 9){law = 9};
        if(law < 0){law = 0};
        return {lawLevel : law};
    }
//  Starports
    setStarport(stClass){
        let starport;
        if(stClass > 10){starport  = "A"}
            else if(stClass === 10 || stClass === 9){starport = "B"}
            else if(stClass === 8 || stClass === 7){starport = "C"}
            else if(stClass === 6 || stClass === 5){starport = "D"}
            else if(stClass === 4 || stClass === 3){starport = "E"}
            else starport = "X";
        return starport;
    }
//  Tech Level
    setTL(techRoll){
        return {tl : techRoll}
    }
// Trade Codes
    setTradeCodes(rolls, reqArray){
        let tradeCodesArray = [];
        
        let size = rolls.get('planetSize');
        let atmo = rolls.get('atmoType');
        let hydro = rolls.get('hydroType');
        let pop = rolls.get('population');
        let gov = rolls.get('government');
        let law = rolls.get('lawLevel');

        reqArray.forEach((req) => {
            let checkArray = [];                
            if(req.siz.length === 0 || req.siz.includes(size)){checkArray.push(true)} else {checkArray.push(false)}
            if(req.atm.length === 0 || req.atm.includes(atmo)){checkArray.push(true)} else {checkArray.push(false)}
            if(req.hyd.length === 0 || req.hyd.includes(hydro)){checkArray.push(true)} else {checkArray.push(false)}
            if(req.pop.length === 0 || req.pop.includes(pop)){checkArray.push(true)} else {checkArray.push(false)}
            if(req.gov.length === 0 || req.gov.includes(gov)){checkArray.push(true)} else {checkArray.push(false)}
            if(req.law.length === 0 || req.law.includes(law)){checkArray.push(true)} else {checkArray.push(false)}

            if(checkArray.includes(false)){return} else {tradeCodesArray.push(req.code)}
        })

        return tradeCodesArray;
    }
//  Creates Universal World Profile
    setUWP(rolls){
        let uwp = `${this.systemData.starport}-`+`${(this.numToHex(rolls.get('planetSize')))}`+
        `${(this.numToHex(rolls.get('atmoType')))}`+`${this.numToHex(rolls.get('hydroType'))}`+
        `${this.numToHex(rolls.get('population'))}`+`${this.numToHex(rolls.get('government'))}`+
        `${this.numToHex(rolls.get('lawLevel'))}`+`${this.numToHex(rolls.get('tl'))}`;
        return uwp;
    }
    numToHex(num){
        let code = num.toString(16);
        code = code.toUpperCase();
        return code;
    }
}
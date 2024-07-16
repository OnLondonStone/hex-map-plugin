//Change TradeCodes to array?
//Supply Demand Rework
//Supply
//In - 7-8, 9-F
//Ag - 4, 8 - 5-7
export const TRADECODES = { 
    "Template" : { 
        codeName : "Name",
        //Poss replace with supplies and demands
        tradeGoods : {supply : [], demand : []},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : ""
    },
    "As" : { 
        codeName : "Asteroid Belt",
        tradeGoods : {supply : [31, 42, 44, 45, 53], demand : [15, 21, 22, 25, 32]},
        modifier : {strength : 2, supplyEffect : ["Mining"], demandEffect : []},
        codeClass : "Planetary"
    },
    "De" : { 
        codeName : "Desert",
        tradeGoods : {supply : [31, 41, 42, 44, 45, 51, 54], demand : []},
        modifier : {strength : 1, supplyEffect : ["Resource", "Mining"], demandEffect : []},
        codeClass : "Planetary"
    },
    "Fl" : { 
        codeName : "Fluid Oceans",
        tradeGoods : {supply : [41, 44], demand : [15]},
        modifier : {strength : 0.5, supplyEffect : ["Resource"], demandEffect : []},
        codeClass : "Planetary"
    },
    "Ga" : { 
        codeName : "Garden",
        tradeGoods : {supply : [33, 34, 51, 55], demand : []},
        modifier : {strength : 2, supplyEffect : ["Resource"], demandEffect : []},
        codeClass : "Planetary"
    },
    "He" : { 
        codeName : "Hell-World",
        tradeGoods : {supply : [], demand : []},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : "Planetary",
    },
    "Ic" : { 
        codeName : "Ice-Capped",
        tradeGoods : {supply : [31, 41, 44, 53], demand : [15, 32]},
        modifier : {strength : 1, supplyEffect : ["Resource"], demandEffect : []},
        codeClass : "Planetary"
    },
    "Oc" : { 
        codeName : "Ocean World",
        tradeGoods : {supply : [26, 35, 41, 42, 51, 54], demand : []},   
        modifier : {strength : 0.5, supplyEffect : ["Resource"], demandEffect : []},
        codeClass : "Planetary"
    },
    "Va" : { 
        codeName : "Vacuum",
        tradeGoods : {supply : [], demand : []},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : "Planetary"
    },
    "Wa" : { 
        codeName : "Water World",
        tradeGoods : {supply : [26, 35, 41, 42, 51, 54], demand : []},
        modifier : {strength : 1, supplyEffect : ["Resource"], demandEffect : []},
        codeClass : "Planetary"
    },
    "Di" : { 
        codeName : "Die-Back",
        tradeGoods : {supply : [], demand : []},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : "Population"
    },
    "Ba" : { 
        codeName : "Barren",
        tradeGoods : {supply : [], demand : []},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : "Population"
    },
    "Lo" : { 
        codeName : "Low Population",
        tradeGoods : {supply : [11, 12, 13, 14, 15, 16, 45], demand : [33]},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : "Population",
    },
    "Ni" : { 
        codeName : "Non-Industrial",
        tradeGoods : {supply : [11, 12, 13, 14, 15, 16, 52], demand : [11, 12, 16, 21, 22, 43, 53, 56]},
        modifier : {strength : 1, supplyEffect : [], demandEffect : ["Consumables", "Industrial"]},
        codeClass : "Population"
    },
    "Ph" : { 
        codeName : "Pre-High Population",
        tradeGoods : {supply : [11, 12, 13, 14, 15, 16, 35, 36, 42], demand : [13, 15, 23, 34, 51, 52, 56]},
        modifier : {strength : 0.5, supplyEffect : [], demandEffect : ["Consumables", "Industrial"]},
        codeClass : "Population"
    },
    "Hi" : { 
        codeName : "High Population",
        tradeGoods : {supply : [11, 12, 13, 14, 15, 16, 35, 36, 42], demand : [13, 15, 23, 34, 51, 52, 56]},
        modifier : {strength : 1, supplyEffect : [], demandEffect : ["Consumables", "Industrial"]},
        codeClass : "Population"
    },
    "Pa" : { 
        codeName : "Pre-Agricultural",
        tradeGoods : {supply : [26, 33, 34, 52, 54, 55], demand : [12, 41, 46]},
        modifier : {strength : 0.5, supplyEffect : ["Organic"], demandEffect : ["Industrial"]},
        codeClass : "Output"
    },
    "Ag" : { 
        codeName : "Agricultural",
        tradeGoods : {supply : [26, 33, 34, 52, 54, 55], demand : [12, 41, 46]},
        modifier : {strength : 1, supplyEffect : ["Organic"], demandEffect : ["Industrial"]},
        codeClass : "Output"
    },
    "Na" : { 
        codeName : "Non-Agricultural",
        tradeGoods : {supply : [], demand : [52]},
        modifier : {strength : 1, supplyEffect : [], demandEffect : ["Consumables"]},
        codeClass : "Economic"
    },
    "Pi" : { 
        codeName : "Pre-Industrial",
        tradeGoods : {supply : [21, 22, 23, 24, 25, 43, 46, 56], demand : [14, 16, 26, 31, 36, 44, 45, 53, 54]},
        modifier : {strength : 0.5, supplyEffect : ["Industrial"], demandEffect : ["Resource", "Mining"]},
        codeClass : "Output"
    },
    "In" : { 
        codeName : "Industrial",
        tradeGoods : {supply : [21, 22, 23, 24, 25, 43, 46, 56], demand : [14, 16, 26, 31, 36, 44, 45, 53, 54]},
        modifier : {strength : 1, supplyEffect : ["Industrial"], demandEffect : ["Resource", "Mining"]},
        codeClass : "Output"
    },
    "Po" : { 
        codeName : "Poor",
        tradeGoods : {supply : [11], demand : [11, 14, 24, 36, 51]},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : "Economic"
    },
    "Pr" : { 
        codeName : "Pre-Rich",
        tradeGoods : {supply : [], demand : [21, 23, 25, 31, 32, 35, 36, 42, 43, 44, 51, 55]},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : "Economic"
    },
    "Ri" : { 
        codeName : "Rich",
        tradeGoods : {supply : [], demand : [21, 23, 25, 31, 32, 35, 36, 42, 43, 44, 51, 55]},
        modifier : {strength : 1, supplyEffect : [], demandEffect : []},
        codeClass : "Economic"
    }
}
//Supply Output = Pop * *(0.5 if poor, 2 if Rich, 1.5 if Pre-Rich)
//Demand = 
// Classes = Basic/Advanced Industrial, Basic/Advanced Resource, Basic/Advanced Organic, Luxury, Basic/Advanced Comsumables

export const TRADEGOODS = [
    {id : 11, goodsName : "Basic Electronics",              goodsClass : "Industrial",   basePrice : 10},
    {id : 12, goodsName : "Basic Machine Parts",            goodsClass : "Industrial",   basePrice : 10},
    {id : 13, goodsName : "Basic Manufactured Goods",       goodsClass : "Industrial",   basePrice : 10},
    {id : 14, goodsName : "Basic Raw Materials",            goodsClass : "Resource",     basePrice : 5}, 
    {id : 15, goodsName : "Basic Consumables",              goodsClass : "Comsumables",      basePrice : 2},
    {id : 16, goodsName : "Basic Ore",                      goodsClass : "Mining",              basePrice : 1},

    {id : 21, goodsName : "Advanced Electronics",           goodsClass : "Industrial",   basePrice : 100},
    {id : 22, goodsName : "Advanced Machine Parts",         goodsClass : "Industrial",   basePrice : 75},
    {id : 23, goodsName : "Advanced Manufactured Goods",    goodsClass : "Industrial",   basePrice : 100},
    {id : 24, goodsName : "Advanced Weapons",               goodsClass : "Industrial",   basePrice : 150},
    {id : 25, goodsName : "Advanced Vehicles",              goodsClass : "Industrial",   basePrice : 180},

    {id : 26, goodsName : "Biochemicals",                   goodsClass : "Resource",      basePrice : 50},
    {id : 31, goodsName : "Crystals and Gems",              goodsClass : "Mining",     basePrice : 20},
    {id : 32, goodsName : "Cybernetics",                    goodsClass : "Industial",   basePrice : 250},
    {id : 33, goodsName : "Live Animals",                   goodsClass : "Resource",     basePrice : 10},
    {id : 34, goodsName : "Luxury Consumables",             goodsClass : "Consumables",      basePrice : 20},
    {id : 35, goodsName : "Luxury Goods",                   goodsClass : "Industrial",   basePrice : 200},
    {id : 36, goodsName : "Medical Supplies",               goodsClass : "Industrial",   basePrice : 50},
    {id : 41, goodsName : "Petrochemicals",                 goodsClass : "Resource",     basePrice : 10},
    {id : 42, goodsName : "Pharmaceuticals",                goodsClass : "Industrial",   basePrice : 100},
    {id : 43, goodsName : "Polymers",                       goodsClass : "Resource",     basePrice : 7},
    {id : 44, goodsName : "Precious Metals",                goodsClass : "Resource",     basePrice : 50},
    {id : 45, goodsName : "Radioactives",                   goodsClass : "Resource",     basePrice : 1000},
    {id : 46, goodsName : "Robots",                         goodsClass : "Industrial",   basePrice : 400},
    {id : 51, goodsName : "Spices",                         goodsClass : "Comsumables",      basePrice : 6},
    {id : 52, goodsName : "Textiles",                       goodsClass : "Industrial",   basePrice : 3},
    {id : 53, goodsName : "Uncommon Ore",                   goodsClass : "Mining",     basePrice : 5},
    {id : 54, goodsName : "Uncommon Raw Materials",         goodsClass : "Resource",     basePrice : 20},
    {id : 55, goodsName : "Wood",                           goodsClass : "Resource",      basePrice : 1},
    {id : 56, goodsName : "Vehicles",                       goodsClass : "Industrial",   basePrice : 15}
    ];
//Currently not being used - fold into 
export const BASICTRADEGOODS = [11, 12, 13, 14, 15, 16];
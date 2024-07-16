export const SYSTEM = {
    SIZE : [800, 1600, 3200, 4800, 6400, 8000, 9600, 11200, 12800, 14400, 16000],
    GRAVITY : ["Negligible", 0.05, 0.15, 0.25, 0.35, 0.45, 0.7, 0.9, 1.0, 1.25, 1.4],
    ATMO :["None", "Trace", "Very Thin, Tainted", "Very Thin", "Thin, Tainted", "Thin", "Standard", 
    "Standard, Tainted","Dense", "Dense, Tainted", "Exotic", "Corrosive", "Insidious", 
    "Dense, High", "Thin, Low", "Unusual"],
    PSIMIN : [0, 0.001, 0.1, 0.1, 0.43, 0.43, 0.71, 0.71, 1.5, 1.5, 0.43, 0.43, 0.43, 1.5, 0.1, 0],
    PSIMAX : [0, 0.09, 0.42, 0.42, 0.7, 0.7, 1.49, 1.49, 2.49, 2.49, 2.49, 2.49, 2.49, 5, 0.5, 5],
    HYDROMIN : [0, 6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
    HYDROMAX :[5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 100],
    HYDRO : ["Desert World", "Dry World", "A few small seas", "Small seas and oceans", "Wet World", "Large oceans",
    "", "Terran Standard", "Water world", "Only a few small islands and archipelagos",
    "Almost entirely water", "None"],
    GOV : [ "None","Company/Corporation","Participating Democracy","Self-Perpetuating Oligarchy",
    "Representative Democracy","Feudal Technocracy","Captive Government","Balkanisation",
    "Civil Service Bureaucracy","Impersonal Bureaucracy","Charismatic Dictator",
    "Non-Charistmatic Dictator","Charismatic Oligarchy","Religious Dictatorship"]
}

export const TRADECODEREQS =[
    {code : "As", siz :[0], atm : [0], hyd :[0], pop :[], gov : [], law : []},
    {code : "De", siz :[], atm : [2, 3, 4, 5, 6, 7, 8, 9], hyd :[0], pop :[], gov : [], law : []},
    {code : "Fl", siz :[], atm : [10, 11, 12], hyd :[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], pop :[], gov : [], law : []},
    {code : "Ga", siz :[6, 7, 8], atm : [5, 6, 8], hyd :[5, 6, 7], pop :[], gov : [], law : []},
    //Hellworld seems disconnected from other tags, remove?
    {code : "He", siz :[3, 4, 5, 6, 7, 8, 9, 10, 11, 12], atm : [2, 3, 7, 8, 10, 11, 12], hyd :[0, 1, 2], pop :[], gov : [], law : []},
    {code : "Ic", siz :[], atm : [0, 1], hyd :[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], pop :[], gov : [], law : []},
    {code : "Oc", siz :[10, 11, 12], atm : [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hyd :[10], pop :[], gov : [], law : []},
    {code : "Va", siz :[], atm : [0], hyd :[], pop :[], gov : [], law : []},
    {code : "Wa", siz :[3, 4, 5, 6, 7, 8, 9, 10], atm : [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hyd :[10], pop :[], gov : [], law : []},
    
    {code : "Ba", siz :[], atm : [], hyd :[], pop :[0], gov : [], law : []},
    {code : "Lo", siz :[], atm : [], hyd :[], pop :[1, 2, 3], gov : [], law : []},
    {code : "Ni", siz :[], atm : [], hyd :[], pop :[4, 5, 6], gov : [], law : []},
    {code : "Ph", siz :[], atm : [], hyd :[], pop :[7, 8], gov : [], law : []},
    {code : "Hi", siz :[], atm : [], hyd :[], pop :[9, 10, 11, 12, 13, 14, 15], gov : [], law : []},
    
    {code : "Pa", siz :[], atm : [4, 5, 6, 7, 8, 9], hyd :[4, 5, 6, 7, 8], pop :[4, 8], gov : [], law : []},
    {code : "Ag", siz :[], atm : [4, 5, 6, 7, 8, 9], hyd :[4, 5, 6, 7, 8], pop :[5, 6, 7], gov : [], law : []},
    {code : "Na", siz :[], atm : [0, 1, 2, 3], hyd :[], pop :[6, 7, 8, 9, 10, 11, 12, 13, 14, 15], gov : [], law : []},
    {code : "Pi", siz :[], atm : [0, 1, 2, 4, 7, 9], hyd :[], pop :[7, 8], gov : [], law : []},
    {code : "In", siz :[], atm : [0, 1, 2, 3, 7, 9, 10, 11, 12], hyd :[], pop :[9, 10, 11, 12, 13, 14, 15], gov : [], law : []},
    {code : "Po", siz :[], atm : [2, 3, 4, 5], hyd :[0, 1, 2, 3], pop :[], gov : [], law : []},
    {code : "Pr", siz :[], atm : [6, 8], hyd :[], pop :[5, 9], gov : [], law : []},
    {code : "Ri", siz :[], atm : [6, 8], hyd :[], pop :[6, 7, 8], gov : [], law : []}
]
import { TRADECODES, TRADEGOODS, BASICTRADEGOODS } from './economyConstants.js';
import { TradeRoute } from './tradeRoutes.js';
import { getSectorData, getSystem } from './utilities.js';
import { uniformCostSearchSystems } from './pathfinding.js';

export class Economy {
	constructor( hexKey, techLevel, government, popRoll, tradeCodes ) {
		this.techLevel = techLevel;
		this.govtTier = government;
		this.tradeCodes = tradeCodes;
		this.popRoll = popRoll;
		this.tradeCapacity = this.setTradeCapacity(
			this.tradeCodes,
			this.popRoll
		);
		this.tradeInfo = this.setTradeInfo(
			this.popRoll,
			this.tradeCodes,
			BASICTRADEGOODS
		);
		this.tradeBalance = 0;
		this.tradeRange = this.setTradeRange( this.techLevel, this.tradeCodes );
		this.tradeRoutes = new Map();
	}

	setTradeCapacity( tradeCodes, pop ) {
		let tradeMultiplier;
		let tradeCapacity;

		if ( tradeCodes.includes( 'Ba' ) ) {
			tradeMultiplier = 0;
		}
		if ( tradeCodes.includes( 'Lo' ) ) {
			tradeMultiplier = 1;
		}
		if ( tradeCodes.includes( 'Ni' ) ) {
			tradeMultiplier = 2;
		}
		if ( tradeCodes.includes( 'Ph' ) ) {
			tradeMultiplier = 4;
		}
		if ( tradeCodes.includes( 'Hi' ) ) {
			tradeMultiplier = 8;
		}

		tradeCapacity = tradeMultiplier * pop;
		return tradeCapacity;
	}
	//Poss check for duplicated values
	setTradeInfo( pop, tradeCodes ) {
		let supplyArray = [];
		let demandArray = [];

		let tradeInfo = {};
		tradeCodes.forEach( ( code ) => {
			let codeArray = [ code ];

			supplyArray.push( ...this.setSupply( pop, codeArray ) );
			demandArray.push( ...this.setDemand( pop, codeArray ) );
		} );

		tradeInfo.supply = supplyArray;
		tradeInfo.demand = demandArray;

		tradeInfo = this.setInitialPricing( tradeInfo );

		return tradeInfo;
	}
	setSystemModifiers( tradeCodes ) {
		let modifiers = [];

		tradeCodes.forEach( ( code ) => {
			modifiers.push( TRADECODES[ code ].modifiers );
		} );

		return modifiers;
	}
	//Not working -?
	setSupply( pop, tradeCodes ) {
		let supplies = [];
		let supplyArray = [];

		tradeCodes.forEach( ( code ) => {
			let codeConst = TRADECODES[ code ];
			let newGoods = codeConst.tradeGoods.supply;
			supplies.push( ...newGoods );

			supplies.forEach( ( good ) => {
				let tradeGood = this.getGoodsDetails( good );
				let supplyAmount;
				if (
					codeConst.modifier.supplyEffect.includes(
						tradeGood.goodsClass
					)
				) {
					supplyAmount =
						10 * codeConst.modifier.strength * ( pop * pop );
				} else {
					supplyAmount = 1 * ( pop * pop );
				}
				tradeGood.supplyAmount = supplyAmount;
				supplyArray.push( {
					id: tradeGood.id,
					good: tradeGood.goodsName,
					basePrice: tradeGood.basePrice,
					supplyAmount: tradeGood.supplyAmount,
					foundDemand: 0,
				} );
			} );
		} );
		return supplyArray;
	}
	//Not working -?
	setDemand( pop, tradeCodes ) {
		let demands = [];
		let demandsArray = [];

		tradeCodes.forEach( ( code ) => {
			let codeConst = TRADECODES[ code ];
			let newGoods = codeConst.tradeGoods.demand;
			demands.push( ...newGoods );

			demands.forEach( ( good ) => {
				let tradeGood = this.getGoodsDetails( good );
				let demandAmount;
				if (
					codeConst.modifier.demandEffect.includes(
						tradeGood.goodsClass
					)
				) {
					demandAmount =
						10 * codeConst.modifier.strength * ( pop * pop );
				} else {
					demandAmount = 1 * ( pop * pop );
				}
				tradeGood.demandAmount = demandAmount;
				demandsArray.push( {
					id: tradeGood.id,
					good: tradeGood.goodsName,
					basePrice: tradeGood.basePrice,
					demandAmount: tradeGood.demandAmount,
					foundSupply: 0,
				} );
			} );
		} );
		return demandsArray;
	}
	getGoodsDetails( goodID ) {
		let selectedGood = TRADEGOODS.find( ( { id } ) => id === goodID );
		return selectedGood;
	}
	setInitialPricing( tradeInfo ) {
		let updatedSupply = this.updateSupply( tradeInfo.supply );
		let updatedDemand = this.updateDemand( tradeInfo.demand );

		tradeInfo.supply = updatedSupply;
		tradeInfo.demand = updatedDemand;

		return tradeInfo;
	}

	updateSupply( supply ) {
		supply.forEach( ( good ) => {
			good.price = good.basePrice;
			//good.price = good.price.toPrecision(4);
		} );
		return supply;
	}
	updateDemand( demand ) {
		demand.forEach( ( good ) => {
			good.price = good.basePrice;
			//good.price = good.price.toPrecision(4);
		} );
		return demand;
	}
	setTradeRange( tech, tradeCodes ) {
		let tradeRange = 1;

		if ( tech == 11 ) {
			tradeRange = 2;
		}
		if ( tech == 12 ) {
			tradeRange = 3;
		}
		if ( tech == 13 ) {
			tradeRange = 4;
		}
		if ( tech == 14 ) {
			tradeRange = 5;
		}
		if ( tech >= 15 ) {
			tradeRange = 6;
		}

		if ( tradeCodes.includes( 'Ba' ) ) {
			tradeRange = 0;
		}

		return tradeRange;
	}
	findTradePartners( startKey, tradeRange ) {
		let tradePartnersList = uniformCostSearchSystems(
			startKey,
			tradeRange
		);
		//Returns an array of hexKeys
		return tradePartnersList;
	}
	//This is a map, called from runSimulation, hexKey is origin
	setTradeRoutes( startKey, tradePartnersList ) {
		const tradeRange = this.tradeRange;
		tradePartnersList.forEach( ( hexKey ) => {
			let hex = getSystem( hexKey );
			if ( hex.system ) {
				let tradeRoute = new TradeRoute( startKey, hexKey, tradeRange );
				this.tradeRoutes.set( hexKey, tradeRoute );
			}
			console.log( this.tradeRoutes );
		} );
	}
}

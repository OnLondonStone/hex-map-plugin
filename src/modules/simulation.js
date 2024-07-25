import { getSectorData, getSystem } from './utilities';

export function runTradeSimulation() {
	const sector = getSectorData();
	const activeHexes = [];
	sector.SectorMap.forEach( checkActiveHex, activeHexes );
	let maxValue = 0;
	console.log( 'Beep' );

	activeHexes.forEach( ( hexKey ) => {
		origin = sector.SectorMap.get( hexKey );
		let range = origin.system.economicData.tradeRange;
		let tradePartners = origin.system.economicData.findTradePartners(
			hexKey,
			range
		);
		if ( tradePartners.length > 0 ) {
			origin.system.economicData.setTradeRoutes( hexKey, tradePartners );
		}
	} );
	activeHexes.forEach( ( hexKey ) => {
		origin = sector.SectorMap.get( hexKey );
		origin.system.economicData.tradeRoutes.forEach( ( route ) => {
			if ( route.tradeRouteVolume > maxValue ) {
				maxValue = route.tradeRouteVolume;
			}
		} );
	} );
	activeHexes.forEach( ( hexKey ) => {
		origin = sector.SectorMap.get( hexKey );
		origin.system.economicData.tradeRoutes.forEach( ( route ) => {
			//Issue in route.routeHexesArray
			if ( route.routeHexesArray.length > 0 ) {
				route.drawConnectingLine( maxValue, route.routeHexesArray );
			}
		} );
	} );
	activeHexes.forEach( ( hexKey ) => {
		makeTrades( hexKey );
	} );
}

export function checkActiveHex( value, key ) {
	if ( value.system ) {
		this.push( key );
	}
}

export function makeTrades( originKey ) {
	const originHex = getSystem( originKey );
	const originSupply = originHex.system.economicData.tradeInfo.supply;
	const originDemands = originHex.system.economicData.tradeInfo.demands;

	const tradeRoutes = originHex.system.economicData.tradeRoutes;

	const availableSalePrices = []; //Format, (hexKey, price)
	const availablePurchasePrices = [];

	const highestSalePrice = new Map();
	const lowestPurchasePrice = new Map();

	originSupply.forEach( ( good ) => {
		tradeRoutes.forEach( ( route ) => {
			let endKey = route.endKey;
			let endHex = getSystem( endKey );
			let endDemands = endHex.system.economicData.tradeInfo.demands;
			endDemands.forEach( ( demand ) => {
				if ( demand.id == good.id ) {
					availableSalePrices.push( [ endKey, demand ] );
				}
			} );
		}, good );
		let highestPriceEntry = Math.max( ...availableSalePrices[ 1 ].price );
		let demandHex = availableSalePrices.findIndex(
			( price ) => price[ 1 ] == highestPriceEntry.price
		);
		let sellAmount = route.setAmount(
			good,
			highestPriceEntry.price,
			'sell'
		);
		highestSalePrice.set( demandHex, {
			good: good.id,
			price: highestPriceEntry.price,
			amountSold: sellAmount,
		} );
		availableSalePrices = [];
	} );
	originDemands.forEach( ( good ) => {
		tradeRoutes.forEach( ( route ) => {
			let endKey = route.endKey;
			let endHex = getSectorData( endKey );
			let endSupply = endHex.system.economicData.tradeInfo.supply;
			endSupply.forEach( ( supply ) => {
				if ( supply.id == good.id ) {
					availablePurchasePrices.push( [ endKey, supply ] );
				}
			} );
		}, good );
		let lowestPriceEntry = Math.min(
			...availablePurchasePrices[ 1 ].price
		);
		let supplyHex = availablePurchasePrices.findIndex(
			( price ) => price[ 1 ] == lowestPriceEntry.price
		);
		let buyAmount = route.setAmount( good, lowestPriceEntry.price, 'buy' );
		lowestPurchasePrice.set( supplyHex, {
			good: good.id,
			price: lowestPriceEntry.price,
			amountBought: buyAmount,
		} );
		availablePurchasePrices = [];
	} );
}

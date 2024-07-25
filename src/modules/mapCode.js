import { Sector } from './makemap.js';
import { openTab, allSystemsTable } from './utilities.js';
//Data structure:
//document.getElementById("hex-container").sectorDataContainer.sector.SectorMap.get([hexKey]);

export function generateMap( e ) {
	let dataContainer;
	let gen = e.target.parentElement;
	//Uses default values:
	let col = gen.col.value;
	let row = gen.row.value;
	let scale = gen.scale.value;
	//Gets user input col and row values or uses default:
	if ( ! col ) {
		col = 8;
	}
	if ( ! row ) {
		row = 10;
	}
	if ( ! scale ) {
		scale = 40;
	}
	if ( document.querySelectorAll( '#hex-container' ).length === 0 ) {
		dataContainer = new Sector( col, row, scale );
	}
	//Creates Tab Display
	document.getElementById( 'tab-display' ).style.display = 'block';
	let tab = document.getElementsByClassName( 'tab-links' );
	for ( let t = 0; t < tab.length; t++ ) {
		tab[ t ].style.display = 'block';
		tab[ t ].addEventListener( 'click', openTab );
	}
	let tabLinks = document.getElementsByClassName( 'tab-links' );
	for ( let i = 0; i < tabLinks.length; i++ ) {
		tabLinks[ i ].className = tabLinks[ i ].className.replace(
			' active',
			''
		);
	}
	document.getElementById( 'all-systems' ).className += ' active';
	allSystemsTable( dataContainer.systemList );

	document.getElementById( 'content-container' ).style.height = `${
		document.getElementById( 'svg-container' ).offsetHeight
	}px`;

	document.getElementById( 'run-button' ).style.display = 'block';

	document.getElementById( 'reset-button' ).style.display = 'block';

	//Hides Map Generator div
	document.getElementById( 'map-generator' ).style.display = 'none';
	document.getElementById( 'hex-container' ).sectorDataContainer =
		dataContainer;
}

//Resets map
//Rewrite this
export function resetMap() {
	//fix CSS on generator section
	document.getElementById( 'map-generator' ).style.display = 'inline-flex';
	document.getElementById( 'run-button' ).style.display = 'none';
	document.getElementById( 'reset-button' ).style.display = 'none';

	if ( document.getElementById( 'system-information-content' ) !== null ) {
		let systemContent = document.getElementById(
			'system-information-content'
		);
		let oldSystem = systemContent.firstElementChild;
		let allContent = document.getElementById( 'all-systems-content' );
		let oldAll = allContent.firstElementChild;

		if ( oldSystem !== null ) systemContent.removeChild( oldSystem );
		if ( oldAll !== null ) allContent.removeChild( oldAll );
	}

	if ( document.querySelectorAll( '#hex-container' ).length > 0 ) {
		let mapContainer = document.getElementById( 'svg-container' );
		let map = document.getElementById( 'hex-container' );
		mapContainer.removeChild( map );
	}

	document.getElementById( 'tab-display' ).style.display = 'none';

	let tabLinks = document.getElementsByClassName( 'tab-links' );
	for ( let t = 0; t < tabLinks.length; t++ ) {
		tabLinks[ t ].style.display = 'none';
	}
}

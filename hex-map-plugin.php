<?php
/**
 * Plugin Name:       Hex Map Plugin
 * Description:       Creates a hex map and simulates a star sector
 * Version:           0.1.1
 * Requires at least: 6.1
 * Requires PHP:      7.0

 * Author:            Daniel Cesarani
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://github.com/OnLondonStone/hex-map-plugin
 * Text Domain:       hex-map-plugin
 * @package CreateBlock
 */

 if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_hex_map_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_hex_map_block_block_init' );



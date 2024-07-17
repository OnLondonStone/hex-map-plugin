<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php
/** 
* @see ./modules/getmap.php
*/
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Hex Map Block – hello from a dynamic block!', 'hex-map-block' ); ?>
	<p <?php echo get_block_wrapper_attributes(); ?>>© <?php echo date( "Y" ); ?></p>
</p>
<div class="container" id="map-main-container">
<?php echo get_map_content(); ?>>
</div>
<?php echo get_map_script(); ?>
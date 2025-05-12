<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package raijin
 * @since 1.0.0
 */

/**
 * The theme version.
 *
 * @since 1.0.0
 */
define( 'RAIJIN_VERSION', wp_get_theme()->get( 'Version' ) );

/**
 * Add theme support for block styles and editor style.
 *
 * @since 1.0.0
 *
 * @return void
 */
function raijin_setup() {
	add_editor_style( './assets/css/style-shared.min.css' );

	/*
	 * Load additional block styles.
	 * See details on how to add more styles in the readme.txt.
	 */
	$styled_blocks = [ 'button', 'quote', 'navigation', 'search' ];
	foreach ( $styled_blocks as $block_name ) {
		$args = array(
			'handle' => "raijin-$block_name",
			'src'    => get_theme_file_uri( "assets/css/blocks/$block_name.min.css" ),
			'path'   => get_theme_file_path( "assets/css/blocks/$block_name.min.css" ),
		);
		// Replace the "core" prefix if you are styling blocks from plugins.
		wp_enqueue_block_style( "core/$block_name", $args );
	}

}
add_action( 'after_setup_theme', 'raijin_setup' );

/**
 * Enqueue the CSS files.
 *
 * @since 1.0.0
 *
 * @return void
 */
function raijin_styles() {
	wp_enqueue_style(
		'raijin-style',
		get_stylesheet_uri(),
		[],
		RAIJIN_VERSION
	);
	wp_enqueue_style(
		'raijin-shared-styles',
		get_theme_file_uri( 'assets/css/style-shared.min.css' ),
		[],
		RAIJIN_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'raijin_styles' );

// Filters.
require_once get_theme_file_path( 'inc/filters.php' );

// Block variation example.
require_once get_theme_file_path( 'inc/register-block-variations.php' );

// Block style examples.
require_once get_theme_file_path( 'inc/register-block-styles.php' );

// Block pattern and block category examples.
require_once get_theme_file_path( 'inc/register-block-patterns.php' );

/**
 * Enqueue custom blocks assets.
 *
 * @since 1.0.0
 *
 * @return void
 */
function raijin_enqueue_custom_blocks() {
	wp_enqueue_script(
		'raijin-blocks',
		get_theme_file_uri( 'dist/blocks.js' ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		RAIJIN_VERSION,
		true
	);

	wp_enqueue_style(
		'raijin-blocks-style',
		get_theme_file_uri( 'dist/blocks.css' ),
		array(),
		RAIJIN_VERSION
	);
}
add_action( 'enqueue_block_editor_assets', 'raijin_enqueue_custom_blocks' );

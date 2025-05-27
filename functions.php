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

// Custom Post Types
require_once get_theme_file_path( 'inc/cpt/servicios.php' );

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

/**
 * Encolar estilos de bloques en el frontend.
 *
 * @since 1.0.0
 *
 * @return void
 */
function raijin_enqueue_block_styles() {
	// Encolar el estilo principal de bloques
	wp_enqueue_style(
		'raijin-blocks-style',
		get_theme_file_uri( 'dist/blocks.css' ),
		array(),
		RAIJIN_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'raijin_enqueue_block_styles' );

/**
 * Encolar estilos de bloques en el editor.
 *
 * @since 1.0.0
 *
 * @return void
 */
function raijin_enqueue_editor_styles() {
	// Encolar el estilo principal de bloques en el editor
	wp_enqueue_style(
		'raijin-blocks-editor-style',
		get_theme_file_uri( 'dist/blocks.css' ),
		array(),
		RAIJIN_VERSION
	);
}
add_action( 'enqueue_block_editor_assets', 'raijin_enqueue_editor_styles' );
// 1. Permitir la subida de SVG
function permitir_svg_upload($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'permitir_svg_upload');

// 2. Mostrar SVG correctamente en la biblioteca de medios
function mostrar_svg_en_medios() {
    echo '<style>
        .attachment-266x266, .thumbnail img {
            width: 100% !important;
            height: auto !important;
        }
    </style>';
}
add_action('admin_head', 'mostrar_svg_en_medios');

// 3. Validar seguridad del SVG al subir (Evita scripts maliciosos)
function verificar_seguridad_svg($file) {
    if ($file['type'] === 'image/svg+xml') {
        $contenido = file_get_contents($file['tmp_name']);
        if (preg_match('/<script.*?>.*?<\/script>/is', $contenido)) {
            $file['error'] = 'Por razones de seguridad, los SVG no deben contener scripts.';
        }
    }
    return $file;
}
add_filter('wp_handle_upload_prefilter', 'verificar_seguridad_svg');

// 4. Renderizar SVG en el editor de Gutenberg (Soporte en el Backend)
function habilitar_svg_en_gutenberg() {
    echo '<style>
        .editor-post-featured-image img, 
        .editor-post-featured-image .components-responsive-wrapper__content, 
        .wp-block-image img {
            width: 100% !important;
            height: auto !important;
        }
    </style>';
}
add_action('admin_head', 'habilitar_svg_en_gutenberg');

// 5. Permitir que WordPress muestre SVG inline (para mejor escalabilidad y manipulación)
function mostrar_svg_inline($content) {
    // Buscar imágenes SVG en el contenido
    $pattern = '/<img.*?src=["\']([^"\']+.svg)["\'].*?>/i';

    return preg_replace_callback($pattern, function ($matches) {
        $file = ABSPATH . str_replace(site_url('/'), '', $matches[1]);
        if (file_exists($file)) {
            return file_get_contents($file); // Reemplaza la etiqueta <img> por el SVG en línea
        }
        return $matches[0]; // Si no se encuentra el archivo, deja la imagen como está
    }, $content);
}
add_filter('the_content', 'mostrar_svg_inline');


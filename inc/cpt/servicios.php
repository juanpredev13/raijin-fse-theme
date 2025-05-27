<?php
/**
 * Custom Post Type: Servicios
 *
 * @package Raijin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Registrar Custom Post Type de Servicios
 */
function raijin_register_servicios_post_type() {
    $labels = array(
        'name'               => _x('Servicios', 'post type general name', 'raijin'),
        'singular_name'      => _x('Servicio', 'post type singular name', 'raijin'),
        'menu_name'          => _x('Servicios', 'admin menu', 'raijin'),
        'add_new'            => _x('Agregar Nuevo', 'servicio', 'raijin'),
        'add_new_item'       => __('Agregar Nuevo Servicio', 'raijin'),
        'edit_item'          => __('Editar Servicio', 'raijin'),
        'new_item'           => __('Nuevo Servicio', 'raijin'),
        'view_item'          => __('Ver Servicio', 'raijin'),
        'search_items'       => __('Buscar Servicios', 'raijin'),
        'not_found'          => __('No se encontraron servicios', 'raijin'),
        'not_found_in_trash' => __('No se encontraron servicios en la papelera', 'raijin'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'servicios'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array('title', 'editor', 'thumbnail'),
        'menu_icon'          => 'dashicons-clipboard',
    );

    register_post_type('servicios', $args);
}
add_action('init', 'raijin_register_servicios_post_type');

/**
 * Registrar taxonomía de Categorías de Servicios
 */
function raijin_register_servicios_taxonomies() {
    // Taxonomía para Categorías
    $labels = array(
        'name'              => _x('Categorías de Servicios', 'taxonomy general name', 'raijin'),
        'singular_name'     => _x('Categoría de Servicio', 'taxonomy singular name', 'raijin'),
        'search_items'      => __('Buscar Categorías', 'raijin'),
        'all_items'         => __('Todas las Categorías', 'raijin'),
        'parent_item'       => __('Categoría Padre', 'raijin'),
        'parent_item_colon' => __('Categoría Padre:', 'raijin'),
        'edit_item'         => __('Editar Categoría', 'raijin'),
        'update_item'       => __('Actualizar Categoría', 'raijin'),
        'add_new_item'      => __('Agregar Nueva Categoría', 'raijin'),
        'new_item_name'     => __('Nueva Categoría', 'raijin'),
        'menu_name'         => __('Categorías', 'raijin'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'categoria-servicio'),
    );

    register_taxonomy('categoria_servicio', array('servicios'), $args);
}
add_action('init', 'raijin_register_servicios_taxonomies');

/**
 * Agregar campos personalizados para Servicios
 */
function raijin_add_servicios_meta_boxes() {
    add_meta_box(
        'servicios_paquetes',
        __('Paquetes del Servicio', 'raijin'),
        'raijin_servicios_paquetes_callback',
        'servicios',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'raijin_add_servicios_meta_boxes');

/**
 * Callback para mostrar los campos de paquetes
 */
function raijin_servicios_paquetes_callback($post) {
    wp_nonce_field('raijin_save_servicios_meta', 'raijin_servicios_meta_nonce');

    $paquetes = get_post_meta($post->ID, '_servicios_paquetes', true);
    if (!is_array($paquetes)) {
        $paquetes = array();
    }
    ?>
    <div id="paquetes-container">
        <?php foreach ($paquetes as $index => $paquete) : ?>
            <div class="paquete-item">
                <h4>Paquete <?php echo $index + 1; ?></h4>
                <p>
                    <label for="paquete_nombre_<?php echo $index; ?>"><?php _e('Nombre del Paquete:', 'raijin'); ?></label>
                    <input type="text" id="paquete_nombre_<?php echo $index; ?>" 
                           name="paquetes[<?php echo $index; ?>][nombre]" 
                           value="<?php echo esc_attr($paquete['nombre']); ?>" class="widefat">
                </p>
                <p>
                    <label for="paquete_precio_<?php echo $index; ?>"><?php _e('Precio:', 'raijin'); ?></label>
                    <input type="number" id="paquete_precio_<?php echo $index; ?>" 
                           name="paquetes[<?php echo $index; ?>][precio]" 
                           value="<?php echo esc_attr($paquete['precio']); ?>" class="widefat">
                </p>
                <p>
                    <label for="paquete_descripcion_<?php echo $index; ?>"><?php _e('Descripción:', 'raijin'); ?></label>
                    <textarea id="paquete_descripcion_<?php echo $index; ?>" 
                              name="paquetes[<?php echo $index; ?>][descripcion]" 
                              class="widefat" rows="3"><?php echo esc_textarea($paquete['descripcion']); ?></textarea>
                </p>
                <button type="button" class="button remove-paquete"><?php _e('Eliminar Paquete', 'raijin'); ?></button>
            </div>
        <?php endforeach; ?>
    </div>
    <button type="button" class="button button-primary" id="add-paquete"><?php _e('Agregar Paquete', 'raijin'); ?></button>

    <script>
    jQuery(document).ready(function($) {
        $('#add-paquete').on('click', function() {
            var index = $('.paquete-item').length;
            var template = `
                <div class="paquete-item">
                    <h4>Paquete ${index + 1}</h4>
                    <p>
                        <label for="paquete_nombre_${index}"><?php _e('Nombre del Paquete:', 'raijin'); ?></label>
                        <input type="text" id="paquete_nombre_${index}" 
                               name="paquetes[${index}][nombre]" class="widefat">
                    </p>
                    <p>
                        <label for="paquete_precio_${index}"><?php _e('Precio:', 'raijin'); ?></label>
                        <input type="number" id="paquete_precio_${index}" 
                               name="paquetes[${index}][precio]" class="widefat">
                    </p>
                    <p>
                        <label for="paquete_descripcion_${index}"><?php _e('Descripción:', 'raijin'); ?></label>
                        <textarea id="paquete_descripcion_${index}" 
                                  name="paquetes[${index}][descripcion]" 
                                  class="widefat" rows="3"></textarea>
                    </p>
                    <button type="button" class="button remove-paquete"><?php _e('Eliminar Paquete', 'raijin'); ?></button>
                </div>
            `;
            $('#paquetes-container').append(template);
        });

        $(document).on('click', '.remove-paquete', function() {
            $(this).closest('.paquete-item').remove();
            // Renumerar los paquetes restantes
            $('.paquete-item').each(function(index) {
                $(this).find('h4').text('Paquete ' + (index + 1));
                $(this).find('input, textarea').each(function() {
                    var name = $(this).attr('name');
                    if (name) {
                        $(this).attr('name', name.replace(/\[\d+\]/, '[' + index + ']'));
                        $(this).attr('id', $(this).attr('id').replace(/\d+/, index));
                    }
                });
            });
        });
    });
    </script>
    <?php
}

/**
 * Guardar los campos personalizados
 */
function raijin_save_servicios_meta($post_id) {
    if (!isset($_POST['raijin_servicios_meta_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['raijin_servicios_meta_nonce'], 'raijin_save_servicios_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['paquetes'])) {
        $paquetes = array();
        foreach ($_POST['paquetes'] as $paquete) {
            if (!empty($paquete['nombre'])) {
                $paquetes[] = array(
                    'nombre' => sanitize_text_field($paquete['nombre']),
                    'precio' => floatval($paquete['precio']),
                    'descripcion' => sanitize_textarea_field($paquete['descripcion'])
                );
            }
        }
        update_post_meta($post_id, '_servicios_paquetes', $paquetes);
    }
}
add_action('save_post_servicios', 'raijin_save_servicios_meta'); 
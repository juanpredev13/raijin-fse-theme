<?php
function crear_cpt_instructores() {
    register_post_type('instructor', [
        'labels' => [
            'name' => 'Instructores',
            'singular_name' => 'Instructor'
        ],
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'supports' => ['title', 'custom-fields'],
        'menu_icon' => 'dashicons-welcome-learn-more',
    ]);
}
add_action('init', 'crear_cpt_instructores');

// Mostrar metabox con los datos del pre-registro en el admin SOLO LECTURA
function instructor_metabox_info() {
    add_meta_box(
        'instructor_info',
        'Datos del Pre-registro',
        'mostrar_info_instructor_callback',
        'instructor',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'instructor_metabox_info');

function mostrar_info_instructor_callback($post) {
    $campos = [
        'email' => 'Email',
        'telefono' => 'Teléfono',
        'linkedin' => 'LinkedIn',
        'cv_url' => 'CV (PDF)',
        'disponibilidad' => 'Disponibilidad',
        'salario' => 'Pretensión Salarial',
        'area' => 'Área de Enseñanza',
        'experiencia' => 'Experiencia',
    ];
    echo '<table class="form-table">';
    foreach ($campos as $meta => $label) {
        $valor = get_post_meta($post->ID, $meta, true);
        if ($meta === 'cv_url' && $valor) {
            $valor = '<a href="' . esc_url($valor) . '" target="_blank">Ver CV</a>';
        }
        if ($meta === 'experiencia') {
            $valor = nl2br(esc_html($valor));
        }
        echo '<tr><th>' . esc_html($label) . '</th><td>' . $valor . '</td></tr>';
    }
    echo '</table>';
}

// Registrar estados personalizados para el CPT instructor
add_action('init', function() {
    $estados = [
        'pendiente' => 'Pendiente',
        'revisado' => 'Revisado',
        'aprobado' => 'Aprobado',
        'rechazado' => 'Rechazado',
        'contratado' => 'Contratado',
        'certificado' => 'Certificado',
    ];
    foreach ($estados as $slug => $label) {
        register_post_status($slug, array(
            'label'                     => _x($label, 'post'),
            'public'                    => true,
            'exclude_from_search'       => false,
            'show_in_admin_all_list'    => true,
            'show_in_admin_status_list' => true,
            'label_count'               => _n_noop($label.' <span class="count">(%s)</span>', $label.'s <span class="count">(%s)</span>'),
        ));
    }
});

// Añadir los estados personalizados al selector del editor SOLO para el CPT instructor
add_filter('display_post_states', function($states, $post) {
    if ($post->post_type === 'instructor') {
        $custom = [
            'pendiente' => 'Pendiente',
            'revisado' => 'Revisado',
            'aprobado' => 'Aprobado',
            'rechazado' => 'Rechazado',
            'contratado' => 'Contratado',
            'certificado' => 'Certificado',
        ];
        foreach ($custom as $slug => $label) {
            if ($post->post_status === $slug) {
                $states[] = __($label);
            }
        }
    }
    return $states;
}, 10, 2);

add_action('post_submitbox_misc_actions', function() {
    global $post;
    if ($post->post_type === 'instructor') {
        $selected = $post->post_status;
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var select = document.getElementById('post_status');
            if (select) {
                select.innerHTML += '<option value="pendiente"'+('<?php echo $selected; ?>'=='pendiente'?' selected':'')+'>Pendiente</option>';
                select.innerHTML += '<option value="revisado"'+('<?php echo $selected; ?>'=='revisado'?' selected':'')+'>Revisado</option>';
                select.innerHTML += '<option value="aprobado"'+('<?php echo $selected; ?>'=='aprobado'?' selected':'')+'>Aprobado</option>';
                select.innerHTML += '<option value="rechazado"'+('<?php echo $selected; ?>'=='rechazado'?' selected':'')+'>Rechazado</option>';
                select.innerHTML += '<option value="contratado"'+('<?php echo $selected; ?>'=='contratado'?' selected':'')+'>Contratado</option>';
                select.innerHTML += '<option value="certificado"'+('<?php echo $selected; ?>'=='certificado'?' selected':'')+'>Certificado</option>';
            }
        });
        </script>
        <?php
    }
}); 
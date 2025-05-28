<?php
function formulario_pre_registro_instructor_shortcode() {
    $mensaje_error = '';
    if (isset($_POST['enviar_formulario'])) {
        $error = procesar_pre_registro_instructor();
        if ($error) {
            $mensaje_error = $error;
        }
    }
    ob_start();
    ?>
    <div class="form-container">
        <div class="form-header">
            <h1>Pre-registro de Instructor</h1>
            <p>Completa el formulario para unirte a nuestro equipo de instructores</p>
        </div>

        <div class="form-note">
            <p><strong>Nota:</strong> Todos los campos marcados con <span class="required">*</span> son obligatorios.</p>
        </div>

        <?php if ($mensaje_error): ?>
            <div style="background:#ffeaea;color:#d82128;padding:1rem;border-radius:8px;margin-bottom:1.5rem;border-left:4px solid #d82128;font-weight:500;">
                <?php echo esc_html($mensaje_error); ?>
            </div>
        <?php endif; ?>

        <form id="pre-registro-instructor" method="POST" enctype="multipart/form-data">
            <div class="form-section">
                <div class="section-title">Información Personal</div>
                <div class="form-row">
                    <div>
                        <label>Nombre <span class="required">*</span>:</label>
                        <input type="text" name="nombre" required placeholder="Tu nombre" value="<?php echo isset($_POST['nombre']) ? esc_attr($_POST['nombre']) : ''; ?>">
                    </div>
                    <div>
                        <label>Apellido <span class="required">*</span>:</label>
                        <input type="text" name="apellido" required placeholder="Tu apellido" value="<?php echo isset($_POST['apellido']) ? esc_attr($_POST['apellido']) : ''; ?>">
                    </div>
                </div>
            </div>

            <div class="form-section">
                <div class="section-title">Información de Contacto</div>
                <label>Email <span class="required">*</span>:</label>
                <input type="email" name="email" required placeholder="tu@email.com" value="<?php echo isset($_POST['email']) ? esc_attr($_POST['email']) : ''; ?>">
                <label>Teléfono (+código) <span class="required">*</span>:</label>
                <input type="tel" name="telefono" required pattern="^\+?\d{8,15}$" placeholder="+1234567890" value="<?php echo isset($_POST['telefono']) ? esc_attr($_POST['telefono']) : ''; ?>">
                <label>Perfil de LinkedIn <span class="required">*</span>:</label>
                <input type="url" name="linkedin" required placeholder="https://linkedin.com/in/tu-perfil" value="<?php echo isset($_POST['linkedin']) ? esc_attr($_POST['linkedin']) : ''; ?>">
            </div>

            <div class="form-section">
                <div class="section-title">Documentación</div>
                <label>CV (PDF) <span class="required">*</span>:</label>
                <input type="file" name="cv" accept="application/pdf" required>
            </div>

            <div class="form-section">
                <div class="section-title">Información Profesional</div>
                <div class="form-row">
                    <div>
                        <label>Disponibilidad <span class="required">*</span>:</label>
                        <input type="text" name="disponibilidad" placeholder="Ej: Cualquier día" required value="<?php echo isset($_POST['disponibilidad']) ? esc_attr($_POST['disponibilidad']) : ''; ?>">
                    </div>
                    <div>
                        <label>Pretensión Salarial ($/hora) <span class="required">*</span>:</label>
                        <input type="number" name="salario" min="1" step="0.01" required placeholder="0.00" value="<?php echo isset($_POST['salario']) ? esc_attr($_POST['salario']) : ''; ?>">
                    </div>
                </div>
                <label>Área de Enseñanza <span class="required">*</span>:</label>
                <select name="area" required>
                    <option value="">Selecciona un área</option>
                    <option value="Diseño" <?php selected(isset($_POST['area']) && $_POST['area'] == 'Diseño'); ?>>Diseño</option>
                    <option value="Programación" <?php selected(isset($_POST['area']) && $_POST['area'] == 'Programación'); ?>>Programación</option>
                    <option value="Marketing" <?php selected(isset($_POST['area']) && $_POST['area'] == 'Marketing'); ?>>Marketing</option>
                    <option value="Idiomas" <?php selected(isset($_POST['area']) && $_POST['area'] == 'Idiomas'); ?>>Idiomas</option>
                </select>
                <label style="margin-top:1.5rem;">Cuéntanos sobre tu experiencia <span class="required">*</span>:</label>
                <textarea name="experiencia" required rows="5" placeholder="Describe brevemente tu experiencia profesional" style="width:100%;padding:0.75rem 1rem;border:2px solid var(--antiflash-white);border-radius:8px;font-size:1rem;resize:vertical;margin-top:0.5rem;"><?php echo isset($_POST['experiencia']) ? esc_textarea($_POST['experiencia']) : ''; ?></textarea>
            </div>

            <!-- reCAPTCHA v3 (comentado para pruebas) -->
            <!-- <input type="hidden" name="recaptcha_response" id="recaptchaResponse"> -->
            <!-- <script> ... </script> -->

            <input type="submit" name="enviar_formulario" value="Enviar Solicitud">
        </form>
    </div>
    <style>
    :root {
        --polynesian-blue: #0e4e8a;
        --satin-gold: #b9963f;
        --fire-red: #d82128;
        --antiflash-white: #e8e7ec;
        --raisin-black: #252428;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; background: linear-gradient(135deg, var(--antiflash-white) 0%, #f8f9fa 100%); min-height: 100vh; padding: 2rem 1rem; line-height: 1.6; }
    .form-container { max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 20px 40px rgba(14, 78, 138, 0.1); overflow: hidden; animation: fadeInUp 0.6s ease-out; }
    .form-header { background: linear-gradient(135deg, var(--polynesian-blue) 0%, #1a5ba3 100%); color: white; padding: 2rem; text-align: center; }
    .form-header h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 0.5rem; }
    .form-header p { color: var(--antiflash-white); font-size: 0.95rem; }
    #pre-registro-instructor { padding: 2rem; }
    .form-section { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--antiflash-white); }
    .form-section:last-child { border-bottom: none; margin-bottom: 0; }
    .section-title { color: var(--polynesian-blue); font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .section-title::before { content: "●"; color: var(--satin-gold); font-size: 1.2rem; }
    label { display: block; color: var(--raisin-black); font-weight: 500; margin-bottom: 0.5rem; margin-top: 1rem; }
    label:first-of-type { margin-top: 0; }
    input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], select { width: 100%; padding: 0.75rem 1rem; border: 2px solid var(--antiflash-white); border-radius: 8px; font-size: 1rem; transition: all 0.3s ease; background: white; color: var(--raisin-black); }
    input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus, input[type="url"]:focus, input[type="number"]:focus, select:focus { outline: none; border-color: var(--polynesian-blue); box-shadow: 0 0 0 3px rgba(14, 78, 138, 0.1); transform: translateY(-1px); }
    input[type="file"] { width: 100%; padding: 0.75rem; border: 2px dashed var(--antiflash-white); border-radius: 8px; background: #fafbfc; cursor: pointer; transition: all 0.3s ease; }
    input[type="file"]:hover { border-color: var(--polynesian-blue); background: #f0f4f8; }
    input[type="file"]:focus { outline: none; border-color: var(--polynesian-blue); box-shadow: 0 0 0 3px rgba(14, 78, 138, 0.1); }
    select { cursor: pointer; background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e"); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem; appearance: none; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
    @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }
    input[type="submit"] { width: 100%; background: linear-gradient(135deg, var(--polynesian-blue) 0%, #1a5ba3 100%); color: white; border: none; padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; margin-top: 1.5rem; text-transform: uppercase; letter-spacing: 0.5px; }
    input[type="submit"]:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(14, 78, 138, 0.3); background: linear-gradient(135deg, #1a5ba3 0%, var(--polynesian-blue) 100%); }
    input[type="submit"]:active { transform: translateY(0); }
    .required { color: var(--fire-red); }
    .form-note { background: linear-gradient(135deg, var(--antiflash-white) 0%, #f0f1f3 100%); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid var(--satin-gold); }
    .form-note p { color: var(--raisin-black); font-size: 0.9rem; margin: 0; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    input:invalid:not(:focus):not(:placeholder-shown) { border-color: var(--fire-red); }
    input:valid:not(:focus):not(:placeholder-shown) { border-color: #10b981; }
    input:focus-visible, select:focus-visible { outline: 2px solid var(--polynesian-blue); outline-offset: 2px; }
    .misc-pub-curtime {
        display: none !important;
    }
    </style>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('pre-registro-instructor');
        const fileInput = document.querySelector('input[type="file"]');
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                let fileDisplay = document.querySelector('.file-display');
                if (!fileDisplay) {
                    fileDisplay = document.createElement('div');
                    fileDisplay.className = 'file-display';
                    fileDisplay.style.cssText = `margin-top: 0.5rem; padding: 0.5rem; background: #f0f4f8; border-radius: 4px; font-size: 0.9rem; color: var(--polynesian-blue);`;
                    fileInput.parentNode.appendChild(fileDisplay);
                }
                fileDisplay.textContent = `Archivo seleccionado: ${fileName}`;
            }
        });
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = 'var(--fire-red)';
                } else {
                    this.style.borderColor = '#10b981';
                }
            });
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = 'var(--polynesian-blue)';
                }
            });
        });
        const submitBtn = document.querySelector('input[type="submit"]');
        submitBtn.addEventListener('click', function(e) {
            const isValid = form.checkValidity();
            if (isValid) {
                this.value = 'Enviando...';
                this.style.background = 'var(--satin-gold)';
            }
        });
    });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('formulario_instructor', 'formulario_pre_registro_instructor_shortcode');

function procesar_pre_registro_instructor() {
    if (isset($_POST['enviar_formulario'])) {
        // Verificar reCAPTCHA (comentado para pruebas)
        // $recaptcha_secret = "6LcCyEsrAAAAANfhTm89RXm1VpTTTmUn9ZvoX5Iq";
        // $recaptcha_response = $_POST['recaptcha_response'];
        // if (empty($recaptcha_response)) {
        //     wp_die('Error: No se recibió respuesta del reCAPTCHA');
        // }
        // $verify = wp_remote_post('https://www.google.com/recaptcha/api/siteverify', array(
        //     'body' => array(
        //         'secret' => $recaptcha_secret,
        //         'response' => $recaptcha_response,
        //         'remoteip' => $_SERVER['REMOTE_ADDR']
        //     )
        // ));
        // if (is_wp_error($verify)) {
        //     wp_die('Error al verificar reCAPTCHA: ' . $verify->get_error_message());
        // }
        // $verify_data = json_decode(wp_remote_retrieve_body($verify));
        // if (!$verify_data->success) {
        //     $error_codes = isset($verify_data->{'error-codes'}) ? implode(', ', $verify_data->{'error-codes'}) : 'Error desconocido';
        //     wp_die('Error de verificación reCAPTCHA: ' . $error_codes);
        // }
        // if ($verify_data->score < 0.5) {
        //     wp_die('Puntuación de reCAPTCHA demasiado baja. Por favor, intenta nuevamente.');
        // }

        // Validaciones
        $nombre = sanitize_text_field($_POST['nombre']);
        $apellido = sanitize_text_field($_POST['apellido']);
        $email = sanitize_email($_POST['email']);

        if (email_exists($email)) {
            return 'Este correo ya está registrado.';
        }

        require_once(ABSPATH . 'wp-admin/includes/file.php');
        $cv = $_FILES['cv'];
        $upload_overrides = ['test_form' => false];
        $file = wp_handle_upload($cv, $upload_overrides);

        if (!$file || isset($file['error'])) {
            return 'Error al subir el archivo PDF.';
        }

        // Crear usuario
        $user_id = wp_create_user($email, wp_generate_password(), $email);
        wp_update_user(['ID' => $user_id, 'display_name' => "$nombre $apellido"]);

        // Crear post de tipo instructor
        $post_id = wp_insert_post([
            'post_type' => 'instructor',
            'post_title' => "$nombre $apellido",
            'post_status' => 'pending',
        ]);

        // Guardar metadatos
        update_post_meta($post_id, 'email', $email);
        update_post_meta($post_id, 'telefono', sanitize_text_field($_POST['telefono']));
        update_post_meta($post_id, 'linkedin', esc_url_raw($_POST['linkedin']));
        update_post_meta($post_id, 'cv_url', esc_url_raw($file['url']));
        update_post_meta($post_id, 'disponibilidad', sanitize_text_field($_POST['disponibilidad']));
        update_post_meta($post_id, 'salario', floatval($_POST['salario']));
        update_post_meta($post_id, 'area', sanitize_text_field($_POST['area']));
        update_post_meta($post_id, 'experiencia', sanitize_textarea_field($_POST['experiencia']));

        // Notificación al admin
        wp_mail(get_option('admin_email'), 'Nuevo Pre-registro de Instructor', "Se ha registrado: $nombre $apellido");

        // Redirección a página de gracias
        wp_redirect(home_url('/gracias'));
        exit;
    }
    return false;
}
add_action('init', 'procesar_pre_registro_instructor');

// Endpoint REST API para automatizar pruebas del pre-registro de instructores
add_action('rest_api_init', function() {
    register_rest_route('raijin/v1', '/pre-registro-instructor', array(
        'methods' => 'POST',
        'callback' => 'api_pre_registro_instructor',
        'permission_callback' => '__return_true', // Sin autenticación para pruebas
    ));
});

function api_pre_registro_instructor($request) {
    $params = $request->get_json_params();
    $required = ['nombre','apellido','email','telefono','linkedin','cv_url','disponibilidad','salario','area'];
    foreach ($required as $field) {
        if (empty($params[$field])) {
            return new WP_REST_Response(['success' => false, 'error' => "Falta el campo: $field"], 400);
        }
    }
    $nombre = sanitize_text_field($params['nombre']);
    $apellido = sanitize_text_field($params['apellido']);
    $email = sanitize_email($params['email']);
    if (email_exists($email)) {
        return new WP_REST_Response(['success' => false, 'error' => 'Este correo ya está registrado.'], 400);
    }
    // Crear usuario
    $user_id = wp_create_user($email, wp_generate_password(), $email);
    wp_update_user(['ID' => $user_id, 'display_name' => "$nombre $apellido"]);
    // Crear post de tipo instructor
    $post_id = wp_insert_post([
        'post_type' => 'instructor',
        'post_title' => "$nombre $apellido",
        'post_status' => 'pending',
    ]);
    // Guardar metadatos
    update_post_meta($post_id, 'email', $email);
    update_post_meta($post_id, 'telefono', sanitize_text_field($params['telefono']));
    update_post_meta($post_id, 'linkedin', esc_url_raw($params['linkedin']));
    update_post_meta($post_id, 'cv_url', esc_url_raw($params['cv_url']));
    update_post_meta($post_id, 'disponibilidad', sanitize_text_field($params['disponibilidad']));
    update_post_meta($post_id, 'salario', floatval($params['salario']));
    update_post_meta($post_id, 'area', sanitize_text_field($params['area']));
    update_post_meta($post_id, 'experiencia', sanitize_textarea_field($params['experiencia']));
    // Notificación al admin (opcional, puedes comentar si no la quieres en pruebas)
    // wp_mail(get_option('admin_email'), 'Nuevo Pre-registro de Instructor (API)', "Se ha registrado: $nombre $apellido");
    return new WP_REST_Response(['success' => true, 'post_id' => $post_id, 'user_id' => $user_id], 200);
}

// Ocultar el campo de título y el editor de contenido para el CPT instructor
add_action('admin_head', function() {
    $screen = get_current_screen();
    if ($screen->post_type === 'instructor') {
        echo '<style>
            #titlediv, #postdivrich, #postdiv, .editor-post-title, .block-editor-writing-flow, .edit-post-visual-editor__content-area {
                display: none !important;
            }
        </style>';
    }
});

// Quitar el editor de contenido de instructor
add_action('init', function() {
    remove_post_type_support('instructor', 'editor');
});

// Ocultar el metabox de "Campos personalizados" para el CPT instructor
add_action('add_meta_boxes', function() {
    remove_meta_box('postcustom', 'instructor', 'normal');
});

// Ocultar botones y opciones de la caja "Publicar" para el CPT instructor
add_action('admin_head', function() {
    $screen = get_current_screen();
    if ($screen->post_type === 'instructor') {
        echo '<style>
            /* Ocultar elementos no deseados */
            #delete-action,
            #publish,
            .misc-pub-curtime,
            #preview-action,
            .misc-pub-visibility,
            #major-publishing-actions,
            #minor-publishing-actions,
            .misc-pub-section:not(.misc-pub-post-status) {
                display: none !important;
            }
            /* Ocultar el ::before del metabox de estado */
            .misc-pub-section.misc-pub-post-status::before {
                display: none !important;
                content: none !important;
            }
            /* Centrar el select y eliminar la línea divisoria */
            .misc-pub-section.misc-pub-post-status {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0;
            }
            .misc-pub-section.misc-pub-post-status select {
                width: 100% !important;
                margin: 0 !important;
                text-align: center;
            }
            /* Eliminar la línea divisoria */
            .estado-btn-container {
                margin-top: 16px;
                padding-top: 0;
                border-top: none !important;
                width: 100%;
                display: flex;
                justify-content: center;
            }
            /* Botón 100% ancho */
            #save-post {
                width: 100% !important;
                margin: 0 !important;
                background: #2271b1 !important;
                color: white !important;
                border: none !important;
                padding: 16px 0 !important;
                font-size: 18px !important;
                font-weight: 600 !important;
                border-radius: 6px !important;
                cursor: pointer !important;
                box-sizing: border-box;
            }
            #save-post:hover {
                background: #135e96 !important;
            }
        </style>';
    }
});

// Ocultar "Vista previa", "Atributos de la entrada" y "LiteSpeed Options" en el CPT instructor
add_action('admin_head', function() {
    $screen = get_current_screen();
    if ($screen->post_type === 'instructor') {
        echo '<style>
            #post-preview, /* Botón Vista previa */
            .editor-post-preview, /* Gutenberg Vista previa */
            .editor-post-publish-panel__header-publish, /* Gutenberg */
            #pageparentdiv, /* Metabox Atributos de la entrada */
            #litespeed_meta_boxes, /* LiteSpeed Options metabox */
            .litespeed-options, /* LiteSpeed Options si es clase */
            .misc-pub-section.misc-pub-post-status + .misc-pub-section, /* Siguiente sección después de estado */
            .components-panel__body[data-title="LiteSpeed Options"], /* Gutenberg LiteSpeed */
            .components-panel__body[data-title="Atributos de la entrada"] /* Gutenberg Atributos */
            {
                display: none !important;
            }
        </style>';
    }
});

// Quitar el metabox de atributos de entrada y LiteSpeed Options en el CPT instructor
add_action('add_meta_boxes', function() {
    remove_meta_box('pageparentdiv', 'instructor', 'side'); // Atributos de la entrada
    remove_meta_box('litespeed_meta_boxes', 'instructor', 'normal'); // LiteSpeed Options
});

// Permitir guardar estados personalizados en el selector de estado del CPT instructor
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

// Añadir los estados personalizados al selector de estado del editor rápido y del editor normal
add_filter('post_status_list', function($post_statuses, $post) {
    if ($post->post_type === 'instructor') {
        $post_statuses['pendiente'] = 'Pendiente';
        $post_statuses['revisado'] = 'Revisado';
        $post_statuses['aprobado'] = 'Aprobado';
        $post_statuses['rechazado'] = 'Rechazado';
        $post_statuses['contratado'] = 'Contratado';
        $post_statuses['certificado'] = 'Certificado';
    }
    return $post_statuses;
}, 10, 2);

add_filter('wp_insert_post_data', function($data, $postarr) {
    if ($data['post_type'] === 'instructor') {
        $estados_permitidos = ['pendiente', 'revisado', 'aprobado', 'rechazado', 'contratado', 'certificado'];
        if (!in_array($data['post_status'], $estados_permitidos)) {
            $data['post_status'] = 'pendiente';
        }
    }
    return $data;
}, 10, 2);

// Inyectar estados personalizados en el editor rápido (Quick Edit) para el CPT instructor
add_action('admin_footer-edit.php', function() {
    $screen = get_current_screen();
    if ($screen->post_type === 'instructor') {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var selects = document.querySelectorAll('select[name="_status"]');
            var estados = [
                {value: 'pendiente', label: 'Pendiente'},
                {value: 'revisado', label: 'Revisado'},
                {value: 'aprobado', label: 'Aprobado'},
                {value: 'rechazado', label: 'Rechazado'},
                {value: 'contratado', label: 'Contratado'},
                {value: 'certificado', label: 'Certificado'}
            ];
            selects.forEach(function(select) {
                estados.forEach(function(estado) {
                    if (!select.querySelector('option[value=\"' + estado.value + '\"]')) {
                        var opt = document.createElement('option');
                        opt.value = estado.value;
                        opt.textContent = estado.label;
                        select.appendChild(opt);
                    }
                });
            });
        });
        </script>
        <?php
    }
});

add_filter('gettext', function($translation, $text, $domain) {
    global $pagenow, $post;
    if (is_admin() && $pagenow === 'post.php' && isset($_GET['post'])) {
        $post_id = intval($_GET['post']);
        $post_type = get_post_type($post_id);
        if ($post_type === 'instructor') {
            if ($text === 'Actualizar' || $text === 'Update' || $text === 'Guardar' || $text === 'Save' || $text === 'Solo guardar') {
                return 'Actualizar estado';
            }
        }
    }
    return $translation;
}, 10, 3);

// Modificar la caja de publicación para el CPT instructor
add_action('admin_head', function() {
    $screen = get_current_screen();
    if ($screen->post_type === 'instructor') {
        echo '<style>
            /* Ocultar elementos no deseados */
            #delete-action,
            #publish,
            .misc-pub-curtime,
            #preview-action,
            .misc-pub-visibility,
            #major-publishing-actions,
            #minor-publishing-actions,
            .misc-pub-section:not(.misc-pub-post-status) {
                display: none !important;
            }
            
            /* Estilo para el botón de actualizar estado */
            #save-post {
                width: 100% !important;
                margin-top: 10px !important;
                background: #2271b1 !important;
                color: white !important;
                border: none !important;
                padding: 8px 16px !important;
                font-size: 14px !important;
                font-weight: 600 !important;
                border-radius: 3px !important;
                cursor: pointer !important;
            }
            #save-post:hover {
                background: #135e96 !important;
            }
        </style>';
    }
});

// Remover el metabox de visibilidad
add_action('add_meta_boxes', function() {
    remove_meta_box('submitdiv', 'instructor', 'side');
    remove_meta_box('pageparentdiv', 'instructor', 'side');
    remove_meta_box('litespeed_meta_boxes', 'instructor', 'normal');
}, 20);

// Agregar nuestro propio metabox de publicación
add_action('add_meta_boxes', function() {
    add_meta_box(
        'estado_instructor',
        'Estado',
        function($post) {
            echo '<div class="misc-pub-section misc-pub-post-status">
                <select name="post_status" id="post_status" style="width: 100%; margin-top: 0;">
                    <option value="pendiente" ' . selected($post->post_status, 'pendiente', false) . '>Pendiente</option>
                    <option value="revisado" ' . selected($post->post_status, 'revisado', false) . '>Revisado</option>
                    <option value="aprobado" ' . selected($post->post_status, 'aprobado', false) . '>Aprobado</option>
                    <option value="rechazado" ' . selected($post->post_status, 'rechazado', false) . '>Rechazado</option>
                    <option value="contratado" ' . selected($post->post_status, 'contratado', false) . '>Contratado</option>
                    <option value="certificado" ' . selected($post->post_status, 'certificado', false) . '>Certificado</option>
                </select>
            </div>
            <div class="estado-btn-container">
                <input type="submit" name="save" id="save-post" value="Actualizar estado" class="button button-primary button-large">
            </div>';
        },
        'instructor',
        'side',
        'high'
    );
}, 30); 
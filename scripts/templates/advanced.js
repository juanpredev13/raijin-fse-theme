module.exports = {
    index: (blockName) => `import './style.scss';
import './edit.scss';
import { registerBlockType } from '@wordpress/blocks';
import { edit } from './edit';
import { save } from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,
    edit,
    save,
});`,

    blockJson: (blockName, blockTitle) => `{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "raijin/${blockName}",
    "version": "1.0.0",
    "title": "${blockTitle}",
    "category": "design",
    "icon": "star-filled",
    "description": "Un bloque personalizado para ${blockTitle}",
    "supports": {
        "html": false,
        "align": true
    },
    "attributes": {
        "content": {
            "type": "string",
            "source": "html",
            "selector": "p"
        },
        "backgroundColor": {
            "type": "string",
            "default": "#ffffff"
        },
        "textColor": {
            "type": "string",
            "default": "#333333"
        },
        "alignment": {
            "type": "string",
            "default": "left"
        }
    },
    "textdomain": "test",
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "viewScript": "file:./view.js"
}`,

    edit: (blockName, blockTitle) => `import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps({
        className: 'wp-block-raijin-${blockName} editor-styles-wrapper',
        style: {
            backgroundColor: attributes.backgroundColor,
            color: attributes.textColor,
            textAlign: attributes.alignment
        }
    });
    const { content, backgroundColor, textColor, alignment } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración del Block', 'raijin')}>
                    <ColorPicker
                        color={backgroundColor}
                        onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
                        label={__('Color de fondo', 'raijin')}
                    />
                    <ColorPicker
                        color={textColor}
                        onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
                        label={__('Color del texto', 'raijin')}
                    />
                    <SelectControl
                        label={__('Alineación', 'raijin')}
                        value={alignment}
                        options={[
                            { label: __('Izquierda', 'raijin'), value: 'left' },
                            { label: __('Centro', 'raijin'), value: 'center' },
                            { label: __('Derecha', 'raijin'), value: 'right' }
                        ]}
                        onChange={(alignment) => setAttributes({ alignment })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <RichText
                    tagName="p"
                    value={content}
                    onChange={(content) => setAttributes({ content })}
                    placeholder={__('Escribe tu contenido aquí...', 'raijin')}
                />
            </div>
        </>
    );
};`,

    save: (blockName, blockTitle) => `import { useBlockProps, RichText } from '@wordpress/block-editor';

export const save = ({ attributes }) => {
    const blockProps = useBlockProps.save({
        className: 'wp-block-raijin-${blockName}',
        style: {
            backgroundColor: attributes.backgroundColor,
            color: attributes.textColor,
            textAlign: attributes.alignment
        }
    });
    const { content } = attributes;

    return (
        <div {...blockProps}>
            <RichText.Content tagName="p" value={content} />
        </div>
    );
};`,

    view: (blockName) => `// Script para la vista del bloque
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.wp-block-raijin-${blockName}');
    
    blocks.forEach(block => {
        // Aquí puedes agregar cualquier funcionalidad JavaScript
        // que necesites para la vista del bloque
        console.log('Block ${blockName} inicializado');

        // Ejemplo: Agregar animación al hacer hover
        block.addEventListener('mouseenter', () => {
            block.style.transform = 'translateY(-2px)';
            block.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });

        block.addEventListener('mouseleave', () => {
            block.style.transform = 'translateY(0)';
            block.style.boxShadow = 'none';
        });
    });
});`,

    style: (blockName) => `.wp-block-raijin-${blockName} {
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 4px;
    margin: 1rem 0;
    transition: all 0.3s ease;
    
    p {
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #333;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        padding: 1.5rem;
        
        p {
            font-size: 1rem;
        }
    }
}`,

    editStyle: (blockName) => `.editor-styles-wrapper .wp-block-raijin-${blockName} {
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 4px;
    margin: 1rem 0;
    
    .block-editor-rich-text__editable {
        min-height: 100px;
        padding: 1rem;
        border: 1px dashed #ccc;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:focus {
            border-color: #007cba;
            box-shadow: 0 0 0 1px #007cba;
        }
    }

    .block-editor-rich-text__editable[data-is-placeholder-visible="true"] {
        color: #757575;
    }
}`
}; 
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

    blockJson: (blockName) => `{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "raijin/${blockName}",
    "version": "1.0.0",
    "title": "${blockName}",
    "category": "design",
    "icon": "star-filled",
    "description": "Un bloque personalizado",
    "supports": {
        "html": false,
        "align": true
    },
    "attributes": {
        "content": {
            "type": "string",
            "source": "html",
            "selector": "p"
        }
    },
    "textdomain": "test",
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style.css",
    "viewScript": "file:./view.js"
}`,

    edit: (blockName, blockTitle) => `import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps({
        className: 'wp-block-raijin-${blockName} editor-styles-wrapper'
    });
    const { content } = attributes;

    return (
        <div {...blockProps}>
            <RichText
                tagName="p"
                value={content}
                onChange={(content) => setAttributes({ content })}
                placeholder={__('Escribe tu contenido aquí...', 'raijin')}
            />
        </div>
    );
};`,

    save: (blockName, blockTitle) => `import { useBlockProps, RichText } from '@wordpress/block-editor';

export const save = ({ attributes }) => {
    const blockProps = useBlockProps.save({
        className: 'wp-block-raijin-${blockName}'
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
    });
});`,

    style: (blockName) => `.wp-block-raijin-${blockName} {
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 4px;
    margin: 1rem 0;
    
    p {
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #333;
    }
}`,

    editStyle: (blockName) => `.editor-styles-wrapper .wp-block-raijin-${blockName} {
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 4px;
    margin: 1rem 0;
    
    p {
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #333;
    }
}`
}; 
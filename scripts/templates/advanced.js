module.exports = {
    index: (blockName, blockTitle) => `import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('raijin/${blockName}', {
    title: __('${blockTitle}', 'raijin'),
    icon: 'star-filled',
    category: 'common',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
        textColor: {
            type: 'string',
            default: '#333333'
        },
        alignment: {
            type: 'string',
            default: 'left'
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
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
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
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
    },
});`,
    style: (blockName) => `.wp-block-raijin-${blockName} {
    padding: 2rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    
    p {
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.6;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}`
}; 
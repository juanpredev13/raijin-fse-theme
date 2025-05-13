import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps({
        className: 'wp-block-raijin-test-8 editor-styles-wrapper',
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
};
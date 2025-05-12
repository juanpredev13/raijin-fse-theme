import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('raijin/test-script', {
    title: __('test script', 'raijin'),
    icon: 'star-filled',
    category: 'common',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
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
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        const { content } = attributes;

        return (
            <div {...blockProps}>
                <RichText.Content tagName="p" value={content} />
            </div>
        );
    },
});
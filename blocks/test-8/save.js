import { useBlockProps, RichText } from '@wordpress/block-editor';

export const save = ({ attributes }) => {
    const blockProps = useBlockProps.save({
        className: 'wp-block-raijin-test-8',
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
};
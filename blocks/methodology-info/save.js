/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
  const {
    title,
    description,
    buttonText,
    buttonUrl,
    backgroundColor,
    textColor,
    buttonColor,
    alignment = 'left',
  } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <div 
        className="methodology-info-section"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <div className="methodology-info-content">
          <RichText.Content
            tagName="h2"
            value={title}
            className="methodology-info-title"
            style={{ textAlign: alignment }}
          />
          <RichText.Content
            tagName="p"
            value={description}
            className="methodology-info-description"
            style={{ textAlign: alignment }}
          />
          <div className="methodology-info-button-container">
            <a 
              href={buttonUrl}
              className="methodology-info-button"
              style={{ backgroundColor: buttonColor }}
            >
              <RichText.Content
                value={buttonText}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
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
    headline,
    description,
    primaryButtonText,
    secondaryButtonText,
    heroImage,
    statsCard,
    notificationCard,
    classCard,
  } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <div className="hero-section">
        <div className="hero-content">
          <RichText.Content
            tagName="h1"
            value={headline}
            className="hero-headline"
          />
          <RichText.Content
            tagName="p"
            value={description}
            className="hero-description"
          />
          <div className="cta-buttons">
            <RichText.Content
              tagName="button"
              value={primaryButtonText}
              className="join-btn"
            />
            <div className="watch-btn">
              <span className="play-icon">▶</span>
              <RichText.Content
                tagName="span"
                value={secondaryButtonText}
              />
            </div>
          </div>
        </div>

        <div className="hero-image-container">
          {heroImage?.url && (
            <img
              src={heroImage.url || "/placeholder.svg"}
              alt={heroImage.alt}
              className="hero-image"
            />
          )}

          {/* Floating Cards */}
          <div className="card card-stats">
            <div className="card-icon">
              <span>📅</span>
            </div>
            <div className="card-content">
              <RichText.Content
                tagName="h3"
                value={statsCard.title}
              />
              <RichText.Content
                tagName="p"
                value={statsCard.description}
              />
            </div>
          </div>

          <div className="card card-notification">
            <div className="card-icon">
              <span>✉️</span>
            </div>
            <div className="card-content">
              <RichText.Content
                tagName="h3"
                value={notificationCard.title}
              />
              <RichText.Content
                tagName="p"
                value={notificationCard.description}
              />
            </div>
          </div>

          <div className="card card-class">
            <div className="card-content-row">
              <div className="card-content">
                <RichText.Content
                  tagName="h3"
                  value={classCard.title}
                />
                <RichText.Content
                  tagName="p"
                  value={classCard.description}
                />
              </div>
            </div>
            <RichText.Content
              tagName="button"
              value={classCard.buttonText}
              className="join-now-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
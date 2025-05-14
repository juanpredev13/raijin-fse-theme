/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import {
    TextControl,
    PanelBody,
    Button,
    Placeholder,
    Icon,
  } from '@wordpress/components';
  
  /**
   * React hook that is used to mark the block wrapper element.
   * It provides all the necessary props like the class name.
   *
   * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
   */
  import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaUpload,
    MediaUploadCheck,
  } from '@wordpress/block-editor';
  
  /**
   * The edit function describes the structure of your block in the context of the
   * editor. This represents what the editor will render when the block is used.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
   *
   * @param {Object}   props               Block props.
   * @param {Object}   props.attributes    Block attributes.
   * @param {Function} props.setAttributes Function to set block attributes.
   *
   * @return {WPElement} Element to render.
   */
  export default function Edit({ attributes, setAttributes }) {
    const {
      headline = '',
      highlightedText = '',
      description = '',
      primaryButtonText = '',
      secondaryButtonText = '',
      heroImage = { url: '', alt: 'Student learning online', id: null },
      statsCard = { title: '', description: '', icon: 'calendar' },
      notificationCard = { title: '', description: '', icon: 'email' },
      classCard = { title: '', description: '', buttonText: '' },
    } = attributes;
  
    const blockProps = useBlockProps();
  
    const onSelectImage = (media) => {
      if (!media) return;
      
      setAttributes({
        heroImage: {
          url: media.url || '',
          alt: media.alt || 'Student learning online',
          id: media.id || null,
        },
      });
    };
  
    const updateNestedAttribute = (parentKey, childKey, value) => {
      if (!parentKey || !childKey) return;
  
      setAttributes({
        [parentKey]: {
          ...(attributes[parentKey] || {}),
          [childKey]: value || '',
        },
      });
    };
  
    return (
      <div {...blockProps}>
        <InspectorControls>
          <PanelBody title="Hero Content Settings" initialOpen={true}>
            <TextControl
              label="Highlighted Text"
              value={highlightedText}
              onChange={(value) => setAttributes({ highlightedText: value || '' })}
            />
            <TextControl
              label="Primary Button Text"
              value={primaryButtonText}
              onChange={(value) => setAttributes({ primaryButtonText: value || '' })}
            />
            <TextControl
              label="Secondary Button Text"
              value={secondaryButtonText}
              onChange={(value) => setAttributes({ secondaryButtonText: value || '' })}
            />
          </PanelBody>
  
          <PanelBody title="Stats Card Settings" initialOpen={false}>
            <TextControl
              label="Title"
              value={statsCard?.title || ''}
              onChange={(value) => updateNestedAttribute('statsCard', 'title', value)}
            />
            <TextControl
              label="Description"
              value={statsCard?.description || ''}
              onChange={(value) => updateNestedAttribute('statsCard', 'description', value)}
            />
          </PanelBody>
  
          <PanelBody title="Notification Card Settings" initialOpen={false}>
            <TextControl
              label="Title"
              value={notificationCard?.title || ''}
              onChange={(value) => updateNestedAttribute('notificationCard', 'title', value)}
            />
            <TextControl
              label="Description"
              value={notificationCard?.description || ''}
              onChange={(value) => updateNestedAttribute('notificationCard', 'description', value)}
            />
          </PanelBody>
  
          <PanelBody title="Class Card Settings" initialOpen={false}>
            <TextControl
              label="Title"
              value={classCard?.title || ''}
              onChange={(value) => updateNestedAttribute('classCard', 'title', value)}
            />
            <TextControl
              label="Description"
              value={classCard?.description || ''}
              onChange={(value) => updateNestedAttribute('classCard', 'description', value)}
            />
            <TextControl
              label="Button Text"
              value={classCard?.buttonText || ''}
              onChange={(value) => updateNestedAttribute('classCard', 'buttonText', value)}
            />
          </PanelBody>
        </InspectorControls>
  
        <div className="hero-section">
          <div className="hero-content">
            <RichText
              tagName="h1"
              value={headline}
              onChange={(value) => setAttributes({ headline: value || '' })}
              placeholder="Enter headline here..."
              className="hero-headline"
              allowedFormats={['core/bold', 'core/italic']}
            />
            <RichText
              tagName="p"
              value={description}
              onChange={(value) => setAttributes({ description: value || '' })}
              placeholder="Enter description here..."
              className="hero-description"
            />
            <div className="cta-buttons">
              <RichText
                tagName="button"
                value={primaryButtonText}
                onChange={(value) => setAttributes({ primaryButtonText: value || '' })}
                className="join-btn"
              />
              <div className="watch-btn">
                <span className="play-icon">▶</span>
                <RichText
                  tagName="span"
                  value={secondaryButtonText}
                  onChange={(value) => setAttributes({ secondaryButtonText: value || '' })}
                />
              </div>
            </div>
          </div>
  
          <div className="hero-image-container">
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelectImage}
                allowedTypes={['image']}
                value={heroImage?.id}
                render={({ open }) => (
                  <>
                    {!heroImage?.url ? (
                      <Placeholder
                        icon={<Icon icon="format-image" />}
                        label="Hero Image"
                        instructions="Upload or select an image for the hero section."
                        className="hero-image-placeholder"
                      >
                        <Button isPrimary onClick={open}>
                          Select Image
                        </Button>
                      </Placeholder>
                    ) : (
                      <div className="hero-image-wrapper">
                        <img
                          src={heroImage.url}
                          alt={heroImage.alt}
                          className="hero-image"
                        />
                      </div>
                    )}
                  </>
                )}
              />
            </MediaUploadCheck>
  
            {/* Floating Cards */}
            <div className="card card-stats">
              <div className="card-icon">
                <span>📅</span>
              </div>
              <div className="card-content">
                <RichText
                  tagName="h3"
                  value={statsCard?.title || ''}
                  onChange={(value) => updateNestedAttribute('statsCard', 'title', value)}
                />
                <RichText
                  tagName="p"
                  value={statsCard?.description || ''}
                  onChange={(value) => updateNestedAttribute('statsCard', 'description', value)}
                />
              </div>
            </div>
  
            <div className="card card-notification">
              <div className="card-icon">
                <span>✉️</span>
              </div>
              <div className="card-content">
                <RichText
                  tagName="h3"
                  value={notificationCard?.title || ''}
                  onChange={(value) => updateNestedAttribute('notificationCard', 'title', value)}
                />
                <RichText
                  tagName="p"
                  value={notificationCard?.description || ''}
                  onChange={(value) => updateNestedAttribute('notificationCard', 'description', value)}
                />
              </div>
            </div>
  
            <div className="card card-class">
              <div className="card-content-row">
                <div className="card-content">
                  <RichText
                    tagName="h3"
                    value={classCard?.title || ''}
                    onChange={(value) => updateNestedAttribute('classCard', 'title', value)}
                  />
                  <RichText
                    tagName="p"
                    value={classCard?.description || ''}
                    onChange={(value) => updateNestedAttribute('classCard', 'description', value)}
                  />
                </div>
              </div>
              <RichText
                tagName="button"
                value={classCard?.buttonText || ''}
                onChange={(value) => updateNestedAttribute('classCard', 'buttonText', value)}
                className="join-now-btn"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
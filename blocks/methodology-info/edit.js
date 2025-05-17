/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import {
    PanelBody,
    TextControl,
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
    AlignmentToolbar,
    PanelColorSettings,
    useSetting,
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
      title,
      description,
      buttonText,
      buttonUrl,
      backgroundColor,
      textColor,
      buttonColor,
      alignment = 'left',
    } = attributes;
  
    const blockProps = useBlockProps();
    const themePalette = useSetting('color.palette');
  
    return (
      <div {...blockProps}>
        <InspectorControls>
          <PanelColorSettings
            title="Colores del bloque"
            disableCustomColors={true}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: (color) => setAttributes({ backgroundColor: color }),
                label: 'Color de fondo',
                colors: themePalette,
              },
              {
                value: textColor,
                onChange: (color) => setAttributes({ textColor: color }),
                label: 'Color de texto',
                colors: themePalette,
              },
              {
                value: buttonColor,
                onChange: (color) => setAttributes({ buttonColor: color }),
                label: 'Color del botón',
                colors: themePalette,
              },
            ]}
          >
            <PanelBody title="Content Settings" initialOpen={true}>
              <TextControl
                label="Button URL"
                value={buttonUrl}
                onChange={(value) => setAttributes({ buttonUrl: value })}
              />
            </PanelBody>
          </PanelColorSettings>
        </InspectorControls>
  
        <AlignmentToolbar
          value={alignment}
          onChange={(newAlign) => setAttributes({ alignment: newAlign })}
        />
  
        <div 
          className="methodology-info-section"
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
          }}
        >
          <div className="methodology-info-content">
            <RichText
              tagName="h2"
              value={title}
              onChange={(value) => setAttributes({ title: value })}
              placeholder="Enter title here..."
              className="methodology-info-title"
              allowedFormats={['core/bold', 'core/italic']}
              style={{ textAlign: alignment }}
            />
            <RichText
              tagName="p"
              value={description}
              onChange={(value) => setAttributes({ description: value })}
              placeholder="Enter description here..."
              className="methodology-info-description"
              style={{ textAlign: alignment }}
            />
            <div className="methodology-info-button-container">
              <a
                href={buttonUrl}
                className="methodology-info-button"
                style={{ backgroundColor: buttonColor }}
              >
                <RichText
                  tagName="span"
                  value={buttonText}
                  onChange={(value) => setAttributes({ buttonText: value })}
                  placeholder="Button text..."
                  className="button-text"
                  allowedFormats={['core/bold', 'core/italic']}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
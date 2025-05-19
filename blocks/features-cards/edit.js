/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import {
	TextControl,
	PanelBody,
	Button,
	ColorPicker,
	SelectControl,
	RangeControl,
} from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
import { __ } from '@wordpress/i18n';
import './edit.scss';

// Icon components
const DocumentIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
		<path d="M8 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8h-4a3 3 0 01-3-3V3H8zm10 2v2a1 1 0 001 1h2l-3-3z" />
		<path d="M14 11H8v-1h6v1zm2 3H8v-1h8v1zm-2 3H8v-1h6v1z" />
	</svg>
);

const CalendarIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
		<path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
		<path d="M7 12h5v5H7z" />
	</svg>
);

const GroupsIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
		<path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c.37-.06.74-.1 1.13-.1.99 0 1.93.21 2.78.58.73.32 1.21 1.04 1.21 1.85V18h-4.5v-1.61c0-.83-.23-1.61-.63-2.29zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
	</svg>
);

export default function Edit({ attributes, setAttributes }) {
	const { cards, columns } = attributes;
	const blockProps = useBlockProps();

	const updateCardAttribute = (index, attribute, value) => {
		const newCards = [...cards];
		newCards[index][attribute] = value;
		setAttributes({ cards: newCards });
	};

	const addCard = () => {
		const newCards = [...cards];
		newCards.push({
			id: `card-${Date.now()}`,
			title: 'New Feature',
			description: 'Describe your feature here',
			icon: 'document',
			iconColor: '#5e72e4',
			buttonText: 'Ver más',
			buttonLink: '#'
		});
		setAttributes({ cards: newCards });
	};

	const removeCard = (index) => {
		const newCards = [...cards];
		newCards.splice(index, 1);
		setAttributes({ cards: newCards });
	};

	const getIconComponent = (iconName) => {
		switch (iconName) {
			case 'document':
				return <DocumentIcon />;
			case 'calendar':
				return <CalendarIcon />;
			case 'groups':
				return <GroupsIcon />;
			default:
				return <DocumentIcon />;
		}
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Features Cards Settings', 'features-cards')}>
					<RangeControl
						label={__('Columns', 'features-cards')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={4}
					/>
					<Button
						isPrimary
						onClick={addCard}
					>
						{__('Add Card', 'features-cards')}
					</Button>
				</PanelBody>

				{cards.map((card, cardIndex) => (
					<PanelBody
						key={card.id}
						title={`${__('Card', 'features-cards')}: ${card.title}`}
						initialOpen={false}
					>
						<TextControl
							label={__('Title', 'features-cards')}
							value={card.title}
							onChange={(value) => updateCardAttribute(cardIndex, 'title', value)}
						/>
						<TextControl
							label={__('Description', 'features-cards')}
							value={card.description}
							onChange={(value) => updateCardAttribute(cardIndex, 'description', value)}
							multiline="true"
						/>
						<SelectControl
							label={__('Icon', 'features-cards')}
							value={card.icon}
							options={[
								{ label: 'Document', value: 'document' },
								{ label: 'Calendar', value: 'calendar' },
								{ label: 'Groups', value: 'groups' },
								{ label: 'Book', value: 'book' },
								{ label: 'Video', value: 'video' },
								{ label: 'Certificate', value: 'certificate' },
								{ label: 'Support', value: 'support' },
								{ label: 'Progress', value: 'progress' },
								{ label: 'Company', value: 'company' },
								{ label: 'Workshop', value: 'workshop' },
								{ label: 'Certification', value: 'certification' },
							]}
							onChange={(value) => updateCardAttribute(cardIndex, 'icon', value)}
						/>
						<div>
							<p>{__('Icon Color', 'features-cards')}</p>
							<ColorPicker
								color={card.iconColor}
								onChangeComplete={(value) => updateCardAttribute(cardIndex, 'iconColor', value.hex)}
								disableAlpha
							/>
						</div>
						<TextControl
							label={__('Button Text', 'features-cards')}
							value={card.buttonText}
							onChange={(value) => updateCardAttribute(cardIndex, 'buttonText', value)}
						/>
						<TextControl
							label={__('Button Link', 'features-cards')}
							value={card.buttonLink}
							onChange={(value) => updateCardAttribute(cardIndex, 'buttonLink', value)}
						/>
						<div className="features-cards-actions">
							<Button
								isDestructive
								onClick={() => removeCard(cardIndex)}
							>
								{__('Remove Card', 'features-cards')}
							</Button>
						</div>
					</PanelBody>
				))}
			</InspectorControls>

			<div className="features-cards-block">
				<div className={`features-cards-container columns-${columns}`}>
					{cards.map((card, cardIndex) => (
						<div key={card.id} className="features-card">
							<div 
								className="features-card-icon" 
								style={{ backgroundColor: card.iconColor }}
							>
								{getIconComponent(card.icon)}
							</div>
							<RichText
								tagName="h3"
								className="features-card-title"
								value={card.title}
								onChange={(value) => updateCardAttribute(cardIndex, 'title', value)}
								placeholder={__('Feature Title', 'features-cards')}
							/>
							<RichText
								tagName="p"
								className="features-card-description"
								value={card.description}
								onChange={(value) => updateCardAttribute(cardIndex, 'description', value)}
								placeholder={__('Feature Description', 'features-cards')}
							/>
							<div className="features-card-overlay">
								<a 
									href={card.buttonLink} 
									className="features-card-button"
									target="_blank"
									rel="noopener noreferrer"
								>
									{card.buttonText}
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
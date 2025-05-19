/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { cards, columns } = attributes;
	const blockProps = useBlockProps.save();

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

	const BookIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
			<path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
		</svg>
	);

	const VideoIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
			<path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
		</svg>
	);

	const CertificateIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
			<path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 15H5c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1z" />
			<path d="M7 10h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
		</svg>
	);

	const SupportIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
		</svg>
	);

	const ProgressIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
			<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
		</svg>
	);

	const getIconComponent = (iconName) => {
		switch (iconName) {
			case 'document':
				return <DocumentIcon />;
			case 'calendar':
				return <CalendarIcon />;
			case 'groups':
				return <GroupsIcon />;
			case 'book':
				return <BookIcon />;
			case 'video':
				return <VideoIcon />;
			case 'certificate':
				return <CertificateIcon />;
			case 'support':
				return <SupportIcon />;
			case 'progress':
				return <ProgressIcon />;
			default:
				return <DocumentIcon />;
		}
	};

	return (
		<div {...blockProps}>
			<div className="features-cards-block">
				<div className={`features-cards-container columns-${columns}`}>
					{cards.map((card) => (
						<div key={card.id} className="features-card">
							<div 
								className="features-card-icon" 
								style={{ backgroundColor: card.iconColor }}
							>
								{getIconComponent(card.icon)}
							</div>
							<RichText.Content
								tagName="h3"
								className="features-card-title"
								value={card.title}
							/>
							<RichText.Content
								tagName="p"
								className="features-card-description"
								value={card.description}
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
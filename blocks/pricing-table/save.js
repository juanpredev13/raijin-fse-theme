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
	const { title, titleColor, iconColor, buttonColor, plans } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="pricing-table-block">
				<RichText.Content
					tagName="h2"
					className="pricing-table-title"
					value={title}
					style={{ color: titleColor }}
				/>

				<div className="pricing-table-container">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className={`pricing-plan ${plan.highlight ? 'pricing-plan-highlight' : ''}`}
							data-id={plan.id}
						>
							<div className="pricing-plan-header">
								<RichText.Content
									tagName="h3"
									className="pricing-plan-name"
									value={plan.name}
								/>
							</div>
							<div className="pricing-plan-price">
								<RichText.Content
									tagName="div"
									className="pricing-plan-amount"
									value={plan.price}
								/>
								<div className="pricing-plan-period">
									/ <RichText.Content
										tagName="span"
										value={plan.period}
									/>
								</div>
							</div>
							<ul className="pricing-plan-features">
								{plan.features.map((feature, index) => (
									<li key={index} className="pricing-plan-feature">
										<span 
											className="pricing-plan-check" 
											style={{ color: iconColor }}
										>
											✓
										</span>
										<RichText.Content
											tagName="span"
											value={feature}
										/>
									</li>
								))}
							</ul>
							<div className="pricing-plan-footer">
								<RichText.Content
									tagName="a"
									className="pricing-plan-button"
									value={plan.buttonText}
									href={plan.buttonUrl}
									style={{ 
										backgroundColor: buttonColor,
										color: '#ffffff'
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
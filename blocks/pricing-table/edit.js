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
	ToggleControl,
	TextareaControl,
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
	PanelColorSettings,
	useSetting,
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
import { useState } from '@wordpress/element';
import './edit.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, titleColor, iconColor, buttonColor, plans } = attributes;
	const blockProps = useBlockProps();
	const themePalette = useSetting('color.palette');

	const updatePlanAttribute = (index, attribute, value) => {
		const newPlans = [...plans];
		newPlans[index][attribute] = value;
		setAttributes({ plans: newPlans });
	};

	const addFeature = (planIndex) => {
		const newPlans = [...plans];
		newPlans[planIndex].features.push('New Feature');
		setAttributes({ plans: newPlans });
	};

	const removeFeature = (planIndex, featureIndex) => {
		const newPlans = [...plans];
		newPlans[planIndex].features.splice(featureIndex, 1);
		setAttributes({ plans: newPlans });
	};

	const updateFeature = (planIndex, featureIndex, value) => {
		const newPlans = [...plans];
		newPlans[planIndex].features[featureIndex] = value;
		setAttributes({ plans: newPlans });
	};

	const addPlan = () => {
		const newPlans = [...plans];
		newPlans.push({
			id: `plan-${Date.now()}`,
			name: 'New Plan',
			price: '$XX',
			period: 'MONTH',
			features: ['Feature 1', 'Feature 2'],
			buttonText: 'Sign Up',
			buttonUrl: '#',
			highlight: false,
			color: '#f0f0f0'
		});
		setAttributes({ plans: newPlans });
	};

	const removePlan = (index) => {
		const newPlans = [...plans];
		newPlans.splice(index, 1);
		setAttributes({ plans: newPlans });
	};

	const updatePlanColor = (planId, color) => {
		const updatedPlans = plans.map(plan => {
			if (plan.id === planId) {
				return { ...plan, color };
			}
			return plan;
		});
		setAttributes({ plans: updatedPlans });
	};

	return (
		<div {...blockProps} className="wp-block-raijin-pricing-table">
			<InspectorControls>
				<PanelBody title={__('Pricing Table Settings', 'pricing-table')}>
					<TextControl
						label={__('Title', 'pricing-table')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<PanelColorSettings
						title={__('Colores generales', 'pricing-table')}
						disableCustomColors={true}
						colorSettings={[
							{
								value: titleColor,
								onChange: (color) => setAttributes({ titleColor: color }),
								label: __('Color del título', 'pricing-table'),
								colors: themePalette,
							},
							{
								value: iconColor,
								onChange: (color) => setAttributes({ iconColor: color }),
								label: __('Color de los iconos', 'pricing-table'),
								colors: themePalette,
							},
							{
								value: buttonColor,
								onChange: (color) => setAttributes({ buttonColor: color }),
								label: __('Color de los botones', 'pricing-table'),
								colors: themePalette,
							},
						]}
					/>
					<Button
						isPrimary
						onClick={addPlan}
					>
						{__('Add Plan', 'pricing-table')}
					</Button>
				</PanelBody>

				<PanelColorSettings
					title="Colores de los planes"
					disableCustomColors={true}
					colorSettings={plans.map(plan => ({
						value: plan.color,
						onChange: (color) => updatePlanColor(plan.id, color),
						label: `Color del plan ${plan.name}`,
						colors: themePalette,
					}))}
				/>

				{plans.map((plan, planIndex) => (
					<PanelBody
						key={plan.id}
						title={`${__('Plan', 'pricing-table')}: ${plan.name}`}
						initialOpen={false}
					>
						<TextControl
							label={__('Plan Name', 'pricing-table')}
							value={plan.name}
							onChange={(value) => updatePlanAttribute(planIndex, 'name', value)}
						/>
						<TextControl
							label={__('Price', 'pricing-table')}
							value={plan.price}
							onChange={(value) => updatePlanAttribute(planIndex, 'price', value)}
						/>
						<TextControl
							label={__('Period', 'pricing-table')}
							value={plan.period}
							onChange={(value) => updatePlanAttribute(planIndex, 'period', value)}
						/>
						<TextControl
							label={__('Button Text', 'pricing-table')}
							value={plan.buttonText}
							onChange={(value) => updatePlanAttribute(planIndex, 'buttonText', value)}
						/>
						<TextControl
							label={__('Button URL', 'pricing-table')}
							value={plan.buttonUrl}
							onChange={(value) => updatePlanAttribute(planIndex, 'buttonUrl', value)}
						/>
						<ToggleControl
							label={__('Destacar este plan', 'pricing-table')}
							checked={plan.highlight}
							onChange={(value) => updatePlanAttribute(planIndex, 'highlight', value)}
						/>
						<div>
							<p>{__('Plan Color', 'pricing-table')}</p>
							<ColorPicker
								color={plan.color}
								onChangeComplete={(value) => updatePlanAttribute(planIndex, 'color', value.hex)}
								disableAlpha
							/>
						</div>
						<div className="pricing-table-features">
							<p>{__('Features', 'pricing-table')}</p>
							{plan.features.map((feature, featureIndex) => (
								<div key={featureIndex} className="pricing-plan-feature-item">
									<TextControl
										value={feature}
										onChange={(value) => updateFeature(planIndex, featureIndex, value)}
									/>
									<Button
										isDestructive
										isSmall
										onClick={() => removeFeature(planIndex, featureIndex)}
									>
										{__('Remove', 'pricing-table')}
									</Button>
								</div>
							))}
							<Button
								isSecondary
								onClick={() => addFeature(planIndex)}
							>
								{__('Add Feature', 'pricing-table')}
							</Button>
						</div>
						<div className="pricing-table-actions">
							<Button
								isDestructive
								onClick={() => removePlan(planIndex)}
							>
								{__('Remove Plan', 'pricing-table')}
							</Button>
						</div>
					</PanelBody>
				))}
			</InspectorControls>

			<div className="pricing-table-block">
				<RichText
					tagName="h2"
					className="pricing-table-title"
					value={title}
					onChange={(value) => setAttributes({ title: value })}
					placeholder={__('Pricing Table Title', 'pricing-table')}
					style={{ color: titleColor }}
				/>

				<div className="pricing-table-container">
					{plans.map((plan, planIndex) => (
						<div
							key={plan.id}
							className={`pricing-plan ${plan.highlight ? 'pricing-plan-highlight' : ''}`}
							style={{ backgroundColor: plan.color }}
						>
							<div className="pricing-plan-header">
								<RichText
									tagName="h3"
									className="pricing-plan-name"
									value={plan.name}
									onChange={(value) => updatePlanAttribute(planIndex, 'name', value)}
									placeholder={__('Plan Name', 'pricing-table')}
								/>
								<div className="pricing-plan-price">
									<RichText
										tagName="span"
										className="price"
										value={plan.price}
										onChange={(value) => updatePlanAttribute(planIndex, 'price', value)}
										placeholder={__('$XX', 'pricing-table')}
									/>
									<RichText
										tagName="span"
										className="period"
										value={plan.period}
										onChange={(value) => updatePlanAttribute(planIndex, 'period', value)}
										placeholder={__('MONTH', 'pricing-table')}
									/>
								</div>
							</div>

							<div className="pricing-plan-features">
								{plan.features.map((feature, featureIndex) => (
									<div key={featureIndex} className="pricing-plan-feature">
										<span className="pricing-plan-check" style={{ color: iconColor }}>
											✓
										</span>
										<RichText
											tagName="span"
											value={feature}
											onChange={(value) => updateFeature(planIndex, featureIndex, value)}
											placeholder={__('Feature', 'pricing-table')}
										/>
									</div>
								))}
							</div>

							<div className="pricing-plan-footer">
								<RichText
									tagName="a"
									className="pricing-plan-button"
									value={plan.buttonText}
									onChange={(value) => updatePlanAttribute(planIndex, 'buttonText', value)}
									placeholder={__('Sign Up', 'pricing-table')}
									style={{ backgroundColor: buttonColor, color: '#ffffff' }}
									href={plan.buttonUrl}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
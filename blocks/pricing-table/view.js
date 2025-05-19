/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in the `block.json` file, WordPress will automatically enqueue it on
 * the front end when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

document.addEventListener('DOMContentLoaded', function() {
	// Add hover effects or other interactive elements
	const pricingPlans = document.querySelectorAll('.pricing-plan');
	
	pricingPlans.forEach(plan => {
		const button = plan.querySelector('.pricing-plan-button');
		
		if (button) {
			// Optional: Add custom button hover effects
			button.addEventListener('mouseenter', () => {
				button.style.transform = 'scale(1.05)';
			});
			
			button.addEventListener('mouseleave', () => {
				button.style.transform = 'scale(1)';
			});
		}
	});
});
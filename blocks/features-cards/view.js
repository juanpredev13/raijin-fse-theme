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
	// Add animation on scroll if needed
	const featureCards = document.querySelectorAll('.features-card');
	
	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animated');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });
		
		featureCards.forEach(card => {
			observer.observe(card);
		});
	} else {
		// Fallback for browsers that don't support IntersectionObserver
		featureCards.forEach(card => {
			card.classList.add('animated');
		});
	}
});
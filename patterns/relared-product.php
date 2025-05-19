<?php
/**
 * Title: Related Product
 * Slug: services/related-product
 * Categories: services
 */
?>

<!-- wp:group {"className":"product-card"} -->
<div class="wp-block-group product-card">
    <!-- wp:image {"className":"product-image"} -->
    <figure class="wp-block-image product-image">
        <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder-product.jpg" alt="Product Image"/>
    </figure>
    <!-- /wp:image -->
    
    <!-- wp:heading {"level":4,"className":"product-title"} -->
    <h4 class="product-title">Website Maintenance Package</h4>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"className":"product-price"} -->
    <p class="product-price">$99/month</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:paragraph {"className":"product-description"} -->
    <p class="product-description">Keep your website running smoothly with our comprehensive maintenance package. Includes regular updates, security monitoring, and technical support.</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons -->
    <div class="wp-block-buttons">
        <!-- wp:button {"className":"cta-button"} -->
        <div class="wp-block-button cta-button"><a class="wp-block-button__link wp-element-button" href="#">Learn More</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
</div>
<!-- /wp:group -->
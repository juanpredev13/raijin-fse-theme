// Script para la vista del bloque
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.wp-block-raijin-hero-section');
    
    blocks.forEach(block => {
        // Aquí puedes agregar cualquier funcionalidad JavaScript
        // que necesites para la vista del bloque
        console.log('Block hero-section inicializado');

        // Ejemplo: Agregar animación al hacer hover
        block.addEventListener('mouseenter', () => {
            block.style.transform = 'translateY(-2px)';
            block.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });

        block.addEventListener('mouseleave', () => {
            block.style.transform = 'translateY(0)';
            block.style.boxShadow = 'none';
        });
    });
});
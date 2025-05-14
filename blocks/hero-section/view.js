// Script para la vista del bloque
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.wp-block-custom-blocks-hero-section');
    
    blocks.forEach(block => {
        console.log('Block hero-section inicializado');

        // Inicializar funcionalidad del bloque
        const watchBtn = block.querySelector('.watch-btn');
        if (watchBtn) {
            watchBtn.addEventListener('click', () => {
                // Aquí puedes agregar la funcionalidad para el botón de "Watch how it works"
                console.log('Watch button clicked');
            });
        }

        const joinNowBtn = block.querySelector('.join-now-btn');
        if (joinNowBtn) {
            joinNowBtn.addEventListener('click', () => {
                // Aquí puedes agregar la funcionalidad para el botón de "Join Now"
                console.log('Join Now button clicked');
            });
        }
    });
});
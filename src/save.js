import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="course-cards-container">
                {/* Contenido guardado */}
            </div>
        </div>
    );
} 
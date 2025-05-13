import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <div className="course-cards-container">
                {/* Contenido del editor */}
            </div>
        </div>
    );
} 
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		title,
		showSeeAll,
		courses,
		columns,
	} = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="course-cards-block">
				<div className="course-cards-header">
					<RichText.Content
						tagName="h2"
						className="course-cards-title"
						value={title}
					/>
					{showSeeAll && (
						<a href="#" className="course-cards-see-all">See all</a>
					)}
				</div>

				<div className={`course-cards-grid course-grid-${columns}`}>
					{courses.map((course) => (
						<div className="course-card" key={course.id}>
							<div className="course-card-image-container">
								{course.imageUrl && (
									<img
										src={course.imageUrl || "/placeholder.svg"}
										alt={course.courseTitle}
										className="course-card-image"
									/>
								)}
							</div>

							<div className="course-card-meta">
								<RichText.Content
									tagName="span"
									className="course-card-category"
									value={course.category}
								/>
								<RichText.Content
									tagName="span"
									className="course-card-duration"
									value={course.duration}
								/>
							</div>

							<RichText.Content
								tagName="h3"
								className="course-card-title"
								value={course.courseTitle}
							/>

							<RichText.Content
								tagName="p"
								className="course-card-description"
								value={course.description}
							/>

							<div className="course-card-footer">
								<div className="course-card-instructor">
									{course.instructorImage && (
										<img
											src={course.instructorImage || "/placeholder.svg"}
											alt={course.instructor}
											className="instructor-avatar"
										/>
									)}
									<RichText.Content
										tagName="span"
										className="instructor-name"
										value={course.instructor}
									/>
								</div>

								<div className="course-card-pricing">
									<RichText.Content
										tagName="span"
										className="regular-price"
										value={`$${course.regularPrice}`}
									/>
									<RichText.Content
										tagName="span"
										className="sale-price"
										value={`$${course.salePrice}`}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
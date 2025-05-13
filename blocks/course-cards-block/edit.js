import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		showSeeAll,
		courses,
		columns,
	} = attributes;

	const blockProps = useBlockProps();

	const addCourse = () => {
		const newCourses = [...courses, {
			id: Date.now(),
			imageUrl: '',
			category: 'Design',
			duration: '3 Month',
			courseTitle: 'New Course Title',
			description: 'Course description goes here',
			instructor: 'Instructor',
			instructorImage: '',
			regularPrice: '100',
			salePrice: '80'
		}];
		setAttributes({ courses: newCourses });
	};

	const removeCourse = (id) => {
		const newCourses = courses.filter(course => course.id !== id);
		setAttributes({ courses: newCourses });
	};

	const updateCourseAttribute = (id, attribute, value) => {
		const newCourses = courses.map(course => {
			if (course.id === id) {
				return {
					...course,
					[attribute]: value
				};
			}
			return course;
		});
		setAttributes({ courses: newCourses });
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Grid Settings', 'course-cards-block')}>
					<TextControl
						label={__('Section Title', 'course-cards-block')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<ToggleControl
						label={__('Show "See all" link', 'course-cards-block')}
						checked={showSeeAll}
						onChange={(value) => setAttributes({ showSeeAll: value })}
					/>
					<RangeControl
						label={__('Columns', 'course-cards-block')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={4}
					/>
					<Button
						isPrimary
						onClick={addCourse}
					>
						{__('Add Course', 'course-cards-block')}
					</Button>
				</PanelBody>

				{courses.map((course) => (
					<PanelBody
						title={course.courseTitle || __('Course', 'course-cards-block')}
						initialOpen={false}
						key={course.id}
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => updateCourseAttribute(course.id, 'imageUrl', media.url)}
								allowedTypes={['image']}
								value={course.imageUrl}
								render={({ open }) => (
									<div>
										<Button
											onClick={open}
											isPrimary={!course.imageUrl}
											isSecondary={!!course.imageUrl}
										>
											{!course.imageUrl ?
												__('Select Course Image', 'course-cards-block') :
												__('Replace Image', 'course-cards-block')
											}
										</Button>
										{course.imageUrl && (
											<Button
												onClick={() => updateCourseAttribute(course.id, 'imageUrl', '')}
												isDestructive
											>
												{__('Remove Image', 'course-cards-block')}
											</Button>
										)}
									</div>
								)}
							/>
						</MediaUploadCheck>

						<TextControl
							label={__('Category', 'course-cards-block')}
							value={course.category}
							onChange={(value) => updateCourseAttribute(course.id, 'category', value)}
						/>

						<TextControl
							label={__('Duration', 'course-cards-block')}
							value={course.duration}
							onChange={(value) => updateCourseAttribute(course.id, 'duration', value)}
						/>

						<TextControl
							label={__('Course Title', 'course-cards-block')}
							value={course.courseTitle}
							onChange={(value) => updateCourseAttribute(course.id, 'courseTitle', value)}
						/>

						<TextControl
							label={__('Description', 'course-cards-block')}
							value={course.description}
							onChange={(value) => updateCourseAttribute(course.id, 'description', value)}
						/>

						<TextControl
							label={__('Instructor Name', 'course-cards-block')}
							value={course.instructor}
							onChange={(value) => updateCourseAttribute(course.id, 'instructor', value)}
						/>

						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => updateCourseAttribute(course.id, 'instructorImage', media.url)}
								allowedTypes={['image']}
								value={course.instructorImage}
								render={({ open }) => (
									<div>
										<Button
											onClick={open}
											isPrimary={!course.instructorImage}
											isSecondary={!!course.instructorImage}
										>
											{!course.instructorImage ?
												__('Select Instructor Image', 'course-cards-block') :
												__('Replace Instructor Image', 'course-cards-block')
											}
										</Button>
										{course.instructorImage && (
											<Button
												onClick={() => updateCourseAttribute(course.id, 'instructorImage', '')}
												isDestructive
											>
												{__('Remove Instructor Image', 'course-cards-block')}
											</Button>
										)}
									</div>
								)}
							/>
						</MediaUploadCheck>

						<TextControl
							label={__('Regular Price', 'course-cards-block')}
							value={course.regularPrice}
							onChange={(value) => updateCourseAttribute(course.id, 'regularPrice', value)}
						/>

						<TextControl
							label={__('Sale Price', 'course-cards-block')}
							value={course.salePrice}
							onChange={(value) => updateCourseAttribute(course.id, 'salePrice', value)}
						/>

						<Button
							isDestructive
							onClick={() => removeCourse(course.id)}
						>
							{__('Remove Course', 'course-cards-block')}
						</Button>
					</PanelBody>
				))}
			</InspectorControls>

			<div className="course-cards-block">
				<div className="course-cards-header">
					<RichText
						tagName="h2"
						className="course-cards-title"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Section Title', 'course-cards-block')}
					/>
					{showSeeAll && (
						<span className="course-cards-see-all">See all</span>
					)}
				</div>

				<div className={`course-cards-grid course-grid-${columns}`}>
					{courses.map((course) => (
						<div className="course-card" key={course.id}>
							<div className="course-card-image-container">
								{course.imageUrl ? (
									<img
										src={course.imageUrl || "/placeholder.svg"}
										alt={course.courseTitle}
										className="course-card-image"
									/>
								) : (
									<div className="course-card-image-placeholder">
										<span>{__('Select an image', 'course-cards-block')}</span>
									</div>
								)}
							</div>

							<div className="course-card-meta">
								<RichText
									tagName="span"
									className="course-card-category"
									value={course.category}
									onChange={(value) => updateCourseAttribute(course.id, 'category', value)}
									placeholder={__('Category', 'course-cards-block')}
								/>
								<RichText
									tagName="span"
									className="course-card-duration"
									value={course.duration}
									onChange={(value) => updateCourseAttribute(course.id, 'duration', value)}
									placeholder={__('Duration', 'course-cards-block')}
								/>
							</div>

							<RichText
								tagName="h3"
								className="course-card-title"
								value={course.courseTitle}
								onChange={(value) => updateCourseAttribute(course.id, 'courseTitle', value)}
								placeholder={__('Course Title', 'course-cards-block')}
							/>

							<RichText
								tagName="p"
								className="course-card-description"
								value={course.description}
								onChange={(value) => updateCourseAttribute(course.id, 'description', value)}
								placeholder={__('Course Description', 'course-cards-block')}
							/>

							<div className="course-card-footer">
								<div className="course-card-instructor">
									{course.instructorImage ? (
										<img
											src={course.instructorImage || "/placeholder.svg"}
											alt={course.instructor}
											className="instructor-avatar"
										/>
									) : (
										<div className="instructor-avatar-placeholder"></div>
									)}
									<RichText
										tagName="span"
										className="instructor-name"
										value={course.instructor}
										onChange={(value) => updateCourseAttribute(course.id, 'instructor', value)}
										placeholder={__('Instructor', 'course-cards-block')}
									/>
								</div>

								<div className="course-card-pricing">
									<RichText
										tagName="span"
										className="regular-price"
										value={`$${course.regularPrice}`}
										onChange={(value) => updateCourseAttribute(course.id, 'regularPrice', value.replace('$', ''))}
										placeholder={__('$100', 'course-cards-block')}
									/>
									<RichText
										tagName="span"
										className="sale-price"
										value={`$${course.salePrice}`}
										onChange={(value) => updateCourseAttribute(course.id, 'salePrice', value.replace('$', ''))}
										placeholder={__('$80', 'course-cards-block')}
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
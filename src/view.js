import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Components/Common/Style';
import AdvancedImage from './Components/Frontend/AdvancedImage';

document.addEventListener('DOMContentLoaded', () => {
	const advancedImageEls = document.querySelectorAll('.wp-block-b-blocks-advanced-image');
	advancedImageEls.forEach(advancedImageEl => {
		const attributes = JSON.parse(advancedImageEl.dataset.attributes);
		const featuredImageURL = advancedImageEl.dataset.featured_image_url;

		createRoot(advancedImageEl).render(<>
			{/* style */}
			<Style attributes={attributes} id={`${advancedImageEl.id}`} />
			{/* content */}
			<AdvancedImage attributes={attributes} featuredImageURL={featuredImageURL}></AdvancedImage>
		</>);

		advancedImageEl?.removeAttribute('data-attributes');
	});
});
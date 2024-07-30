
import { useBlockProps } from '@wordpress/block-editor';
import Style from '../Common/Style';
import Settings from './Settings/Settings';
import { withSelect } from '@wordpress/data';
import { FaImage, bootIcn } from '../../utils/icons';
import Image from './image';

const Edit = props => {
	const { attributes, setAttributes, clientId, device, featureMediaURL } = props;
	const { image } = attributes;
	const { sourceType } = image;

	return <>
		{/* settings */}
		<Settings {...{ attributes, setAttributes }} />

		<div {...useBlockProps()} id={`bBlocksAdvancedImage-${clientId}`}>
			{/* style */}
			<Style attributes={attributes} id={`bBlocksAdvancedImage-${clientId}`} device={device} />
			{/* Content */}
			<div className="sourceStyle">
				{!sourceType ?
					<div className='sourceType'>
						<p className="imgSource">Choose Your Image Source</p>
						<div className="images">
							<div className="imgChild" onClick={() => setAttributes({ image: { ...image, sourceType: 'custom' } })}>
								<div><FaImage /></div>
								<p className="imgText">Custom Image</p>
							</div>

							<div className="imgChild" onClick={() => setAttributes({ image: { ...image, sourceType: 'featured' } })}>
								<div>{bootIcn}</div>
								<p className="imgText" style={{ marginTop: "-7px" }}>
									Featured Image
								</p>
							</div>
						</div>
					</div>
					:
					<div className='bBlocksAdvancedImage'>
						<Image attributes={attributes} setAttributes={setAttributes} featureMediaURL={featureMediaURL} />
					</div>
				}
			</div>

		</div>
	</>;
}
export default withSelect((select, props) => {
	const { layout } = props.attributes;
	const { size } = layout;

	const mediaID = select("core/editor").getEditedPostAttribute("featured_media");
	const mediaObj = select("core").getMedia(mediaID);
	const featureMediaURL = mediaObj?.media_details?.sizes[size]?.source_url || mediaObj?.source_url;

	return {
		device: select('core/edit-post').__experimentalGetPreviewDeviceType()?.toLowerCase(),
		featureMediaURL
	}
})(Edit);
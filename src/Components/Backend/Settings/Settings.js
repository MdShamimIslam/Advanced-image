import { withSelect } from "@wordpress/data";
import { InspectorControls } from '@wordpress/block-editor';
import General from "./General/General";
import Style from "./Style/Style";
import { TabPanel } from '@wordpress/components';
import { generalStyleTabs } from '../../../utils/options';
import { tabController } from '../../../../../Components/utils/functions';

const Settings = ({ attributes, setAttributes, device }) => {
    return <>
        <InspectorControls>
            <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>
					{
						tab => <>
							{'general' === tab.name && <>
                                <General attributes={attributes} setAttributes={setAttributes} device={device} />
								
							</>}
							{'style' === tab.name && <>
                                <Style attributes={attributes} setAttributes={setAttributes} device={device} />
							</>}
						</>
					}

				</TabPanel>
        </InspectorControls>
    </>
};
export default withSelect((select) => {
    return {
        device: select('core/edit-post').__experimentalGetPreviewDeviceType()?.toLowerCase()
    }
})(Settings);
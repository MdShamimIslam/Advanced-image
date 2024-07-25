import { BlockControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, __experimentalUnitControl as UnitControl,ToolbarGroup,ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Device } from '../../../../../../Components/Device/Device';
import { hoverEffectOptions, imgFitOptions, imgSizes, imgSrcOptions, imgStyleOptions } from '../../../../utils/options';
import { updateData } from '../../../../utils/functions';

const General = ({ attributes, setAttributes, device }) => {
  const { image, layout, style, caption } = attributes;
  const { sourceType,source, link } = image;
  const { height, isAutoHeight, isAutoFit, fitOptionType, enableNewTab } = layout;
  const { hoverEffect, optionType } = style;
  const { enabled } = caption;

  return (
    <>
      {/* update Custom Image */}
      <BlockControls>
        {
          source.url && (
            <ToolbarGroup>
            <ToolbarButton
              icon="edit"
              iconSize="25"
              title="Edit Custom Image"
              onClick={()=>setAttributes({image : updateData(image,'','source','url')})}
            />
          </ToolbarGroup>
          )
        }
      </BlockControls>
      {/* for custom image */}
      {
        sourceType === 'custom' && source.url &&
          <>
            {/* image */}
            <PanelBody title={__("Image", "b-blocks")} initialOpen={false}>
              {/* select image source type*/}
              <div>
                <p className='sourceChild'>Source</p>
                <SelectControl
                  value={sourceType}
                  options={imgSrcOptions}
                  onChange={(v) => setAttributes({ image: updateData(image, v, 'sourceType') })}
                />
              </div>
              {/* image styles */}
              <div>
                <p className='stlChild'>Styles</p>
                <SelectControl
                  value={optionType}
                  options={imgStyleOptions}
                  help={optionType === 'Circle' || optionType === 'Rhombus' || optionType === 'Octagon' || optionType === 'Triangle' ? `Please Use Equal "Height" & "Width" For Perfect ${optionType} Shape.` : ''}
                  onChange={(v) => setAttributes({ style: updateData(style, v, 'optionType') })}
                />
              </div>
              {/* image size */}
              <div>
                <p className='imgSizeChild'>Image Size</p>
                <SelectControl
                  value={layout.size}
                  options={imgSizes}
                  onChange={(val) => setAttributes({ layout: updateData(layout, val, "size") })}
                />
              </div>
               {/* Width */}
          <div className="bPlPanelBody">
            <div className='customWidth'>
              <p className='widthChild'>Width</p>
              <PanelRow>
                <Device />
              </PanelRow>
            </div>
            <UnitControl
              value={layout.width[device]}
              onChange={(v) => setAttributes({ layout: updateData(layout, v, 'width', device) })}
            />
          </div>
              {/* auto height */}
              <div style={{ marginTop: "20px" }}>

                <ToggleControl
                  checked={isAutoHeight}
                  label="Auto Height"
                  onChange={(v) => setAttributes({ layout: updateData(layout, v, 'isAutoHeight') })}
                />
                {/* If auto height false */}
                {
                  !isAutoHeight && (
                    <div style={{ marginTop: "-25px" }} className="bPlPanelBody">
                      <div className='customHeight'>
                        <p className='heightChild'>Height</p>
                        <PanelRow>
                          <Device />
                        </PanelRow>
                      </div>
                      <UnitControl
                        value={height[device]}
                        onChange={(v) => setAttributes({ layout: updateData(layout, v, 'height', device) })}
                      />
                    </div>
                  )
                }
                <div style={{ marginTop: isAutoHeight ? "-15px" : "10px" }}>
                  <ToggleControl
                    checked={isAutoFit}
                    label="Auto Fit Image"
                    onChange={(v) => setAttributes({ layout: updateData(layout, v, 'isAutoFit') })}
                  />
                </div>
              </div>
              {/* image fit */}
              <div>
                {
                  isAutoFit && (
                    <div>
                      <p className='fitImgChild'>Image Fit Options</p>
                      <SelectControl
                        value={fitOptionType}
                        options={imgFitOptions}
                        onChange={(v) => setAttributes({ layout: updateData(layout, v, 'fitOptionType') })}
                      />
                    </div>
                  )
                }
                
              <div>
                <p className='enableLinkChild'>Link</p>
                <TextControl
                  label=""
                  placeholder="https://example.com"
                  help="If you want to link the image, please enter the URL of the image."
                  value={link.url}
                  onChange={(v) => setAttributes({ image: updateData(image, v, 'link', 'url') })}
                />
                <div style={{ marginTop: "-15px" }}>
                  <ToggleControl
                    checked={enableNewTab}
                    label="Open in New Tab"
                    onChange={(v) => setAttributes({ layout: updateData(layout, v, 'enableNewTab') })}
                  />
                </div>
              </div>
                   
              </div>
              {/* image hover effect */}
              <div>
                <p className='hoverEffectChild'>Hover Effect</p>
                <SelectControl
                  value={hoverEffect}
                  options={hoverEffectOptions}
                  onChange={(v) => setAttributes({ style: updateData(style, v, 'hoverEffect') })}
                />

              </div>
            </PanelBody>
            {/* caption */}
            <PanelBody className="bPlPanelBody" title={__("Caption", "b-blocks")} initialOpen={false}>
              <ToggleControl
                checked={enabled}
                label="Display Caption"
                onChange={(v) => setAttributes({ caption: updateData(caption, v, 'enabled') })}
              />
            </PanelBody>
          </>
      }
      {/* for featured image */}
      {
        sourceType === 'featured' && (
          <PanelBody title={__("Image", "b-blocks")} initialOpen={false}>
              {/* select image source type*/}
              <div>
                <p className='sourceChild'>Source</p>
                <SelectControl
                  value={sourceType}
                  options={imgSrcOptions}
                  onChange={(v) => setAttributes({ image: updateData(image, v, 'sourceType') })}
                />
              </div>
            {/* image styles */}
            <div>
              <p className='stlChild'>Styles</p>
              <SelectControl
                value={optionType}
                options={imgStyleOptions}
                help={optionType === 'Circle' || optionType === 'Rhombus' || optionType === 'Octagon' || optionType === 'Triangle' ? `Please Use Equal "Height" & "Width" For Perfect ${optionType} Shape.` : ''}
                onChange={(v) => setAttributes({ style: updateData(style, v, 'optionType') })}
              />
            </div>
            {/* image size */}
            <div>
              <p className='imgSizeChild'>Image Size</p>
              <SelectControl
                value={layout.size}
                options={imgSizes}
                onChange={(val) => setAttributes({ layout: updateData(layout, val, "size") })}
              />
            </div>
             {/* Width */}
          <div className="bPlPanelBody">
            <div className='customWidth'>
              <p className='widthChild'>Width</p>
              <PanelRow>
                <Device />
              </PanelRow>
            </div>
            <UnitControl
              value={layout.width[device]}
              onChange={(v) => setAttributes({ layout: updateData(layout, v, 'width', device) })}
            />
          </div>
            {/* auto height */}
            <div style={{ marginTop: "20px" }}>

              <ToggleControl
                checked={isAutoHeight}
                label="Auto Height"
                onChange={(v) => setAttributes({ layout: updateData(layout, v, 'isAutoHeight') })}
              />
              {/* If auto height false */}
              {
                !isAutoHeight && (
                  <div style={{ marginTop: "-25px" }} className="bPlPanelBody">
                    <div className='customHeight'>
                      <p className='heightChild'>Height</p>
                      <PanelRow>
                        <Device />
                      </PanelRow>
                    </div>
                    <UnitControl
                      value={height[device]}
                      onChange={(v) => setAttributes({ layout: updateData(layout, v, 'height', device) })}
                    />
                  </div>
                )
              }
              <div style={{ marginTop: isAutoHeight ? "-15px" : "10px" }}>
                <ToggleControl
                  checked={isAutoFit}
                  label="Auto Fit Image"
                  onChange={(v) => setAttributes({ layout: updateData(layout, v, 'isAutoFit') })}
                />
              </div>
            </div>
            {/* image fit */}
            <div>
              {
                isAutoFit && (
                  <div>
                    <p className='fitImgChild'>Image Fit Options</p>
                    <SelectControl
                      value={fitOptionType}
                      options={imgFitOptions}
                      onChange={(v) => setAttributes({ layout: updateData(layout, v, 'fitOptionType') })}
                    />
                  </div>
                )
              }
                <div>
                <p className='enableLinkChild'>Link</p>
                <TextControl
                  label=""
                  help="If you want to link the image, please enter the URL of the image."
                  value={link.url}
                  onChange={(v) => setAttributes({ image: updateData(image, v, 'link', 'url') })}
                />
                <div style={{ marginTop: "-15px" }}>
                  <ToggleControl
                    checked={enableNewTab}
                    label="Open in New Tab"
                    onChange={(v) => setAttributes({ layout: updateData(layout, v, 'enableNewTab') })}
                  />
                </div>
              </div>
            </div>
            {/* image hover effect */}
            <div>
              <p className='hoverEffectChild'>Hover Effect</p>
              <SelectControl
                value={hoverEffect}
                options={hoverEffectOptions}
                onChange={(v) => setAttributes({ style: updateData(style, v, 'hoverEffect') })}
              />

            </div>
          </PanelBody>
        )
      }
    </>
  );
};

export default General;
import { BlockControls } from "@wordpress/block-editor";
import { PanelBody,PanelRow,SelectControl,ToolbarButton,ToolbarGroup} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { produce } from "immer";
import { BorderControl, ColorsControl,MultiShadowControl, Typography,} from "../../../../../../Components";
import { Device } from '../../../../../../Components/Device/Device';
import { RangeControl, __experimentalUnitControl as UnitControl } from "@wordpress/components";
import { updateData } from "../../../../utils/functions";
import { imgAlignOptions } from "../../../../utils/options";
import { BBoxControl } from "../../../BBoxControl/BBoxControl";
import { Tab } from "../../../Panel/Tab/Tab";

const Style = ({ attributes, setAttributes, device }) => {
  const { image, layout, style, captionStyle, caption } = attributes;
  const { sourceType, source } = image;
  const { alignment, selectBorder, border, selectShadow, shadow } = style;
  const { normal, hover } = border;
  const { typo, textAlign, horizontalAlign, verticalAlign, colors, width, margin, padding } = captionStyle;
 
  // update all align
  const updateAlign = (property, value) => {
    const newUpdateAlign = produce(captionStyle, (draft) => {
      draft[property] = value;
    });
    setAttributes({ captionStyle: newUpdateAlign });
  };
  // text align
  useEffect(() => {
    updateAlign("activeAlign", textAlign[device]);
  }, [textAlign, device]);
  // horizontal align
  useEffect(() => {
    updateAlign("activeHorizontalAlign", horizontalAlign[device]);
  }, [horizontalAlign, device]);

  useEffect(() => {
    updateAlign("activeVerticalAlign", verticalAlign[device]);
  }, [verticalAlign, device]);

  return (
    <>
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
      {/* image styles */}
      {sourceType === "custom" && source.url && (
        <PanelBody title={__("Image", "b-blocks")} initialOpen={false}>
          {/* image align */}
          <div style={{ marginTop: "12px" }}>
            <div className="imgAlign">
              <p className="alignChild"> Alignment</p>
              <PanelRow>
                <Device />
              </PanelRow>
            </div>
            <SelectControl
              value={alignment[device]}
              options={imgAlignOptions}
              onChange={(v) => setAttributes({ style: updateData(style, v, 'alignment', device) })}
            />
          </div>
          {/* border */}
          <div style={{ marginTop: "12px" }}>
            <p className="borChild">Border</p>
            <div
              style={{
                marginTop: "-5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  backgroundColor:
                    selectBorder === "normal" ? "#4527a4" : "#ccc",
                  color: selectBorder === "normal" ? "white" : undefined,
                  borderRadius: "0px",
                  width: "100%",
                  textAlign: "center",
                  padding: "5px 0px",
                  cursor: "pointer",
                  borderTopLeftRadius: "5px",
                }}
                onClick={() =>setAttributes({style:updateData(style,'normal','selectBorder')})}
              >
                Normal
              </p>
              <p
                style={{
                  backgroundColor:
                    selectBorder === "hover" ? "#4527a4" : "#ccc",
                  color: selectBorder === "hover" ? "white" : undefined,
                  borderRadius: "0px",
                  width: "100%",
                  textAlign: "center",
                  padding: "5px 0px",
                  cursor: "pointer",
                  borderTopRightRadius: "5px",
                }}
                onClick={() =>setAttributes({style:updateData(style,'hover','selectBorder')})}
              >
                Hover
              </p>
            </div>
            <div>
              {selectBorder === "hover" ? (
                <div style={{ marginTop: "-2px" }}>
                  <p style={{ marginBottom: "-28px" }}>
                    Border for Hover
                  </p>
                  <BorderControl
                    label=""
                    value={hover}
                    onChange={(val) => setAttributes({style:updateData(style,val,'border','hover')})}
                    defaults={{ radius: "0px" }}
                  />
                </div>
              ) : (
                <div style={{ marginTop: "-2px" }}>
                  <p style={{ marginBottom: "-28px" }}>
                    Border for Normal
                  </p>
                  <BorderControl
                    label=""
                    value={normal}
                    onChange={(val) => setAttributes({style:updateData(style,val,'border','normal')})}
                    defaults={{ radius: "0px" }}
                  />
                </div>
              )}
            </div>
          </div>
          {/* shadow */}
          <div className="my">
            <p className="shadChild">Shadow</p>
            <div
              style={{
                marginTop: "-2px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  backgroundColor:
                    selectShadow === "normal" ? "#4527a4" : "#ccc",
                  color: selectShadow === "normal" ? "white" : undefined,
                  borderRadius: "0px",
                  width: "100%",
                  textAlign: "center",
                  padding: "5px 0px",
                  cursor: "pointer",
                  borderTopLeftRadius: "5px",
                }}
                onClick={() =>setAttributes({style:updateData(style,'normal','selectShadow')})}
              >
                Normal
              </p>
              <p
                style={{
                  backgroundColor:
                    selectShadow === "hover" ? "#4527a4" : "#ccc",
                  color: selectShadow === "hover" ? "white" : undefined,
                  borderRadius: "0px",
                  width: "100%",
                  textAlign: "center",
                  padding: "5px 0px",
                  cursor: "pointer",
                  borderTopRightRadius: "5px",
                }}
                onClick={() =>setAttributes({style:updateData(style,'hover','selectShadow')})}
              >
                Hover
              </p>
            </div>
            <div>
              {selectShadow === "normal" ? (
                <div style={{ marginTop: "-2px" }}>
                  <p style={{ marginBottom: "-25px" }}>
                    Shadow for Normal
                  </p>
                  <MultiShadowControl
                    label=""
                    value={shadow.normal}
                    onChange={(val) =>setAttributes({style:updateData(style,val,'shadow','normal')})}
                    
                  />
                </div>
              ) : (
                <div style={{ marginTop: "-2px" }}>
                  <p style={{ marginBottom: "-25px" }}>
                    Shadow for Hover
                  </p>
                  <MultiShadowControl
                    label=""
                    value={shadow.hover}
                    onChange={(val) =>setAttributes({style:updateData(style,val,'shadow','hover')})}
                  />
                </div>
              )}
            </div>
          </div>
        </PanelBody>
      )}
      {/* image styles for featured */}
      {sourceType === "featured" && (
         <PanelBody title={__("Image", "b-blocks")} initialOpen={false}>
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
         {/* image align */}
         <div style={{ marginTop: "12px" }}>
           <div className="imgAlign">
             <p className="alignChild"> Alignment</p>
             <PanelRow>
               <Device />
             </PanelRow>
           </div>
           <SelectControl
             value={alignment[device]}
             options={imgAlignOptions}
             onChange={(v) => setAttributes({ style: updateData(style, v, 'alignment', device) })}
           />
         </div>
         {/* border */}
         <div style={{ marginTop: "12px" }}>
           <p className="borChild">Border</p>
           <div
             style={{
               marginTop: "-5px",
               display: "flex",
               justifyContent: "center",
             }}
           >
             <p
               style={{
                 backgroundColor:
                   selectBorder === "normal" ? "#4527a4" : "#ccc",
                 color: selectBorder === "normal" ? "white" : undefined,
                 borderRadius: "0px",
                 width: "100%",
                 textAlign: "center",
                 padding: "5px 0px",
                 cursor: "pointer",
                 borderTopLeftRadius: "5px",
               }}
               onClick={() =>setAttributes({style:updateData(style,'normal','selectBorder')})}
             >
               Normal
             </p>
             <p
               style={{
                 backgroundColor:
                   selectBorder === "hover" ? "#4527a4" : "#ccc",
                 color: selectBorder === "hover" ? "white" : undefined,
                 borderRadius: "0px",
                 width: "100%",
                 textAlign: "center",
                 padding: "5px 0px",
                 cursor: "pointer",
                 borderTopRightRadius: "5px",
               }}
               onClick={() =>setAttributes({style:updateData(style,'hover','selectBorder')})}
             >
               Hover
             </p>
           </div>
           <div>
             {selectBorder === "hover" ? (
               <div style={{ marginTop: "-2px" }}>
                 <p style={{ marginBottom: "-28px" }}>
                   Border for Hover
                 </p>
                 <BorderControl
                   label=""
                   value={hover}
                   onChange={(val) => setAttributes({style:updateData(style,val,'border','hover')})}
                   defaults={{ radius: "0px" }}
                 />
               </div>
             ) : (
               <div style={{ marginTop: "-2px" }}>
                 <p style={{ marginBottom: "-28px" }}>
                   Border for Normal
                 </p>
                 <BorderControl
                   label=""
                   value={normal}
                   onChange={(val) => setAttributes({style:updateData(style,val,'border','normal')})}
                   defaults={{ radius: "0px" }}
                 />
               </div>
             )}
           </div>
         </div>
         {/* shadow */}
         <div className="my">
           <p className="shadChild">Shadow</p>
           <div
             style={{
               marginTop: "-2px",
               display: "flex",
               justifyContent: "center",
             }}
           >
             <p
               style={{
                 backgroundColor:
                   selectShadow === "normal" ? "#4527a4" : "#ccc",
                 color: selectShadow === "normal" ? "white" : undefined,
                 borderRadius: "0px",
                 width: "100%",
                 textAlign: "center",
                 padding: "5px 0px",
                 cursor: "pointer",
                 borderTopLeftRadius: "5px",
               }}
               onClick={() =>setAttributes({style:updateData(style,'normal','selectShadow')})}
             >
               Normal
             </p>
             <p
               style={{
                 backgroundColor:
                   selectShadow === "hover" ? "#4527a4" : "#ccc",
                 color: selectShadow === "hover" ? "white" : undefined,
                 borderRadius: "0px",
                 width: "100%",
                 textAlign: "center",
                 padding: "5px 0px",
                 cursor: "pointer",
                 borderTopRightRadius: "5px",
               }}
               onClick={() =>setAttributes({style:updateData(style,'hover','selectShadow')})}
             >
               Hover
             </p>
           </div>
           <div>
             {selectShadow === "normal" ? (
               <div style={{ marginTop: "-2px" }}>
                 <p style={{ marginBottom: "-25px" }}>
                   Shadow for Normal
                 </p>
                 <MultiShadowControl
                   label=""
                   value={shadow.normal}
                   onChange={(val) =>setAttributes({style:updateData(style,val,'shadow','normal')})}
                   
                 />
               </div>
             ) : (
               <div style={{ marginTop: "-2px" }}>
                 <p style={{ marginBottom: "-25px" }}>
                   Shadow for Hover
                 </p>
                 <MultiShadowControl
                   label=""
                   value={shadow.hover}
                   onChange={(val) =>setAttributes({style:updateData(style,val,'shadow','hover')})}
                 />
               </div>
             )}
           </div>
         </div>
       </PanelBody>
      )}
      {/* caption styles */}
      {caption.enabled && sourceType === "custom" && (
        <PanelBody
          title={__("Caption", "b-blocks")}
          initialOpen={false}
        >
          <div>

            {/* color and background */}
            <div className="colorsPar">
              <p className="colorsChild">Colors</p>
              <ColorsControl
                label=""
                value={colors}
                onChange={(val) => setAttributes({ captionStyle: updateData(captionStyle, val, 'colors') })}
                defaults={{ color: "black", bg: "#EEEEEE" }}
              />
            </div>
            {/* Width */}
            <div className="my">
              <div className="customWidth">
                <p className="widthChild">Width</p>
                <PanelRow>
                  <Device />
                </PanelRow>
              </div>
              <RangeControl
                value={width[device]}
                allowReset
                onChange={(v) => setAttributes({ captionStyle: updateData(captionStyle, v, 'width', device) })}
                min={1}
                max={300}
              />
            </div>

            {/* typography */}
            <div className="my typo">
              <p className="typoChild">Typography</p>
              <Typography
                label=""
                value={typo}
                onChange={(v) => setAttributes({ captionStyle: updateData(captionStyle, v, 'typo') })}
                defaults={{ fontSize: 13 }}
              />
            </div>
            {/* text align */}
            <div className="my">
              <div className="customTextAlign">
                <p className="textAlignChild">Text Align</p>
                <PanelRow>
                  <Device />
                </PanelRow>
              </div>
              <Tab options={["left", "right", "center", "justify"]} value={textAlign[device]} onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "textAlign", device) })} />

            </div>
            {/* horizontal align */}
            <div className="my">
              <div className="customTextAlign">
                <p className="textAlignChild">Horizontal Align</p>
                <PanelRow>
                  <Device />
                </PanelRow>
              </div>
              <Tab options={["start", "center", "end"]} value={horizontalAlign[device]}
                onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "horizontalAlign", device) })} />

            </div>
            {/* vertical align */}
            <div className="my">
              <div className="customTextAlign">
                <p className="textAlignChild">Vertical Align</p>
                <PanelRow>
                  <Device />
                </PanelRow>
              </div>
              <Tab options={["top", "middle", "bottom"]} value={verticalAlign[device]}
                onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "verticalAlign", device) })}
              />

            </div>
            {/* margin */}
            <div className="my">
              <div className="margin">
                <p className="marChild">Margin</p>
                <PanelRow>
                  <Device />
                </PanelRow>
              </div>
              <BBoxControl
                label=""
                values={margin[device]}
                onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "margin", device) })}
              ></BBoxControl>
            </div>
            {/* padding */}
            <div className="my">
              <div className="padding">
                <p className="padChild">Padding</p>
                <PanelRow>
                  <Device />
                </PanelRow>
              </div>
              <BBoxControl
                label=""
                values={padding[device]}
                onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "padding", device) })}
              ></BBoxControl>
            </div>
          </div>
        </PanelBody>
      )}
    </>
  );
};

export default Style;

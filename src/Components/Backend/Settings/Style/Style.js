import { BlockControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, SelectControl, ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { produce } from "immer";
import { BorderControl, ColorsControl, Label, MultiShadowControl, Typography, } from "../../../../../../Components";
import { Device } from '../../../../../../Components/Device/Device';
import { RangeControl } from "@wordpress/components";
import { updateData } from "../../../../utils/functions";
import { imgAlignOptions } from "../../../../utils/options";
import { BBoxControl } from "../../../BBoxControl/BBoxControl";
import { Tab } from "../../../Panel/Tab/Tab";

const Style = ({ attributes, setAttributes, device }) => {
  const { image, style, captionStyle, caption } = attributes;
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
                title={__('Edit Custom Image', 'b-blocks')}
                onClick={() => setAttributes({ image: updateData(image, '', 'source', 'url') })}
              />
            </ToolbarGroup>
          )
        }
      </BlockControls>

      <PanelBody title={__("Image", "b-blocks")}>
        <PanelRow>
          <Label>{__('Alignment', 'b-blocks')}</Label>
          <Device />
        </PanelRow>
        <SelectControl
          value={alignment[device]}
          options={imgAlignOptions}
          onChange={(v) => setAttributes({ style: updateData(style, v, 'alignment', device) })}
        />

        <p>Border</p>
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
            onClick={() => setAttributes({ style: updateData(style, 'normal', 'selectBorder') })}
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
            onClick={() => setAttributes({ style: updateData(style, 'hover', 'selectBorder') })}
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
                onChange={(val) => setAttributes({ style: updateData(style, val, 'border', 'hover') })}
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
                onChange={(val) => setAttributes({ style: updateData(style, val, 'border', 'normal') })}
                defaults={{ radius: "0px" }}
              />
            </div>
          )}
        </div>

        <p className='mt5'>Shadow</p>
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
            onClick={() => setAttributes({ style: updateData(style, 'normal', 'selectShadow') })}
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
            onClick={() => setAttributes({ style: updateData(style, 'hover', 'selectShadow') })}
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
                onChange={(val) => setAttributes({ style: updateData(style, val, 'shadow', 'normal') })}

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
                onChange={(val) => setAttributes({ style: updateData(style, val, 'shadow', 'hover') })}
              />
            </div>
          )}
        </div>

      </PanelBody>

      {caption.enabled && sourceType === "custom" && (
        <PanelBody
          title={__("Caption", "b-blocks")}
          initialOpen={false}
        >
          <ColorsControl
            label={__('Colors', 'b-blocks')}
            value={colors}
            onChange={(val) => setAttributes({ captionStyle: updateData(captionStyle, val, 'colors') })}
            defaults={{ color: "black", bg: "#EEEEEE" }}
          />
          <PanelRow>
            <Label>{__('Width', 'b-blocks')}</Label>
            <Device />
          </PanelRow>
          <RangeControl
            value={width[device]}
            allowReset
            onChange={(v) => setAttributes({ captionStyle: updateData(captionStyle, v, 'width', device) })}
            min={1}
            max={300}
          />

          <Typography
            label={__('Typography', 'b-blocks')}
            value={typo}
            onChange={(v) => setAttributes({ captionStyle: updateData(captionStyle, v, 'typo') })}
            defaults={{ fontSize: 13 }}
          />
          <PanelRow>
            <Label>{__('Text Align', 'b-blocks')}</Label>
            <Device />
          </PanelRow>
          <Tab options={["left", "right", "center", "justify"]} value={textAlign[device]} onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "textAlign", device) })} />

          <PanelRow>
            <Label>{__('Horizontal Align', 'b-blocks')}</Label>
            <Device />
          </PanelRow>
          <Tab options={["start", "center", "end"]} value={horizontalAlign[device]}
            onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "horizontalAlign", device) })} />

          <PanelRow>
            <Label>{__('Vertical Align', 'b-blocks')}</Label>
            <Device />
          </PanelRow>
          <Tab options={["top", "middle", "bottom"]} value={verticalAlign[device]}
            onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "verticalAlign", device) })}
          />

          <PanelRow>
            <Label>{__('Margin', 'b-blocks')}</Label>
            <Device />
          </PanelRow>
          <BBoxControl
            label=""
            values={margin[device]}
            onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "margin", device) })}
          ></BBoxControl>


          <PanelRow>
            <Label>{__('Padding', 'b-blocks')}</Label>
            <Device />
          </PanelRow>
          <BBoxControl
            label=""
            values={padding[device]}
            onChange={val => setAttributes({ captionStyle: updateData(captionStyle, val, "padding", device) })}
          ></BBoxControl>

        </PanelBody>
      )}
    </>
  );
};

export default Style;

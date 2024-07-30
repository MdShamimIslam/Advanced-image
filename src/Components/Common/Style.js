import { getBorderCSS, getBoxCSS, getColorsCSS, getMultiShadowCSS, getTypoCSS } from '../../../../Components/utils/getCSS';

const Style = ({ attributes, id, device = 'desktop' }) => {
    const { layout, style, captionStyle, image } = attributes;
    const { width, height, isAutoHeight, isAutoFit, fitOptionType } = layout;
    const { hoverEffect, optionType, alignment, border, shadow } = style;
    const { typo, textAlign, horizontalAlign, colors, verticalAlign, width: capWidth, margin, padding } = captionStyle;
    // classes
    const imageSl = `#${id} .bBlocksAdvancedImage`;
    const customSl = `${imageSl} .customImage`;
    const featuredSl = `${imageSl} .featuredImage`;
    const captionSl = `${customSl} .caption`;


    return <style dangerouslySetInnerHTML={{
        __html: `

        ${getTypoCSS('', typo)?.googleFontLink}
        ${getTypoCSS(captionSl, typo)?.styles}

        ${customSl}, ${featuredSl}{
            width : ${image.source?.url ? width[device] : '100%'};
            height: ${isAutoHeight ? 'auto' : height[device]};
        }
      
        ${imageSl}{
			align-items:${alignment[device]};
            ${getBorderCSS(border.normal)}
            box-shadow: ${getMultiShadowCSS(shadow.normal)};
        }

        ${imageSl}:hover{
            ${getBorderCSS(border.hover)}
            box-shadow: ${getMultiShadowCSS(shadow.hover)};
        }

        ${imageSl} img{
            filter:${hoverEffect === 'blur' ? 'blur(3px)' : 'blur(0px)'};
            border-radius: ${optionType === 'rounded' ? border.normal.radius : optionType === 'square' ? '0px' : (optionType === 'Circle' ? '100%' : border.normal.radius)};
            clip-path :${optionType === 'Triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                optionType === 'Rhombus' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                    optionType === 'Octagon' ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' :
                        optionType === 'square' ? 'inset(0%)' : ''};
            ${isAutoFit ?
                `object-fit: ${fitOptionType};` :
                `object-fit: ${optionType === 'Triangle' || optionType === 'Octagon' || optionType === 'Rhombus' ? 'cover' : ''}`
            }
        }
        ${imageSl}:hover img{
            transform: ${hoverEffect === 'zoomIn' ? 'scaleX(1.3)' : hoverEffect === 'zoomOut' ? 'scaleX(0.7)' : ''};
            filter : ${hoverEffect === 'blur' && 'blur(0px)'};
        }

        ${captionSl}{
            width: ${capWidth[device] ? `${capWidth[device]}px` : '100%'};
            text-align:${textAlign[device]};
            ${getColorsCSS(colors)}
            padding: ${getBoxCSS(padding[device])};
            margin: ${getBoxCSS(margin[device])};
            ${captionAlignment(verticalAlign, horizontalAlign, device)}
        }

        @media only screen and (min-width:641px) and (max-width: 1024px){
			${imageSl}{
				align-items:${alignment.tablet};
			}

			${customSl},${featuredSl}{
                width : ${image.source?.url ? width.tablet : '100%'};
                height: ${isAutoHeight ? 'auto' : height.tablet};
            }

            ${captionSl}{
                width: ${capWidth.tablet ? `${capWidth.tablet}px` : '100%'};
                text-align:${textAlign.tablet};
                padding: ${getBoxCSS(padding.tablet)};
                margin: ${getBoxCSS(margin.tablet)};
                ${captionAlignment(verticalAlign, horizontalAlign, 'tablet')}
            }
        }
        @media only screen and (max-width:640px){
			${imageSl}{
				align-items:${alignment.mobile};
			}

			${customSl},${featuredSl}{
                width : ${image.source?.url ? width.mobile : '100%'};
                height: ${isAutoHeight ? 'auto' : height.mobile};
            }

            ${captionSl}{
                width: ${capWidth.mobile ? `${capWidth.mobile}px` : '100%'};
                text-align:${textAlign.mobile};
                padding: ${getBoxCSS(padding.mobile)};
                margin: ${getBoxCSS(margin.mobile)};
                ${captionAlignment(verticalAlign, horizontalAlign, 'mobile')}
            }
        }
    `}} />
}
export default Style;

const captionAlignment = (verticalAlign, horizontalAlign, device) => {
    return `
    ${horizontalAlign[device] === "start" ? 'left: 0; right: auto;' : ''}
    ${horizontalAlign[device] === "center" ? 'left: 50%; right: auto; transform: translateX(-50%);' : ''}
    ${horizontalAlign[device] === "end" ? 'right: 0; left: auto;' : ''}
    ${verticalAlign[device] === "top" ? 'top: 0; bottom: auto;' : ''}
    ${verticalAlign[device] === "middle" ? 'top: 50%; bottom: auto; transform: translateY(-50%);' : ''}
    ${verticalAlign[device] === "bottom" ? 'bottom: 0; top: auto;' : ''}
    ${horizontalAlign[device] === "center" ? verticalAlign[device] === "middle" ? "top: 50%; right: auto; bottom: auto; left: 50%; transform: translate(-50%, -50%);" : "" : ""}
  `
}
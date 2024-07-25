
import React from 'react';
import { BplMediaPlaceholder } from '../../../../Components';
import { updateData } from '../../utils/functions';
import { RichText } from '@wordpress/block-editor';

const Image = ({ attributes, setAttributes, featureMediaURL }) => {
    const {image,caption,layout} = attributes;
    const { sourceType, source,link } = image;
    const { enabled, text } = caption;

    return (
        <>
            {'custom' === sourceType ? (
                <div className='customImage'>
                    {source.url ? (
                        <>
                        <img 
                        src={source.url} alt={source.alt || source.title}
                        onClick={() => link.url ? window.open(`${link.url}`, layout.enableNewTab ? '_blank' : '_self') : {}}
                         />
                        {enabled && (
                            <div className="caption">
                              <RichText
                                tagName="p"
                                value={text}
                                onChange={(v) => setAttributes({ caption: updateData(caption, v, 'text') })}
                                placeholder="Add Caption..."
                              />
                            </div>
                          )}
                        </>
                    ) : (
                        <BplMediaPlaceholder
                            label='Custom Image'
                            onChange={({ id, url, alt, title }) => setAttributes({ image: { ...image, source: { id, url, alt, title } } })}
                        />
                    )}
                </div>
            ) : (
                <div className='featuredImage'>
                    {featureMediaURL ? (
                        <img 
                        src={featureMediaURL} alt="Feature-image"
                        onClick={() => link.url ? window.open(`${link.url}`, layout.enableNewTab ? '_blank' : '_self') : {}}
                         />
                    ) : (
                        <div className='featureImageNotFound'>
                            <h3>Warning !!!</h3>
                            <p>Seems like you have not added a Featured Image for this post. Please make sure to add a Featured Image and try again.</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Image;

import React from 'react'

const AdvancedImage = ({ attributes,  featuredImageURL }) => {
  const { image, caption, layout } = attributes;
  const { sourceType, source, link } = image;
  const { enabled, text } = caption;

  return <div className='bBlocksAdvancedImage'>
    {'custom' === sourceType ? (
      <div className='customImage'>
        {source.url &&
          <>
            <img
              src={source.url} alt={source.alt || source.title}
              onClick={() => link.url ? window.open(`${link.url}`, layout.enableNewTab ? '_blank' : '_self') : {}}
            />
            {enabled && (
              <div className="caption">
                <p
                  dangerouslySetInnerHTML={{ __html: `${text}` }}
                  placeholder="Add Caption..."
                />
              </div>
            )}
          </>
        }
      </div>
    ) : (
      <div className='featuredImage'>
        {featuredImageURL && (
          <img
            src={featuredImageURL} alt="Feature-image"
            onClick={() => link.url ? window.open(`${link.url}`, layout.enableNewTab ? '_blank' : '_self') : {}}
          />
        )}
      </div>
    )}
  </div>
}

export default AdvancedImage;
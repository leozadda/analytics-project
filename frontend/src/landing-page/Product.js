import React from 'react'

// This component creates a customizable product card
const Product = ({


  //Card properties
  backgroundStyle,
  // Image properties
  imageUrl,
  imageSize,
  altText,

  // Product title properties
  titleText,
  titleStyle,

  // Product description properties
  description, 
  descriptionStyle,

  // Product price properties
  price,
  priceStyle,

  // Additional product information
  additionalInfo,
  additionalInfoColor,

  // Button properties
  buttonLabel,
  buttonColor,
  buttonHoverColor,
}) => {
  return (
    // Responsive grid layout: single column on mobile, two columns on larger screens
    <div componentDataID="Product Details" className={`grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden mb-8 ${backgroundStyle}`}>
      {/* Responsive image size */}
      <img className={`w-full h-auto object-cover ${imageSize}`} src={imageUrl} alt={altText}/>
      <div className="p-4">
        <h3 className={titleStyle}>{titleText}</h3>
        <p className={`${descriptionStyle}`}>{description}</p>
        {/* Responsive layout for price and button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
          <span className={`${priceStyle} mb-2 sm:mb-0`}>{price}</span>
          <button className={`rounded-full py-2 px-4 font-bold hover:${buttonHoverColor} ${buttonColor}`}>
            {buttonLabel}
          </button>
        </div>
        <div className="mt-4">
          {additionalInfo.map((item) => (
            // Responsive text size for additional info
            <p key={item.label} className={`${additionalInfoColor} text-sm sm:text-base`}>
              <span className="font-bold">{item.label}</span> {item.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product;
import React from 'react'

// This component creates a customizable logo with optional subtext
const BrandName = ({ 
  textColor, // Color of the main logo text
  textSize,
  fontStyle, // Font style for the logo
  logo, // The main logo text
  subText, // Optional subtext below the logo
  subTextColor, // Color of the subtext
  subTextFontSize, // Font size of the subtext
}) => {
  return (
    <div componentDataID="Name of Brand" className={`flex flex-col items-center gap-2 text-xl ${fontStyle}`}>
      {/* Display subtext if provided */}
      {subText && (
        <span className={`${subTextColor} ${subTextFontSize}`}>{subText}</span>
      )}
      {/* Display main logo text */}
      <div className={`flex flex-row gap-1 ${textSize}`}>
        <span className={textColor}>{logo.toUpperCase().split(' ')[0]}</span>
        <span className={textColor}>{logo.toUpperCase().split(' ')[1]}</span>
      </div>
    </div>
  )
}

export default BrandName;

/*
EXAMPLE USE:

<DecafLogo 
  logo="Rethink Your Coffee" 
  subText="Freshly Roasted Beans" 
  subTextColor="text-green-500"
/>
*/
import React from 'react'

// This component creates a grid of product information items
const ProductInfo = ({
  // Grid items
  gridItems
}) => {
  return (
    // Responsive grid layout: 1 column on mobile, 2 on tablet, 3 on desktop
    <div componentDataID="Product Benefits" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-16 sm:my-24 md:my-36 max-w-[90vw] sm:max-w-[80vw]">
      {gridItems.map((item) => (
        // Responsive padding and text sizes
        <div key={item.title} className={`p-6 sm:p-8 md:p-12 rounded-lg overflow-hidden flex flex-wrap justify-center text-center ${item.backgroundColor}`}>
          <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4" />
          <h3 className={`${item.textStyle} font-bold text-lg sm:text-xl md:text-2xl mb-2`}>{item.title}</h3>
          <p className="text-sm sm:text-base">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductInfo;
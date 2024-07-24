import React from 'react'

// This component creates a product review card
const ProductReviews = ({
  backgroundStyle,
  // Reviewer properties
  reviewerName,
  reviewerNameStyle,
  reviewerImage,
  reviewerTitle,

  // Review properties
  reviewText,
  reviewRating, // Out of 5 stars

  // Star rating properties
  starStyle,
}) => {
  const starArray = [...Array(reviewRating)]; // Create an array of length reviewRating

  return (
    <div className={`flex flex-wrap justify-center ${backgroundStyle}`}>
      <div className="flex items-center mb-2">
        <img className="w-10 h-10 rounded-lg mr-4" src={reviewerImage} alt={reviewerName} />
        <div>
          <h4 className={`${reviewerNameStyle}`}>{reviewerName}</h4>
          <p className="text-gray-600">{reviewerTitle}</p>
        </div>
      </div>
      <p className="text-gray-800">{reviewText}</p>
      <div className="flex items-center">
        {starArray.map((_, index) => (
          <span key={index} className={`mr-1 ${starStyle}`}>★</span>
        ))}
      </div>
    </div>
  )
}

export default ProductReviews;
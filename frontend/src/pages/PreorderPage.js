// PreorderPage.js
import React from 'react';
import BrandName from '../landing-page/BrandName';
import Product from '../landing-page/Product';
import ProductInfo from '../landing-page/ProductInfo';
import ProductReviews from '../landing-page/ProductReviews';
import Waitlist from '../landing-page/Waitlist';
import { usePageInteractions } from '../analytics/track-page-data';

export default function PreorderPage() {
  usePageInteractions(); // Call page interactions function

  return (
    // Use responsive padding and full width container
    <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center">
      {/* Header Section */}
      <header className="text-center my-8 sm:my-16 md:my-24 p-3 w-full">
        {/* Responsive margins for better spacing on mobile */}
        <p className="text-zinc-400 line-through mb-4 sm:mb-8 md:mb-12">Decaf is bad coffee for weak people</p>
        <br></br>
        <BrandName
          logo="Dethink Decaf" 
          textColor="text-zinc-800" 
          fontStyle="font-bold font-fugaz-one" 
          // Responsive text size
          textSize="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem]"
        />
      </header>

      {/* Product Section */}
      <Product
        // Responsive padding and max-width
        backgroundStyle="bg-orange-100 rounded-lg p-4 sm:p-6 md:p-8 mt-8 sm:mt-12 w-full max-w-[90vw] sm:max-w-[80vw] font-Urbanist"
        imageUrl="https://www.wimpdecaf.com/cdn/shop/files/Coltrane_2400x.png?v=1719424036"
        // Responsive image size
        imageSize="max-w-full sm:max-w-[320px]"
        titleText="Classic"
        // Responsive title style
        titleStyle="text-2xl sm:text-3xl md:text-4xl font-bold pb-2 sm:pb-4 zinc-800 font-outfit"
        description="A smooth medium roast decaf with a rich blend of rooibos, cooked apple, and brown sugar. It's a medium roast from smallholder farmers in Cauca, Caldes, and Tolima, Colombia. John Coltrane, the Jazz musician, had some addiction in his life and published 3 while redefining jazz, often practicing for hours alone in a closet. We're inspired by underdogs like him who break through against all odds. Big grateful hearts for mentors like this."
        // Responsive text size for description
        descriptionStyle="font-arial text-sm sm:text-base"
        price="$23"
        priceStyle="font-bold font-outfit"
        additionalInfo={[
          { label: 'WE TASTE:', value: 'Rooibos, Cooked Apple, Brown Sugar' },
          { label: 'PRODUCER:', value: 'Smallholder Farmers in Cauca Caldes & Tolima' },
          { label: 'PROCESS:', value: 'Washed - EA' },
          { label: 'ELEVATION:', value: '1400-1850 masl' },
          { label: 'REGION:', value: 'Cauca Caldes & Tolima' },
        ]}
      />

      {/* Product Info Section */}
      <ProductInfo 
        gridItems={[
          {
            title: 'Full range of taste',
            description: 'Decaf has sucked for too long. We will source the best decaf coffee beans and roast in ways that delight and refresh.',
            icon: 'https://www.wimpdecaf.com/cdn/shop/files/icon-mouth_2400x.svg?v=1719647666',
            textStyle: 'text-gray-800 font-outfit text-lg sm:text-xl md:text-2xl',
            backgroundColor: 'bg-orange-100',
          },
          {
            title: 'More decaf choices',
            description: 'We will banish the lack of variety in decaf because choosing a non-caffeinated drink shouldn\'t be a lower-tier experience.',
            icon: 'https://www.wimpdecaf.com/cdn/shop/files/icon-choices_2400x.svg?v=1719647666',
            textStyle: 'text-gray-800 font-outfit text-lg sm:text-xl md:text-2xl',
            backgroundColor: 'bg-orange-100',
          },
          {
            title: 'No bad chemicals',
            description: 'We love your body! It\'s the only one you have, so we pledge to never use Methylene Chloride from the decaffeination process.',
            icon: 'https://www.wimpdecaf.com/cdn/shop/files/icon-chemicals_2400x.svg?v=1719647115',
            textStyle: 'text-gray-800 font-outfit text-lg sm:text-xl md:text-2xl',
            backgroundColor: 'bg-orange-100',
          },
          {
            title: 'Transparent & honest',
            description: 'Honesty and transparency are things you show, not just say. We\'ll be open in ways that might be uncomfortable but always good.',
            icon: 'https://www.wimpdecaf.com/cdn/shop/files/icon-peace_2400x.svg?v=1719647666',
            textStyle: 'text-gray-800 font-outfit text-lg sm:text-xl md:text-2xl',
            backgroundColor: 'bg-orange-100',
          },
          {
            title: 'Mother lovers',
            description: 'We want positive environmental impact and we want your collaboration to shrink our negative footprint. Together is better.',
            icon: 'https://www.wimpdecaf.com/cdn/shop/files/icon-earth_2400x.svg?v=1719647666',
            textStyle: 'text-gray-800 font-outfit text-lg sm:text-xl md:text-2xl',
            backgroundColor: 'bg-orange-100',
          },
          {
            title: 'Have fun together',
            description: 'We\'re here to enjoy the ride and invite you to join in. Let\'s make this fucking enjoyable, stress-free, and downright fun.',
            icon: 'https://www.wimpdecaf.com/cdn/shop/files/icon-fun_2400x.svg?v=1719647666',
            textStyle: 'text-gray-800 font-outfit text-lg sm:text-xl md:text-2xl',
            backgroundColor: 'bg-orange-100',
          }
        ]}
      />

      {/* Product Reviews Section */}
      {/* Responsive grid layout */}
      <div componentDataID="Product Reviews" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16 sm:mb-24 md:mb-36 gap-3 max-w-[90vw] sm:max-w-[80vw] font-Urbanist">
        <ProductReviews 
          // Responsive padding
          backgroundStyle="rounded-lg bg-orange-100 m-1 text-center py-12 sm:py-16 md:py-24 px-3"
          reviewerImage="https://www.wimpdecaf.com/cdn/shop/files/CleanShot_2024-07-05_at_21.44.59_2x_6b25a8b0-a455-457f-96d6-a4aa6601d908_2400x.png?v=1720230316"
          reviewerName="Sonci Carey"
          // Responsive text size
          reviewerNameStyle="font-outfit text-xl sm:text-2xl font-bold"
          reviewText="Woot woot! Can't wait to get to totally decaffeinated coffee!"
          reviewRating={5}
          // Responsive star size
          starStyle="text-orange-500 text-2xl sm:text-3xl mt-4 sm:mt-6"
        />
        <ProductReviews 
          backgroundStyle="rounded-lg bg-orange-100 m-1 text-center py-12 sm:py-16 md:py-24 px-3"
          reviewerImage="https://www.wimpdecaf.com/cdn/shop/files/Dad_2400x.png?v=1720043924"
          reviewerName="Stephen Wade"
          reviewerNameStyle="font-outfit text-xl sm:text-2xl font-bold"
          reviewText="I would love to have a coffee after noon, but that's never been an option. Sleep is too important. Decaf options suck, but not anymore. Wimp is changing things."
          reviewRating={5}
          starStyle="text-orange-500 text-2xl sm:text-3xl mt-4 sm:mt-6"
        />
        <ProductReviews 
          backgroundStyle="rounded-lg bg-orange-100 m-1 text-center py-12 sm:py-16 md:py-24 px-3"
          reviewerImage="https://www.wimpdecaf.com/cdn/shop/files/Ron2_2400x.png?v=1720043925"
          reviewerName="Ron Swanson"
          reviewerNameStyle="font-outfit text-xl sm:text-2xl font-bold"
          reviewText="Where the hell did my buzz go? Someone replaced my caffeine with lies. Put the buzz back or I will be forced to refer Wimp to management."
          reviewRating={1}
          starStyle="text-orange-500 text-2xl sm:text-3xl mt-4 sm:mt-6"
        />
      </div>

      {/* Waitlist Section */}
      <Waitlist  
        backgroundColor='bg-orange-100'
        // Responsive text style
        textStyle="text-slate-400 font-light text-sm sm:text-base"
        // Responsive timer style
        timerStyle="text-black font-bold font-fugaz-one text-4xl sm:text-6xl md:text-8xl lg:text-[10em]"
        timerContainerClass="flex flex-wrap justify-center"
        timerValueClass="mx-1 sm:mx-2"
        launchDate={new Date('August 2026')}
        title="We're celebrating with 10% off for earlybirds when we launch in August."
        buttonText="JOIN THE WAITLIST"
        inputPlaceholder="Email address"
        buttonColor="bg-orange-600 text-white font-bold"
        buttonHoverColor="hover:bg-orange-300"
        inputBorderColor="border-gray-300"
        inputFocusColor="blue-500"
      />
    </div>
  );
}
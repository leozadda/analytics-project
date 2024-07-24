import React from 'react';
import FormPercentGraph from '../dashboard/FormPercentGraph';
import LocationDataGraph from '../dashboard/LocationDataGraph';
import NumberOfUsersGraph from '../dashboard/NumberOfUsersGraph';
import ScrollPercentGraph from '../dashboard/ScrollPercentGraph';

export function Dashboard() {
  return (
    // Container with responsive padding
    <div className="p-5 sm:p-6 md:p-8 bg-orange-100 w-screen">
      {/* Dashboard title */}
      <h1 className="text-3xl text-orange-600 text-center font-outfit font-bold mb-4 sm:mb-6 md:mb-8">Dashboard</h1>
      {/* Grid layout for graphs
          - Single column on small screens
          - Two columns on medium screens and above
          - Gap between grid items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Each div contains a graph component
            - Full width on small screens
            - Half width on medium screens and above
            - Responsive height using aspect ratio */}
        <div className="aspect-square md:aspect-[4/3] w-full"><FormPercentGraph /></div>
        <div className="aspect-square md:aspect-[4/3] w-full"><NumberOfUsersGraph /></div>
        <div className="aspect-square md:aspect-[4/3] w-full"><LocationDataGraph /></div>
        <div className="aspect-square md:aspect-[4/3] w-full"><ScrollPercentGraph /></div>
      </div>
    </div>
  );
}
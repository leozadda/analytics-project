import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const URL = process.env.REACT_APP_API_URL;

export default function ScrollPercentGraph() {
  // State to hold scroll data
  const [scrollData, setScrollData] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/get-page-data`);
        const data = await response.json();
        setScrollData(data);
      } catch (error) {
        console.error('Error fetching scroll data:', error);
      }
    };

    fetchData();
  }, []);

  // Process raw data into chart-friendly format
  const processData = (data) => {
    if (!data) return { labels: [], datasets: [] };

    const scrollPercentages = data.flatMap(item => 
      item.pageInteractions.map(interaction => interaction.percentPageScrolled)
    );

    const labels = ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'];
    const counts = new Array(10).fill(0);

    scrollPercentages.forEach(percent => {
      const index = Math.min(Math.floor(percent / 10), 9);
      counts[index]++;
    });

    return {
      labels,
      datasets: [{
        label: 'Number of users',
        data: counts,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    };
  };

  const chartData = processData(scrollData);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Page Scroll Depth',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    // Container with responsive padding and styling
    <div className="h-full p-2 sm:p-4 bg-white rounded-lg shadow-md">
      {scrollData ? (
        <Bar options={options} data={chartData} />
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}
    </div>
  );
}
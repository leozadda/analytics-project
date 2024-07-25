import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const URL = 'https://analytics-project-backend-git-main-leozaddas-projects.vercel.app/';

export default function NumberOfUsersGraph() {
  // State to hold user data
  const [userData, setUserData] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/all-user-data`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  // Process raw data into chart-friendly format
  const processData = (data) => {
    if (!data) return { labels: [], datasets: [] };

    const months = Object.keys(data);
    const userCounts = Object.values(data);

    return {
      labels: months,
      datasets: [{
        label: 'Number of users',
        data: userCounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(75, 192, 192)'
      }]
    };
  };

  const chartData = processData(userData);

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
        text: 'User Growth Over Time',
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
      {userData ? (
        <Line options={options} data={chartData} />
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}
    </div>
  );
}
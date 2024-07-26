import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const URL = 'https://analytics-project-nine.vercel.app';

export default function FormPercentGraph() {
  // State to hold form data
  const [formData, setFormData] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/all-form-data`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  // Process raw data into chart-friendly format
  const processData = (data) => {
    if (!data) return { labels: [], datasets: [] };

    const visited = data.filter(item => item.status === "Visited").length;
    const interacted = data.filter(item => item.status === "Interacted").length;
    const submitted = data.filter(item => item.status === "Submitted").length;

    return {
      labels: ['Visited', 'Interacted', 'Submitted'],
      datasets: [{
        data: [visited, interacted, submitted],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 205, 86, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)'
        ],
        borderWidth: 1
      }]
    };
  };

  const chartData = processData(formData);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Form Interaction Analysis',
        font: {
          size: 16
        }
      }
    }
  };

  return (
    // Container with responsive padding and styling
    <div className="h-full p-2 sm:p-4 bg-white rounded-lg shadow-md">
      {formData ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ScatterController, LinearScale, PointElement, Tooltip, Title } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-chart-geo';

ChartJS.register(ScatterController, LinearScale, PointElement, Tooltip, Title);

const GeoMap = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format');
      }

      const alertLocations = {};

      data.forEach(alert => {
        if (alert.src_ip) {
          const ip = alert.src_ip;
          alertLocations[ip] = (alertLocations[ip] || 0) + 1;
        }
      });

      const screenWidth = window.innerWidth;
      const bubbleSizeMultiplier = screenWidth < 600 ? 0.5 : 1;

      const geoData = Object.keys(alertLocations).map(ip => ({
        x: Math.random() * 360 - 180,
        y: Math.random() * 180 - 90,
        r: alertLocations[ip] * 2 * bubbleSizeMultiplier // Adjust the size of the bubbles
      }));

      setChartData({
        datasets: [{
          label: 'Alert Locations',
          data: geoData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      });
    } catch (err) {
      setError(err.message);
    }
  }, [data]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="relative" style={{ height: '60vh' }}>
        <Scatter data={chartData} options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Longitude'
              }
            },
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'Latitude'
              }
            }
          }
        }} />
      </div>
    </div>
  );
};

export default GeoMap;

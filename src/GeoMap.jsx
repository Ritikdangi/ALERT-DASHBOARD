import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BubbleController, LinearScale, PointElement, Tooltip, Title } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import 'chartjs-chart-geo';

ChartJS.register(BubbleController, LinearScale, PointElement, Tooltip, Title);

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

      const geoData = Object.keys(alertLocations).map(ip => ({
        x: Math.random() * 360 - 180,
        y: Math.random() * 180 - 90,
        r: alertLocations[ip]
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
   
      <div className="relative h-64 flex justify-center">
        <Bubble data={chartData} options={{
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            },
            y: {
              type: 'linear'
            }
          }
        }} />
      </div>
    </div>
  );
};

export default GeoMap;

import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import GeoMap from './GeoMap';

const Graphs = ({ data }) => {
  useEffect(() => {
    if (!data || !data.length) return;

    const categoryCount = {};
    const severityDistribution = {};
    const timeSeriesData = [];

    data.forEach(alert => {
      if (alert.alert && alert.alert.category) {
        const category = alert.alert.category;
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }

      if (alert.alert && alert.alert.severity) {
        const severity = alert.alert.severity;
        severityDistribution[severity] = (severityDistribution[severity] || 0) + 1;
      }

      if (alert.timestamp) {
        timeSeriesData.push({
          x: new Date(alert.timestamp),
          y: 1
        });
      }
    });

    renderCategoryChart(Object.keys(categoryCount), Object.values(categoryCount));
    renderSeverityChart(Object.keys(severityDistribution), Object.values(severityDistribution));
    renderTimeSeriesChart(timeSeriesData);

  }, [data]);

  const renderCategoryChart = (labels, data) => {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Category Count',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Categories'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Count'
            },
            beginAtZero: true
          }
        }
      }
    });
  };

  const renderSeverityChart = (labels, data) => {
    const ctx = document.getElementById('severityChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  };

  const renderTimeSeriesChart = (data) => {
    const ctx = document.getElementById('timeSeriesChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Alerts Over Time',
          data: data,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            },
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Count'
            },
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mt-8 mb-4 text-white">Graph 1: Count of Alerts by Category</h2>
      <div className="relative h-64 flex justify-center">
        <canvas id="categoryChart" className="w-full h-full"></canvas>
      </div>

      <h2 className="text-xl mt-8 mb-4 text-white">Graph 2: Distribution of Alerts by Severity</h2>
      <div className="relative h-64 flex justify-center">
        <canvas id="severityChart" className="w-full h-full"></canvas>
      </div>

      <h2 className="text-xl mt-8 mb-4 text-white">Graph 3: Alerts Over Time</h2>
      <div className="relative h-64 flex justify-center">
        <canvas id="timeSeriesChart" className="w-full h-full "></canvas>
      </div>

      <h2 className="text-xl mt-8 mb-4 text-white">Graph 4: Geographical Distribution of Alerts</h2>
      <GeoMap data={data} />
    </div>
  );
};

export default Graphs;

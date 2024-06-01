import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const Graphs = ({ data }) => {
  useEffect(() => {
    if (!data.length) return;

    const categoryCount = data.reduce((acc, curr) => {
      const category = curr.alert.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const severityDistribution = data.reduce((acc, curr) => {
      const severity = curr.alert.severity;
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {});

    const ctxCategory = document.getElementById('categoryChart');
    new Chart(ctxCategory, {
      type: 'bar',
      data: {
        labels: Object.keys(categoryCount),
        datasets: [{
          label: 'Count of Alerts by Category',
          data: Object.values(categoryCount),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
          y: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
      }
    });

    const ctxSeverity = document.getElementById('severityChart');
    new Chart(ctxSeverity, {
      type: 'pie',
      data: {
        labels: Object.keys(severityDistribution),
        datasets: [{
          label: 'Distribution of Alerts by Severity',
          data: Object.values(severityDistribution),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
      }
    });

    const timeSeriesData = data.map(alert => ({
      x: new Date(alert.timestamp),
      y: 1
    }));

    const ctxTimeSeries = document.getElementById('timeSeriesChart');
    new Chart(ctxTimeSeries, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Alerts Over Time',
          data: timeSeriesData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute'
            },
            title: {
              display: true,
              text: 'Time',
              color: 'rgba(255, 255, 255, 0.7)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Alerts',
              color: 'rgba(255, 255, 255, 0.7)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
      }
    });

  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-xl mt-8 mb-4 text-white">Graph 1: Count of Alerts by Category</h2>
      <div className="relative h-64">
        <canvas id="categoryChart"></canvas>
      </div>

      <h2 className="text-xl mt-8 mb-4 text-white">Graph 2: Distribution of Alerts by Severity</h2>
      <div className="relative h-64">
        <canvas id="severityChart"></canvas>
      </div>

      <h2 className="text-xl mt-8 mb-4 text-white">Graph 3: Alerts Over Time</h2>
      <div className="relative h-64">
        <canvas id="timeSeriesChart"></canvas>
      </div>
    </div>
  );
};

export default Graphs;

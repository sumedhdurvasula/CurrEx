import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import { CategoryScale, Chart } from "chart.js";

const LineChart = ({ csvFile }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvFile);
        const text = await response.text();

        // Parse CSV data
        const parsedData = Papa.parse(text, { header: true });
        
        // Prepare data for chart
        const labels = parsedData.data.map(item => item.year);
        const values1 = parsedData.data.map(item => parseFloat(item.ExchangeRate));
        const values2 = parsedData.data.map(item => parseFloat(item.PPP));

        const data = {
          labels: labels,
          datasets: [
            {
              label: 'Y1',
              data: values1,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Y2',
              data: values2,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }
          ]
        };

        setChartData(data);
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, [csvFile]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;

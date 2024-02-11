import React, { useState, useEffect } from 'react';
import './App.css';
import { Select, Space } from 'antd';
import CountrySelect from './countryInput';
import CountrySelect1 from './countryInput1';
import CalculateButton from './button';
import { SwapOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import japan from './w2560/jp.png';
import korea from './w2560/kr.png'
import uk from './w2560/gb.png'
import australia from './w2560/au.png';
import canada from './w2560/ca.png';
import switzerland from './w2560/ch.png';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Papa from 'papaparse';
import csvData from './australia_accuracy_dataset.csv'; 

function App() {
  const [chartData, setChartData] = useState({
    datasets: []
  });
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    Papa.parse(csvData, {
      header: true,
      download: true,
      dynamicTyping: true,
      delimiter: ",",
      complete: (result) => {
        const filteredData = result.data.filter(item => item.year && item.ActualExchangeRate && item.PredictedExchangeRate);
  
        const labels = filteredData.map(item => item.year);
        const exchangeRateData = filteredData.map(item => item.ActualExchangeRate);
        const pppData = filteredData.map(item => item.PredictedExchangeRate);
  
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Actual',
              data: exchangeRateData,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Predicted',
              data: pppData,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }
          ]
        });
  
        setChartOptions({
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Actual vs Predicted Currency Value',
              font: {
                size: 18,
              },
            },
          },
        });
      }
    });
  }, []);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleResult = (data) => {
    setApiResponse(data);
  };

  const flags = {
    japan: japan,
    korea: korea,
    uk: uk,
    australia: australia,
    canada: canada,
    switzerland: switzerland,
  }

  const prices = {
    japan: ['149.33', 'JPY'],
    uk: ['0.79', 'GBP'],
    australia: ['1.53', 'AUD'],
    canada: ['1.35', 'CAD'],
    switzerland: ['0.87', 'CHF'],
  }

  const swapCountries = () => {
    const temp = selectedCountry;
    setSelectedCountry(selectedCountry1);
    setSelectedCountry1(temp);
  };

  const clearCountries = () => {
    setSelectedCountry('');
    setSelectedCountry1('');
    setApiResponse('');
  };

  const getflagimage = () => {
    return flags[selectedCountry];
  };

  const getCurrentPrice= () => {
    if (prices[selectedCountry] != null && prices[selectedCountry1] != null) {
      return prices[selectedCountry][0]+" "+prices[selectedCountry][1] + " = " + "1 " + prices[selectedCountry1][1];
    }
    return 'NOT';
  };

  const getflagimage1 = () => {
    return flags[selectedCountry1];
  };

  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       label: 'My First dataset',
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //       data: [65, 59, 80, 81, 56, 55],
  //     }
  //   ],
  // };
  

  return (
    <div className="App">
      <h1>CurrEx</h1>
      <div className='inputs'>
        <CountrySelect  selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <Button type="primary" onClick={swapCountries} shape="circle" icon={<SwapOutlined />} />
        <CountrySelect1  selectedCountry1={selectedCountry1} setSelectedCountry1={setSelectedCountry1} />
        <Button type="primary" onClick={clearCountries} shape="circle" icon={<CloseOutlined />} />
        <CalculateButton id='calculate' selectedCountry={selectedCountry} onResult={handleResult} />
      </div>
      <div className='flags'>
        {apiResponse && (
          <div className='numbers'>
            <img src={getflagimage()} alt="Country flag" id='flag'/>
            <h3>{getCurrentPrice()}</h3>
            {/* <h2 id='percentage'>-1.34%</h2> */}
          </div>
        )}
        {apiResponse && (
          <div>
            <img src={getflagimage1()} alt="Country flag" id='flag'/>
          </div>
        )}
      </div>
      {apiResponse && (
        <div className='chartContainer'>
          {/* <Line data={data} /> */}
          <Line options = {chartOptions} data = {chartData}/>
        </div>
      )}
      {apiResponse && (

        <div className="apiResponseContainer">
        <h2>News Articles Used</h2>
          {apiResponse}
        </div>
      )}
    </div>
  );
}

export default App;

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
import switzerland from './ch.png';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Papa from 'papaparse';
import csvData from './australia_accuracy_dataset.csv';
import australia_canada_accuracy_dataset from './LineChartData/australia_canada_accuracy_dataset.csv';
import australia_japan_accuracy_dataset from './LineChartData/australia_japan_accuracy_dataset.csv';
import australia_switzerland_accuracy_dataset from './LineChartData/australia_switzerland_accuracy_dataset.csv';
import australia_united_kingdom_accuracy_dataset from './LineChartData/australia_united_kingdom_accuracy_dataset.csv';
import canada_japan_accuracy_dataset from './LineChartData/canada_japan_accuracy_dataset.csv';
import canada_switzerland_accuracy_dataset from './LineChartData/canada_switzerland_accuracy_dataset.csv';
import canada_united_kingdom_accuracy_dataset from './LineChartData/canada_united_kingdom_accuracy_dataset.csv';
import canada_australia_accuracy_dataset from './LineChartData/canada_australia_accuracy_dataset.csv';
import japan_australia_accuracy_dataset from './LineChartData/japan_australia_accuracy_dataset.csv';
import japan_canada_accuracy_dataset from './LineChartData/japan_canada_accuracy_dataset.csv';
import japan_switzerland_accuracy_dataset from './LineChartData/japan_switzerland_accuracy_dataset.csv';
import japan_united_kingdom_accuracy_dataset from './LineChartData/japan_united_kingdom_accuracy_dataset.csv';
import switzerland_australia_accuracy_dataset from './LineChartData/switzerland_australia_accuracy_dataset.csv';
import switzerland_canada_accuracy_dataset from './LineChartData/switzerland_canada_accuracy_dataset.csv';
import switzerland_japan_accuracy_dataset from './LineChartData/switzerland_japan_accuracy_dataset.csv';
import switzerland_united_kingdom_accuracy_dataset from './LineChartData/switzerland_united_kingdom_accuracy_dataset.csv';
import united_kingdom_australia_accuracy_dataset from './LineChartData/united_kingdom_australia_accuracy_dataset.csv';
import united_kingdom_canada_accuracy_dataset from './LineChartData/united_kingdom_canada_accuracy_dataset.csv';
import united_kingdom_japan_accuracy_dataset from './LineChartData/united_kingdom_japan_accuracy_dataset.csv';
import united_kingdom_switzerland_accuracy_dataset from './LineChartData/united_kingdom_switzerland_accuracy_dataset.csv';
//import csvData from './australia_accuracy_dataset.csv'; 

const datasetMap = {
  'australia | canada': australia_canada_accuracy_dataset,
  'australia | japan': australia_japan_accuracy_dataset,
  'australia | switzerland': australia_switzerland_accuracy_dataset,
  'australia | united_kingdom': australia_united_kingdom_accuracy_dataset,
  'canada | japan': canada_japan_accuracy_dataset,
  'canada | switzerland': canada_switzerland_accuracy_dataset,
  'canada | united_kingdom': canada_united_kingdom_accuracy_dataset,
  'canada | australia': canada_australia_accuracy_dataset,
  'japan | australia': japan_australia_accuracy_dataset,
  'japan | canada': japan_canada_accuracy_dataset,
  'japan | switzerland': japan_switzerland_accuracy_dataset,
  'japan | united_kingdom': japan_united_kingdom_accuracy_dataset,
  'switzerland | australia': switzerland_australia_accuracy_dataset,
  'switzerland | canada': switzerland_canada_accuracy_dataset,
  'switzerland | japan': switzerland_japan_accuracy_dataset,
  'switzerland | united_kingdom': switzerland_united_kingdom_accuracy_dataset,
  'united_kingdom | australia': united_kingdom_australia_accuracy_dataset,
  'united_kingdom | canada': united_kingdom_canada_accuracy_dataset,
  'united_kingdom | japan': united_kingdom_japan_accuracy_dataset,
  'united_kingdom | switzerland': united_kingdom_switzerland_accuracy_dataset,
};

function App() {
  const [chartData, setChartData] = useState({
    datasets: []
  });
  const [chartOptions, setChartOptions] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {

    if (selectedCountry && selectedCountry1) {
      var selectedCountryLower = selectedCountry.toLowerCase();
      if (selectedCountryLower === "uk") {
        selectedCountryLower = "united_kingdom";
      }
      var selectedCountry1Lower = selectedCountry1.toLowerCase();
      if (selectedCountry1Lower === "uk") {
        selectedCountry1Lower = "united_kingdom";
      }

    console.log(`${selectedCountryLower} | ${selectedCountry1Lower}`)

    var dataset = datasetMap[`${selectedCountryLower} | ${selectedCountry1Lower}`];

    Papa.parse(dataset, {
      header: true,
      download: true,
      dynamicTyping: true,
      delimiter: ",",
      complete: (result) => {
        const filteredData = result.data.filter(item => item.year && item.ActualRate && item.PredictedRate);
  
        const labels = filteredData.map(item => item.year);
        const exchangeRateData = filteredData.map(item => item.ActualRate);
        const pppData = filteredData.map(item => item.PredictedRate);

        console.log(labels);
  
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
  }
  }, [selectedCountry, selectedCountry1]);


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
    japan: ['149.32377', 'JPY', '128.15294552'],
    uk: ['0.79229247', 'GBP', '0.80044328'],
    australia: ['1.5354563', 'AUD', '1.43037683'],
    canada: ['1.3470627', 'CAD', '1.34287661'],
    switzerland: ['0.8750709', 'CHF', '0.93521344'],
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
      let currentPrice = prices[selectedCountry][2]/prices[selectedCountry1][2];
      currentPrice = currentPrice.toFixed(5);
      return currentPrice+" "+prices[selectedCountry][1] + " = " + "1 " + prices[selectedCountry1][1];
    }
    return 'NOT';
  };

  const getExchangePrice= () => {
    if (prices[selectedCountry] != null && prices[selectedCountry1] != null) {
      let currentPrice = prices[selectedCountry][0]/prices[selectedCountry1][0];
      currentPrice = currentPrice.toFixed(5);
      return "Current exchange: " + currentPrice+" "+prices[selectedCountry][1] + " = " + "1 " + prices[selectedCountry1][1];
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
            <h3 id='rightSpace'>{getCurrentPrice()}</h3>
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
          <h3 id='wrapped'>{getExchangePrice()}</h3>
        )}
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

import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from 'antd';
import CountrySelect from './countryInput';
import CountrySelect1 from './countryInput1';
import CalculateButton from './button';
import { SwapOutlined } from '@ant-design/icons';
import japan from './w2560/jp.png';
import korea from './w2560/kr.png';
import uk from './w2560/gb.png';
import australia from './w2560/au.png';
import canada from './w2560/ca.png';
import switzerland from './w2560/ch.png';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import csvData from './australia_data.csv'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)



function App() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const [chartData, setChartData] = useState({
    datasets: []
  });
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
      Papa.parse(csvData, { 
          header: true,
          download: true,
          dynamicTyping: true,
          delimiter: " ",
          complete: ((result) => {
            console.log(result)
            setChartData({
              labels: result.data.map((item, index) => [item[' "year" ']]).filter( String ), datasets: [
                {
                  label: 'Exchange Rate',
                  data: result.data.map((item, index) => [item[' "ExchangeRate" ']]).filter( Number ),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                },
                {
                  label: 'PPP',
                  data: result.data.map((item, index) => [item[' "PPP" ']]).filter( Number ),
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
                  text: 'Exchange Rate and PPP Over Time',
                  font: {
                    size: 18,
                  },
                },
              },
            })
          })
        })
      }, [])


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
  };

  const swapCountries = () => {
    const temp = selectedCountry;
    setSelectedCountry(selectedCountry1);
    setSelectedCountry1(temp);
  };

  const getflagimage = () => {
    return flags[selectedCountry];
  };

  const getflagimage1 = () => {
    return flags[selectedCountry1];
  };

  

  return (
    <div className="App">
      <h1>CurrEx</h1>
      <div className="inputs">
        <CountrySelect selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <Button type="primary" onClick={swapCountries} shape="circle" icon={<SwapOutlined />} />
        <CountrySelect1 selectedCountry1={selectedCountry1} setSelectedCountry1={setSelectedCountry1} />
        <CalculateButton selectedCountry={selectedCountry} onResult={handleResult} />
      </div>
      <div className="text-container">
        <p className="instruction-text">Select two countries to see their forecasted currency exchange rate for the next quarter</p>
      </div>
      <div className="flags">
        {apiResponse && (
          <div>
            <img src={getflagimage()} alt="Country flag" id="flag" />
          </div>
        )}
        {apiResponse && (
          <div>
            <img src={getflagimage1()} alt="Country flag" id="flag" />
          </div>
        )}
        <div>
          <Line options = {chartOptions} data = {chartData}/>
        </div>
      </div>
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

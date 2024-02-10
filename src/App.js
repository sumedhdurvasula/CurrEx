import React, { useState, useEffect } from 'react';
import './App.css';
import { Select, Space } from 'antd';
import CountrySelect from './countryInput';
import CountrySelect1 from './countryInput1';
import CalculateButton from './button';
import { SwapOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import japan from './w2560/jp.png';
import korea from './w2560/kr.png'
import uk from './w2560/gb.png'
import australia from './w2560/au.png';
import canada from './w2560/ca.png';
import switzerland from './w2560/ch.png';


function App() {

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
      <div className='inputs'>
        <CountrySelect  selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <Button type="primary" onClick={swapCountries} shape="circle" icon={<SwapOutlined />} />
        <CountrySelect1  selectedCountry1={selectedCountry1} setSelectedCountry1={setSelectedCountry1} />
        <CalculateButton selectedCountry={selectedCountry} onResult={handleResult} />
      </div>
      <div className='flags'>
        {apiResponse && (
          <div>
            <img src={getflagimage()} alt="Country flag" id='flag'/>
          </div>
        )}
        {apiResponse && (
          <div>
            <img src={getflagimage1()} alt="Country flag" id='flag'/>
          </div>
        )}
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

import React, { useState } from 'react';import { Line } from 'react-chartjs-2';
import { Select, Space } from 'antd';
import './App.css';
// import 'antd/dist/antd.css';


const CountrySelect = ({ selectedCountry, setSelectedCountry }) => {


  const options = [
    {
      label: 'China',
      value: 'china',
      emoji: '🇨🇳',
      desc: 'China (CNY)',
    },
    {
      label: 'USA',
      value: 'usa',
      emoji: '🇺🇸',
      desc: 'USA (USD)',
    },
    {
      label: 'Switzerland',
      value: 'switzerland',
      emoji: '🇨🇭',
      desc: 'Switzerland (CHF)',
    },
    {
      label: 'United Kingdom',
      value: 'united_kingdom',
      emoji: '🇬🇧',
      desc: 'UK (GBP)',
    },
    {
      label: 'Japan',
      value: 'japan',
      emoji: '🇯🇵',
      desc: 'Japan (JPY)',
    },
    {
      label: 'Korea',
      value: 'korea',
      emoji: '🇰🇷',
      desc: 'Korea (KRW)',
    },
    {
      label: 'Germany',
      value: 'germany',
      emoji: '🇩🇪',
      desc: 'Germany (EUR)',
    },
    {
      label: 'France',
      value: 'france',
      emoji: '🇫🇷',
      desc: 'France (EUR)',
    },
    {
      label: 'Italy',
      value: 'italy',
      emoji: '🇮🇹',
      desc: 'Italy (EUR)',
    },
    {
      label: 'Spain',
      value: 'spain',
      emoji: '🇪🇸',
      desc: 'Spain (EUR)',
    },
    {
      label: 'Russia',
      value: 'russia',
      emoji: '🇷🇺',
      desc: 'Russia (RUB)',
    },
    {
      label: 'India',
      value: 'india',
      emoji: '🇮🇳',
      desc: 'India (INR)',
    },
    {
      label: 'Brazil',
      value: 'brazil',
      emoji: '🇧🇷',
      desc: 'Brazil (BRL)',
    },
    {
      label: 'Canada',
      value: 'canada',
      emoji: '🇨🇦',
      desc: 'Canada (CAD)',
    },
    {
      label: 'Australia',
      value: 'australia',
      emoji: '🇦🇺',
      desc: 'Australia (AUD)',
    }    
  ];


const handleChange = (value) => {
  console.log(`selected ${value}`);
  setSelectedCountry(value);
};

return (
  <Select className='countryInput'
  mode="single"
  style={{
    width: '100%',
  }}
  placeholder="Select one country"
  value = {selectedCountry}
  onChange={handleChange}
  optionLabelProp="label"
  showSearch
  options={options.map(option => ({
    label: (
      <Space>
        <span role="img" aria-label={option.label}>
          {option.emoji}
        </span>
        {option.desc}
      </Space>
    ),
    value: option.value,
  }))}
/>
);
};

export default CountrySelect;

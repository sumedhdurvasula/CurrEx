import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios'

const CalculateButton = ({ selectedCountry, onResult }) => {
    // Assuming you want to track loading state for one button only
    const [isLoading, setLoading] = useState(false);


    const enterLoading = async () => {
      setLoading(true);
      
      // try {
      //   console.log(selectedCountry)
      //   const response = await axios.post('http://127.0.0.1:5000/hello', {
      //     data: { selectedCountry }
      //   });
      //   console.log("Response data:", response.data)
      //   onResult(response.data);
      // } catch (error) {
      //     console.error("Error fetching data:", error);
      // } finally {
      //     setLoading(false);
      // }
      onResult("Placeholder for News Articles due to API Limit.");
      setLoading(false);
  };

    return (
      <Button 
        type="primary" 
        size="large" 
        loading={isLoading}
        onClick={enterLoading}
      >
        Calculate
      </Button>
    );
  };
  
  export default CalculateButton;

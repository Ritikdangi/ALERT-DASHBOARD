import React, { useEffect } from 'react';

const Data = ({ setData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = require('./data.json'); // Import JSON data from data.json file
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };
    fetchData();
  }, [setData]);

  return null; // This component doesn't render anything visible
};

export default Data;

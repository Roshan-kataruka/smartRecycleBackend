const axios = require('axios');

// Define the API URL and parameters
const apiUrl = 'https://api.geoapify.com/v1/routing';
const mode = 'drive';
const apiKey = '719ff2f1a84744f590b68c9de6f05ebc'; 

async function getRoutingData(waypoints) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        waypoints,
        mode,
        apiKey,
      },
    });

    const result = response.data;
    //console.log(result.features[0].properties.legs[0].distance);
    return result.features[0].properties.legs[0].distance;
  } catch (error) {
    
    console.error('API Error:', error.message);
    return error;
  }
}

module.exports = {
    getRoutingData
}



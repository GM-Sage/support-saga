// /src/api/PrintfulAPI.js

require('dotenv').config();
const axios = require('axios');

const baseURL = 'https://api.printful.com/';

const printfulAPI = axios.create({
  baseURL,
  headers: {
    'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`,
    'Content-Type': 'application/json',
  },
});

export default printfulAPI;
// /src/api/PrintfulAPI.js

export async function getProducts() {
    try {
      const response = await printfulAPI.get('/products');
      return response.data; // This might vary based on the API's response structure
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
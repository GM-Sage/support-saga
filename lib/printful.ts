import axios from 'axios';

const printfulApiKey = process.env.PRINTFUL_API_KEY;

const printfulClient = axios.create({
  baseURL: 'https://api.printful.com',
  headers: {
    'Authorization': `Bearer ${printfulApiKey}`,
    'Content-Type': 'application/json',
  },
});

export const getPrintfulProducts = async () => {
  try {
    const response = await printfulClient.get('/store/products');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    throw new Error('Unable to fetch products');
  }
};

export const createPrintfulOrder = async (orderData: any) => {
  try {
    const response = await printfulClient.post('/orders', orderData);
    return response.data.result;
  } catch (error) {
    console.error('Error creating Printful order:', error);
    throw new Error('Unable to create order');
  }
};
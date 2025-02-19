import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const testEndpoint = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/proxy`, {
      params: {
        owner: 'ravinder9280',
        repo: 'chatty',
        commithash: '4bfd537ccf8ed14e91efeed7ea8ebfd314deca9d',
      },
    });
    console.log('Response from proxy:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error('Error fetching data:', error);
    }
  }
};

testEndpoint();
import axios from 'axios';


const apiURL = "https://1d2e-197-65-0-135.ngrok-free.app";

// Function to make the API request
const apiRequest = async (method, endpoint, token, data) => {
  try {
    const config = {
      method: method,
      url: `${apiURL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };    
    const response = await axios(config);
    return response;
  } catch (err) {
    return err;
  }
};

// Function to fetch lecture halls with the token
export const FetchLectureHalls = async (token) => {
  try {
    // Assuming `apiRequest` is a helper function that performs the actual HTTP request
    const response = await apiRequest('GET', '/lectureHalls', token);
    

    if (response && response.status === 200) {
      // Successfully fetched the data
      return response.data;
    } else {
      // Handle error response
      throw new Error('Failed to fetch lecture halls');
    }
  } catch (error) {
    console.error('Error fetching lecture halls:', error);
    throw error; // Re-throw error to be caught by the calling function
  }
};





export const FetchBuildings = async (token , location) => {
  try {
    // Assuming `apiRequest` is a helper function that performs the actual HTTP request
    const response = await apiRequest('GET', '/buildings', token) , data = location;
    

    if (response && response.status === 200) {
      // Successfully fetched the data
      return response.data;
    } else {
      // Handle error response
      throw new Error('Failed to fetch lecture halls');
    }
  } catch (error) {
    console.error('Error fetching lecture halls:', error);
    throw error; // Re-throw error to be caught by the calling function
  }
};


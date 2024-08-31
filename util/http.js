import axios from 'axios';

const BACKEND_URL = 'https://react-native-course-e29fb-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeExpense(expenseData) {
    try {
      const response = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
      const id = response.data.name;
      console.log('Data stored successfully with ID:', id);
      return id;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error storing data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error with request:', error.request);
      } else {
        // Something else happened
        console.error('Error:', error.message);
      }
      throw error;  // Re-throw the error to be handled by the caller if necessary
    }
  }

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}
  
export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
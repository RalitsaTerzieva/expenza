import axios from 'axios';

const BACKEND_URL = 'https://react-native-course-e29fb-default-rtdb.europe-west1.firebasedatabase.app';

export function storeExpense(expenseData) {
    return axios.post(`${BACKEND_URL}/expenses.json`, expenseData)
      .then(response => {
        console.log('Data stored successfully:', response.data);
        return response.data;
      })
      .catch(error => {
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
      });
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
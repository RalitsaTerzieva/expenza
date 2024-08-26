import axios from 'axios';

const BACKEND_URL =
  'https://react-native-course-3cceb-default-rtdb.firebaseio.com';

export function storeExpense(expenseData) {
    return axios.post(BACKEND_URL + '/expenses.json', expenseData)
      .then(response => {
        console.log('Data stored successfully:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error storing data:', error);
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
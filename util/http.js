import axios from 'axios';

const url = 'https://react-native-course-e29fb-default-rtdb.europe-west1.firebasedatabase.app/expenses.json';

export function storeExpense(expenseData) {
    return axios.post(url, expenseData)
      .then(response => {
        console.log('Data stored successfully:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error storing data:', error);
        throw error;  // Re-throw the error to be handled by the caller if necessary
      });
  }
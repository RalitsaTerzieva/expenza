import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'Coffee at Starbucks',
        amount: 4.99,
        date: new Date('2024-08-04')
    },
    {
        id: 'e2',
        description: 'Lunch at a café',
        amount: 15.50,
        date: new Date('2024-08-04')
    },
    {
        id: 'e3',
        description: 'Parking fee',
        amount: 3.00,
        date: new Date('2024-08-04')
    },
    {
        id: 'e4',
        description: 'Grocery shopping',
        amount: 95.20,
        date: new Date('2024-08-05')
    },
    {
        id: 'e5',
        description: 'Online course subscription',
        amount: 29.99,
        date: new Date('2024-08-06')
    },
    {
        id: 'e6',
        description: 'Gym membership renewal',
        amount: 45.00,
        date: new Date('2024-08-07')
    },
    {
        id: 'e7',
        description: 'Dinner at a restaurant',
        amount: 85.50,
        date: new Date('2024-08-08')
    },
    {
        id: 'e8',
        description: 'Movie tickets',
        amount: 22.00,
        date: new Date('2024-08-09')
    },
    {
        id: 'e9',
        description: 'Monthly rent',
        amount: 1200.00,
        date: new Date('2024-08-10')  
    },
    {
        id: 'e10',
        description: 'Uber ride',
        amount: 15.75,
        date: new Date('2024-08-11')  
    },
    {
        id: 'e11',
        description: 'Grocery shopping',
        amount: 76.80,
        date: new Date('2024-08-04')
    },
    {
        id: 'e12',
        description: 'Book purchase',
        amount: 12.99,
        date: new Date('2024-08-04')
    },
    {
        id: 'e13',
        description: 'Gas station refill',
        amount: 50.00,
        date: new Date('2024-08-04')  
    }
];


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
    
    switch (action.type) {
        case 'ADD':
            const newId = new Date().toISOString() + Math.random().toString();
            return [{ ...action.payload, id: newId }, ...state];
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            if (updateableExpenseIndex === -1) return state;
            const updatedExpense = { ...state[updateableExpenseIndex], ...action.payload.data };
            return [
                ...state.slice(0, updateableExpenseIndex), 
                updatedExpense, 
                ...state.slice(updateableExpenseIndex + 1)
            ];

        case 'DELETE':
            const newState = state.filter(expense => expense.id !== action.payload);
            return newState;

        default:
            return state;
    }
}


function ExpenseContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData})
    }

    function deleteExpense(id) {
        dispatch({ type: "DELETE", payload: id})
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpenseContextProvider;
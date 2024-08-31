import { createContext, useReducer } from 'react';


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
    
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const  updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            if ( updatableExpenseIndex === -1) return state;
            const updatedExpense = { ...state[updatableExpenseExpenseIndex], ...action.payload.data };
            return [
                ...state.slice(0, updatableExpenseExpenseIndex), 
                updatedExpense, 
                ...state.slice(updatableExpenseIndex + 1)
            ];

        case 'DELETE':
            const newState = state.filter(expense => expense.id !== action.payload);
            return newState;

        default:
            return state;
    }
}


function ExpenseContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData})
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses });
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
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpenseContextProvider;
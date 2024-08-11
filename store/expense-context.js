import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 56.99,
        date: new Date('2023-01-10')
    },
    {
        id: 'e2',
        description: 'Groceries',
        amount: 120.45,
        date: new Date('2023-01-12')
    },
    {
        id: 'e3',
        description: 'Electricity bill',
        amount: 75.30,
        date: new Date('2023-01-15')
    },
    {
        id: 'e4',
        description: 'Gym membership',
        amount: 45.00,
        date: new Date('2023-01-18')
    },
    {
        id: 'e5',
        description: 'New jacket',
        amount: 120.00,
        date: new Date('2023-01-20')
    },
    {
        id: 'e6',
        description: 'Dinner at a restaurant',
        amount: 60.50,
        date: new Date('2023-01-22')
    },
    {
        id: 'e7',
        description: 'Monthly rent',
        amount: 950.00,
        date: new Date('2023-02-01')
    },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload, id: id}, ...state]
        case 'UPDATE':
            const updatebaleExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updateableExpense = state[updatebaleExpenseIndex];
            const updateableItem = {...updateableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatebaleExpenseIndex] = updateableItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload.id)
        default:
            return state
    }
}

function ExpenseContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData})
    }

    function deleteExpense(id) {
        dispatch({ type: "DELETE", paylod: id})
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>
}

export default ExpenseContextProvider;
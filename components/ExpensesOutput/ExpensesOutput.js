import { View } from 'react-native';
import ExpensesSummary from './ExpesnesSummary';
import ExpensesList from './ExpensesList';

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

function ExpensesOutput({expenses, expensesPeriod}) {
    return <View>
        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
        <ExpensesList/>
    </View>
}

export default ExpensesOutput;
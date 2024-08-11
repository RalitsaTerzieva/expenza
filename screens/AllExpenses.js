import { useContext } from 'react';
import  ExpensesOutput from './../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../store/expense-context';

function AllExpenses() {
    const expensesCtx = useContext(ExpenseContext);
    console.log(expensesCtx.expenses);
    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='Total'/>
}

export default AllExpenses;
import { View } from 'react-native';
import ExpensesSummary from './ExpesnesSummary';
import ExpensesList from './ExpensesList';

function ExpensesOutput({expenses, expensesPeriod}) {
    return <View>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
        <ExpensesList/>
    </View>
}

export default ExpensesOutput;
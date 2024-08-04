import { View } from 'react-native';
import ExpensesSummary from './ExpesnesSummary';
import ExpensesList from './ExpensesList';

function ExpensesOutput({expenses}) {
    return <View>
        <ExpensesSummary/>
        <ExpensesList/>
    </View>
}

export default ExpensesOutput;
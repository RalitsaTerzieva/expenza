import { View, StyleSheet } from 'react-native';
import ExpensesSummary from './ExpesnesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from './../../constants/Colors';


function ExpensesOutput({expenses, expensesPeriod}) {
    return <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
        <ExpensesList expenses={expenses}/>
    </View>
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
});
import { FlatList, StyleSheet } from "react-native";
import ExpenseItems from './ExpenseItem';

function renderExpenseItem(itemData) {
    return <ExpenseItems {...itemData.item}/>
}

function ExpensesList({expenses}) {
    return <FlatList 
        data={expenses} 
        renderItem={renderExpenseItem} 
        keyExtractor={(item) => item.id}
    />
}

export default ExpensesList;

const styles = StyleSheet.create({});
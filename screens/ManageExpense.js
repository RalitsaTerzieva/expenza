import { useContext } from 'react';
import IconButton from '@/components/UI/IconButton';
import Button from './../components/UI/Button';
import { GlobalStyles } from '@/constants/Colors';
import { useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { ExpensesContext } from '@/store/expense-context';

function ManageExpense({route, navigation}) {
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        if (editedExpenseId) {
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } else {
            console.warn('No expense ID found to delete.');
        }
    }

   function cancelHandler() {
    navigation.goBack();
   }

   function confirmHandler() {
    if(isEditing) {
        expenseCtx.updateExpense(editedExpenseId, {description: 'Test!!!!', amount: 29.99, date: new Date()});
    } else {
        expenseCtx.addExpense({description: 'Test', amount: 19.99, date: new Date()});
    }
    navigation.goBack();
   }

    return (
    <View style={styles.container}>
        <TextInput/>
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} mode='flat' onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
        </View>
        {isEditing && 
        <View style={styles.deleteContainer}>
            <IconButton 
                icon='trash' 
                size={36} 
                color={GlobalStyles.colors.error500} 
                onPress={deleteExpenseHandler}/>
        </View>
        }
    </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
})
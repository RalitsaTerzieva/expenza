import { useContext } from 'react';
import IconButton from '@/components/UI/IconButton';
import { GlobalStyles } from '@/constants/Colors';
import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpensesContext } from '@/store/expense-context';
import ExpenseForm from './../components/ManageExpense/ExpenseForm';

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

    function confirmHandler(expenseData) {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData);
        } else {
            expenseCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }


    return (
    <View style={styles.container}>
        <ExpenseForm 
            onCancel={cancelHandler} 
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
        />
        
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
})
import { useContext, useState } from 'react';
import IconButton from '@/components/UI/IconButton';
import { GlobalStyles } from '@/constants/Colors';
import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpensesContext } from '@/store/expense-context';
import ExpenseForm from './../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from './../util/http';
import LoadingOverlay from './../components/UI/LoadingOverlay';

function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        if (editedExpenseId) {
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } else {
            console.warn('No expense ID found to delete.');
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData);
            await updateExpense(editedExpenseId, expenseData);
        } else {
            const id = await storeExpense(expenseData);
            expenseCtx.addExpense({ ...expenseData, id: id });
        }
        navigation.goBack();
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
    }


    return (
    <View style={styles.container}>
        <ExpenseForm 
            onCancel={cancelHandler} 
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            defaultValues={selectedExpense}
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
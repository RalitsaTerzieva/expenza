import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './../UI/Button';

import Input from './Input';

function ExpenseForm({route, navigation, onCancel, submitButtonLabel}) {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: ''
  });

  function inputChangeHandler(inputIdentifier ,enteredText) {
    setInputValues((currentInputObject)=> {
        return {
            ...currentInputObject,
            [inputIdentifier]: enteredText
        }
    });
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
    <View  style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input
                style={styles.rowInput}
                label="Amount"
                textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputValues.amount
                }}
            />
            <Input
                style={styles.rowInput}
                label="Date"
                textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputValues.date
                }}
            />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description
        }}
      />
      <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} mode='flat' onPress={confirmHandler}>
                {submitButtonLabel}
            </Button>
        </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
      marginTop: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 24,
      textAlign: 'center'
    },
    inputsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowInput: {
      flex: 1,
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
  });
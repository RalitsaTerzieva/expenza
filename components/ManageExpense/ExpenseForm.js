import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './../UI/Button';

import Input from './Input';

function ExpenseForm({ onCancel, submitButtonLabel, onSubmit}) {
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

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    };

    onSubmit(expenseData);
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
            <Button style={styles.button} mode='flat' onPress={submitHandler}>
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
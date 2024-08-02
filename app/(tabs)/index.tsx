import { View, StyleSheet, Text } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    color: 'pink'
  }
});

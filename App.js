import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppContainer from './src/routes';

export default function App() {
  return (
    <AppContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'auto',
  },
});

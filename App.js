import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Contacts from './src/components/Contacts/Contacts';

import { getContacts } from './src/services/contactService.js';

export default function App() {
  async function get() {
    var contacts = await getContacts();
    console.log(contacts);
  }

  return (
    <View style={styles.container}>
      <Contacts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

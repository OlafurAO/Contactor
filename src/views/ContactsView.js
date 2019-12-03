import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ContactsView = (contacts) => {
	console.log(contacts)

	return (
		<View>
			<Text> KJHLASFKJHFAKJHAS </Text>
		</View>
	)

	/*
	return(
		<View style={styles.container}>
			<FlatList
				numColumns={1}
				data={ contacts }
				initialNumToRender={50}
				renderItem={ ({ item: { id, name, phone }}) => {
					console.log(name);
					return(
						<Text style={{fontSize: 50}}> { name } </Text>
					)
				}}keyExtractor={ contact => contact.name}
			/>
		</View>
	);
	*/
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

export default ContactsView;

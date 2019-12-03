import React from 'react';
import { View, Text, FlatList } from 'react-native';

const ContactsView = (contacts) => {
	async function ble() {
		var c = await contacts.contacts();
		console.log(c);
	}
	ble();
	return(
		<View>
			<Text style={ { fontSize: 50, } }> ASJÆFLIJLKæsfdaaaaaaadslkjæf </Text>
		</View>
	);
}

export default ContactsView;

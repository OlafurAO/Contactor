import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getContacts } from '../../services/contactService.js';

class Contacts extends React.Component {
	async get() {
    var contacts = await getContacts();
    console.log(contacts);
  }

	render() {
		return(
			<View>
				<TouchableOpacity onPress={ () => this.get() }>
					<Text> HELLLLLLOOOOO </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Contacts;

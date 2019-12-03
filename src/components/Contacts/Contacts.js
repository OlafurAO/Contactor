import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FileSystem from 'expo-file-system';

import ContactsView from '../../views/ContactsView';
import { getAllContacts, writeContacts, initContacts } from '../../services/contactService.js';

class Contacts extends React.Component {
	async componentWillMount() {
		this.initContacts();
	}

	async initContacts() {
    await initContacts();
  }

	async getAllContacts() {
		return await getAllContacts();
	}

	render() {
		return(
			<View>
				<TouchableOpacity>
					<ContactsView contacts={ function(){ return getAllContacts() } }/>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Contacts;

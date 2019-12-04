import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import FileSystem from 'expo-file-system';
import styles from './styles.js'

import ContactsView from '../../views/ContactsView';
import { getAllContacts, writeContacts, initContacts } from '../../services/contactService.js';

class Contacts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: '',
		}
	}
	async componentWillMount() {
		this.initContacts();
		this.getAllContacts();
	}

	async initContacts() {
    await initContacts();
  }

	async getAllContacts() {
		try{
			let contacts = await getAllContacts();

			this.setState({
				contacts: contacts,
			});
			this.forceUpdate();
		} catch (error) {
      console.log(error.message);
    }
	}

	render() {
		const { contacts } = this.state;
		return(
			<View>
				<FlatList style={ styles.createList}
					numColumns={1} data={ contacts }
					initialNumToRender={50}
					renderItem={ ({ item: { id, name, phone, photo }}) => {
						return(
							console.log(photo),
							<Text style={ styles.createListText }> { name } </Text>
						)
					}}keyExtractor={ contact => contact.name}
				/>
			</View>
		);
			/*
			return(
				<View>
					<TouchableOpacity>
						<ContactsView contacts={ contacts }/>
					</TouchableOpacity>
				</View>
			);
			*/

	}
}

export default Contacts;

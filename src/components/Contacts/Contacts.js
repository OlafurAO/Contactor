import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import FileSystem from 'expo-file-system';

import ContactsView from '../../views/ContactsView';
import { getAllContacts, writeContacts, initContacts } from '../../services/contactService.js';
import styles from './styles.js'

class Contacts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: '',
			searchFilter: '',
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
			contacts = contacts.sort((a, b) => {
				return a.name < b.name;
			});
			this.setState({
				contacts: contacts,
			});

			this.forceUpdate();
		} catch (error) {
      console.log(error.message);
    }
	}

	updateSearchFilter(text) {
		this.setState({
			searchFilter: text,
		});
		this.forceUpdate();
	}

	render() {
		const { navigation } = this.props;
		const { contacts } = this.state;
		const { searchFilter } = this.state;

		return(
			<View>
				<TextInput style={ styles.inputBox }
					value={ this.state.searchFilter }
					onChangeText={ title => this.updateSearchFilter(title) }
					placeholder='Search for contacts'
					placeholderTextColor={ 'black' }
					fontColor={ 'black' }
				/>

				<FlatList style={ styles.createList}
					numColumns={1} data={ contacts }
					initialNumToRender={50}
					extraData={this.state}
					renderItem={ ({ item: { id, name, phone, photo }}) => {
						if(searchFilter !== '') {
							if(name.search(searchFilter) < 0) {
								return (
									<View>
									</View>
								);
							}
						}
						return(
							<View style={ styles.contact }>
								{ photo === 'unavailable' ?
								<Image
								 style={ styles.defaultPic }
								 resizeMode='cover'
								 source={ require('../../resources/icons/default_pic.png') }
								/>: null }

								<TouchableOpacity onPress={() => {
									navigation.navigate('ContactDetails', {
										navigation: navigation, id: id,
										name: name, phone: phone, photo: photo,
										updateContacts: () => this.getAllContacts()
									}
								)}}>
									<Text style={ styles.createListText }> { name } </Text>
								</TouchableOpacity>
							</View>
						)
					}}keyExtractor={ contact => contact.name}
				/>
			</View>
		);
	}
}

export default Contacts;

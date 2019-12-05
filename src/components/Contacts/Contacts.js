import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import FileSystem from 'expo-file-system';

import ContactsView from '../../views/ContactsView';
import { getAllContacts, writeContacts, initContacts, deleteAllContacts } from '../../services/contactService.js';
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
		this.getAllContacts();
	}

	async initOScontacts() {
    await initContacts();
		await this.getAllContacts();
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

	async deleteAllContacts() {
		try{
			await deleteAllContacts()
			this.setState({
				contacts: '',
			});
		} catch(error) {
			console.log(error.message);
		}
	}

	updateSearchFilter(text) {
		this.setState({
			searchFilter: text,
		});
		this.forceUpdate();
	}

	toggleDropdown() {

	}

	render() {
		const { navigation } = this.props;
		const { contacts } = this.state;
		const { searchFilter } = this.state;

		return(
			<View style={ styles.container }>
				<View style={ styles.toolBar }>
					<TextInput style={ styles.inputBox }
						value={ this.state.searchFilter }
						onChangeText={ title => this.updateSearchFilter(title) }
						placeholder='Search for contacts'
						placeholderTextColor={ 'black' }
						fontColor={ 'black' }
					/>
					<TouchableOpacity style={ styles.dropDownContainer } onPress={ () => this.toggleDropdown() }>
						<Image
							style={ styles.dropDown }
							resizeMode='cover'
							source={ require('../../resources/icons/dropdown.png') }
						/>
					</TouchableOpacity>
				</View>

				<FlatList style={ styles.createList}
					numColumns={1} data={ contacts }
					initialNumToRender={50}
					extraData={this.state}
					renderItem={ ({ item: { id, name, phone, photo, customPhotoAvailable }}) => {
						if(searchFilter !== '') {
							if(name.toLowerCase().search(searchFilter.toLowerCase()) < 0) {
								return (
									<View>
									</View>
								);
							}
						}
						return(
							<View style={ styles.contact }>
							<View style={ styles.picBorder }>
								{!customPhotoAvailable ?
								<Image
									style={ styles.profilePic }
									resizeMode='cover'
									source={ require('../../resources/icons/default_pic.png') }
								/>
								:
								<Image
									style={ styles.profilePic }
									resizeMode='cover'
									source={{uri: photo }}
								/>}
							</View>

								<TouchableOpacity onPress={() => {
									navigation.navigate('ContactDetails', {
										navigation: navigation, id: id,
										name: name, phone: phone, photo: photo,
										customPhotoAvailable: customPhotoAvailable,
										updateContacts: () => this.getAllContacts()
									}
								)}}>
									<Text style={ styles.createListText }> { name } </Text>
								</TouchableOpacity>
							</View>
						)
					}}keyExtractor={ contact => contact.name}
				/>
				<TouchableOpacity onPress={ () => this.initOScontacts() }>
					<Text> Import OS contacts </Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={ () => this.deleteAllContacts() }>
					<Text> Delete All Contacts </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Contacts;

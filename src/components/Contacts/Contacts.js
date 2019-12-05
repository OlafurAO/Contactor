import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import FileSystem from 'expo-file-system';

import CreateContact from '../CreateContact/CreateContact';
import { getAllContacts, writeContacts, initContacts, deleteAllContacts } from '../../services/contactService.js';
import styles from './styles.js';

class Contacts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: '',
			searchFilter: '',
			dropDownToggled: false,
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
				return a.name > b.name;
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

	createContact() {

	}

	toggleDropdown() {
		this.setState({
			dropDownToggled: this.state.dropDownToggled ? false : true,
		});
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
					<TouchableOpacity style={ styles.createContactContainer } onPress={
						() => { navigation.navigate('CreateContact', { navigation: navigation }) } }>
						<Image
							style={ styles.createContact }
							resizeMode='cover'
							source={ require('../../resources/icons/plus.png') }
						/>
					</TouchableOpacity>
					<TouchableOpacity style={ styles.dropDownContainer } onPress={
						() => this.toggleDropdown() }>
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
					renderItem={ ({ item: { id, name, phone, photo }}) => {
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
									{photo === undefined ?
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
										updateContacts: () => this.getAllContacts()
									}
								)}}>
									<Text style={ styles.createListText }> { name } </Text>
								</TouchableOpacity>
							</View>
						)
					}}keyExtractor={ contact => contact.name}
				/>
				{ this.state.dropDownToggled ?
					<View style={ styles.dropDownList }>
						<TouchableOpacity onPress={ () => this.initOScontacts() }>
							<Text style={ styles.dropDownListItems }> Import OS contacts </Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={ () => this.deleteAllContacts() }>
							<Text style={ styles.dropDownListItems }> Delete All Contacts </Text>
						</TouchableOpacity>
					</View> : null }
			</View>
		);
	}
}

export default Contacts;

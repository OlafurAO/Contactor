import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { deleteContact, modifyContact } from '../../services/contactService.js';
import styles from './styles.js'

class ContactDetails extends React.Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			newName: navigation.getParam('name'),
			newPhone: navigation.getParam('phone'),
			newPhoto: navigation.getParam('photo'),
		}
	}

	modifyContactName(name) {
		this.setState({
			newName: name
		});
	}

	modifyContactPhone(phone) {
		this.setState({
			newPhone: phone,
		});
	}

	async modifyContactPhoto() {

	}

	async submitContactModification(id, navigation) {
		const updateContacts = navigation.getParam('updateContacts');
		const { newName } = this.state;
		const { newPhone } = this.state;
		const { newPhoto } = this.state;
		this.props.name = newName;
		this.props.phone = newPhone;
		this.props.photo = newPhoto;

		await modifyContact(id, newName, newPhone, newPhoto);
		await updateContacts();
	}

	async deleteContact(id, navigation) {
		const updateContacts = navigation.getParam('updateContacts');
		await deleteContact(id);
		await updateContacts();
		navigation.pop();
	}

	render() {
		const { navigation } = this.props;
		const id = navigation.getParam('id');

		return(
			<View style={ styles.contactContainer }>
				{ this.state.photo === 'unavailable' ?
				<Image
				 style={ styles.defaultPic }
				 resizeMode='cover'
				 source={ require('../../resources/icons/default_pic.png') }
				/>: null }

				<TouchableOpacity>
					<TextInput style={ styles.contactName }
						value={ this.state.newName }
						onChangeText={ name => this.modifyContactName(name) }
						placeholder={ this.state.newName }
						placeholderTextColor={ 'black' }
						fontColor={ 'black' }
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<TextInput style={ styles.contactPhone }
						value={ this.state.newPhone }
						onChangeText={ name => this.modifyContactPhone(name) }
						placeholder={ this.state.newPhone }
						placeholderTextColor={ 'black' }
						fontColor={ 'black' }
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={ () => this.deleteContact(id, navigation)}>
					<Text> Delete Contact </Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={ () => this.submitContactModification(id, navigation)}>
					<Text> Update </Text>
				</TouchableOpacity>

			</View>
		);
	}
}

export default ContactDetails;

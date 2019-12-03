import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { deleteContact } from '../../services/contactService.js';
import styles from './styles.js'

class ContactDetails extends React.Component {
	async modifyContact(id) {

	}

	async deleteContact(id, navigation) {
		const updateContacts = navigation.getParam('updateContacts');
		console.log(updateContacts);

		await deleteContact(id);
		await updateContacts();
		navigation.pop();
	}

	render() {
		const { navigation } = this.props;
		const id = navigation.getParam('id');
		const name = navigation.getParam('name');
		const phone = navigation.getParam('phone');
		const photo = navigation.getParam('photo');
		console.log(photo);

		return(
			<View style={ styles.contactContainer }>
				{ photo === 'unavailable' ?
				<Image
				 style={ styles.defaultPic }
				 resizeMode='cover'
				 source={ require('../../resources/icons/default_pic.png') }
				/>: null }

				<Text style={ styles.contactName }> { name} </Text>
				<Text style={ styles.contactPhone }> { phone } </Text>
				<TouchableOpacity onPress={ () => this.deleteContact(id, navigation)}>
					<Text> Delete Contact </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default ContactDetails;

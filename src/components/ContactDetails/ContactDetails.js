import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles.js'

class ContactDetails extends React.Component {
	modifyContact(id) {

	}

	deleteContact(id) {

	}

	render() {
		const { navigation } = this.props;
		const id = navigation.getParam('id');
		const name = navigation.getParam('name');
		const phone = navigation.getParam('phone');

		return(
			<View style={ styles.contactContainer }>
				<Text style={ styles.contactName }> { name} </Text>
				<Text style={ styles.contactPhone }> { phone } </Text>
			</View>
		);
	}
}

export default ContactDetails;

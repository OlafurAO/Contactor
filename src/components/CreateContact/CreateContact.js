import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { writeContacts } from '../../services/contactService.js';
import styles from './styles.js'

class CreateContact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			phone: '',
			photo: '',
		}
	}

	inputName(text) {

	}

	inputPhone(text) {

	}



	render() {
		return(
			<View style={ styles.container }>
				<TextInput style={ styles.inputBox }
					value={ this.state.name }
					onChangeText={ name => this.inputName(name) }
					placeholder='Name'
					placeholderTextColor={ 'black' }
					fontColor={ 'black' }
				/>
			</View>
		);
	}
}

export default CreateContact;

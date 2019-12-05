import React from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { createContact, findAvailableId } from '../../services/contactService.js';
import { takePhoto, importPhoto } from '../../services/imageService.js';
import styles from './styles.js'

class CreateContact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			photo: undefined,
		}
	}

	inputName(text) {
		this.setState({
			name: text,
		});
	}

	inputPhone(text) {
		this.setState({
			phone: text,
		});
	}

	async submitContact() {
		const { navigation } = this.props;
		const updateContacts = navigation.getParam('updateContacts');
		const { name } = this.state;
		const { phone } = this.state;
		const { photo } = this.state;
		var hasCustomPhoto = photo !== '' ? true : false;
		let id = await findAvailableId();

		await createContact(id, name, phone, photo, hasCustomPhoto);
		await updateContacts();
		navigation.pop();
	}

	async importPhoto() {
		let photoURI = await importPhoto();
		this.props.newPhoto = photoURI;
		this.setState({
			photo: photoURI,
		});
		this.forceUpdate();

	}

	async takePhoto() {
		let photoURI = await takePhoto();
		this.props.newPhoto = photoURI;
		this.setState({
			photo: photoURI,
		});
		this.forceUpdate();
	}

	render() {
		return(
			<View style={ styles.container }>
				<View style={ styles.inputContainer }>
					<TextInput style={ styles.inputBox }
						value={ this.state.name }
						onChangeText={ name => this.inputName(name) }
						placeholder='Name'
						placeholderTextColor={ '#b0c2d4' }
						fontColor={ 'black' }
					/>
					<TextInput style={ styles.inputBox }
						value={ this.state.phone }
						onChangeText={ phone => this.inputPhone(phone) }
						placeholder='Phone'
						placeholderTextColor={ '#b0c2d4' }
						fontColor={ 'black' }
					/>
					<TouchableOpacity style={ styles.submitButton } onPress={ () => this.takePhoto() }>
						<Text style={{ color: 'white' }}> Take Picture </Text>
					</TouchableOpacity>
					<TouchableOpacity style={ styles.submitButton } onPress={ () => this.importPhoto() }>
						<Text style={{ color: 'white' }}> Import Image </Text>
					</TouchableOpacity>

					<TouchableOpacity style={ styles.submitButton } onPress={ () => this.submitContact() }>
						<Text style={{ color: 'white' }}> Create </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default CreateContact;

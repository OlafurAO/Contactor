import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { deleteContact, modifyContact } from '../../services/contactService.js';
import { takePhoto, importPhoto } from '../../services/imageService.js';
import styles from './styles.js'

class ContactDetails extends React.Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			newName: navigation.getParam('name'),
			newPhone: navigation.getParam('phone'),
			newPhoto: navigation.getParam('photo'),
			modifyPhoto: false,
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
		this.setState({
			modifyPhoto: true,
		});
	}

	cancelModifyContactPhoto() {
		this.setState({
			modifyPhoto: false,
		});
	}

	async importPhoto() {
		let photoURI = await importPhoto();
		this.props.newPhoto = photoURI;
		this.setState({
			newPhoto: photoURI,
		});
		this.forceUpdate();

	}

	async takePhoto() {
		let photoURI = await takePhoto();
		this.props.newPhoto = photoURI;
		this.setState({
			newPhoto: photoURI,
		});
		this.forceUpdate();
	}

	async submitContactModification(id, navigation) {
		const updateContacts = navigation.getParam('updateContacts');
		const { newName } = this.state;
		const { newPhone } = this.state;
		const { newPhoto } = this.state;
		const { modifyPhoto } = this.state;
		this.props.name = newName;
		this.props.phone = newPhone;
		this.props.photo = newPhoto;

		await modifyContact(id, newName, newPhone, newPhoto, modifyPhoto);
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
		const photo = navigation.getParam('photo');


		return(
			<View style={ styles.container}>
			<View style={ styles.contactContainer }>
				<TouchableOpacity onPress={ () => this.modifyContactPhoto() } >
					<View style={ styles.picBorder }>
						{!photo === undefined ?
						<Image
							style={ styles.profilePic }
							resizeMode='cover'
							source={ photo }
						/>
						:
						<Image
							style={ styles.profilePic }
							resizeMode='cover'
							source={{uri: photo }}
						/>}
					</View>
				</TouchableOpacity>

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
					<Text style ={ styles.textStyle}> Delete Contact </Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={ () => this.submitContactModification(id, navigation)}>
					<Text style ={ styles.textStyle}> Update </Text>
				</TouchableOpacity>

				{ this.state.modifyPhoto ?
					<View style={ styles.photoOverlay }>
						<TouchableOpacity onPress={ () => this.importPhoto() }>
							<Text> Import Image </Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={ () => this.takePhoto() }>
							<Text> Take Photo </Text>
						</TouchableOpacity>
					</View>
				: null}
			</View>
			</View>
		);
	}
}

export default ContactDetails;

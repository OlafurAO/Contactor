import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import * as FileSystem from 'expo-file-system';

import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

export const initContacts = async() => {
	const contacts = await getOScontacts();
	const path = FileSystem.documentDirectory;

	contacts.forEach(async function(item, index) {
		var contact = {
			id: item.id,
			name: item.name,
			phone: item.phone,
			photo: undefined,
		};

		var contactString = JSON.stringify(contact);
		var contactPath = path + (item.name + '.json').replace(/\s+/g, '-').toLowerCase();
		await FileSystem.writeAsStringAsync(contactPath, contactString, {
			encoding: FileSystem.EncodingType.UTF8
		});
	});
}

const getOScontacts = async() => {
	const contactPermission = await Permissions.askAsync(Permissions.CONTACTS);
	if(contactPermission.status == 'granted') {
		const { data } = await Contacts.getContactsAsync({
			fields: [Contacts.Fields.PhoneNumbers],
		});

		contacts = [];
		for(var i = 0; i < data.length; i++) {
			var contact = data[i];
			var contactPhone = null;

			if(contact.phoneNumbers !== undefined) {
				contactPhone = contact.phoneNumbers[0].number;
			}

			contacts.push({
				id: contact.id,
				name: contact.name,
				phone: contactPhone,
				photo: undefined,
			});

		}
		return contacts;
	}
}

export const getAllContacts = async() => {
	const path = FileSystem.documentDirectory;
	const files = await FileSystem.readDirectoryAsync(path);

	let contacts = await Promise.all(files.map(async item => {
		var contact = await FileSystem.readAsStringAsync(path + item, {
			encoding: FileSystem.EncodingType.UTF8
		});

		contact = JSON.parse(contact)
		return contact;
	}));
	return contacts;
}

export async function modifyContact(id, name, phone, photo, modifyPhoto) {
	const path = FileSystem.documentDirectory;
	const files = await FileSystem.readDirectoryAsync(path);

	let contacts = await Promise.all(files.map(async item => {
		const contactPath = path + item;
		var contact = await FileSystem.readAsStringAsync(contactPath, {
			encoding: FileSystem.EncodingType.UTF8
		});

		contact = JSON.parse(contact)
		if(contact.id === id) {
			var newContact = {
				id: id,
				name: name,
				phone: phone,
				photo: photo,
			};

			var contactString = JSON.stringify(newContact);
			await FileSystem.writeAsStringAsync(contactPath, contactString, {
				encoding: FileSystem.EncodingType.UTF8
			});
		}
	}));
}

export async function deleteContact(id) {
	const path = FileSystem.documentDirectory;
	const files = await FileSystem.readDirectoryAsync(path);

	let contacts = await Promise.all(files.map(async item => {
		const contactPath = path + item;
		var contact = await FileSystem.readAsStringAsync(contactPath, {
			encoding: FileSystem.EncodingType.UTF8
		});

		contact = JSON.parse(contact)
		if(contact.id === id) {
			await FileSystem.deleteAsync(contactPath,  {
				idempotent: true
			});
		}
	}));
}

export async function deleteAllContacts() {
	const path = FileSystem.documentDirectory;
	const files = await FileSystem.readDirectoryAsync(path);

	let contacts = await Promise.all(files.map(async item => {
		const contactPath = path + item;
		await FileSystem.deleteAsync(contactPath,  {
			idempotent: true
		});
	}));
}

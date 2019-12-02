import React from 'react';
import { View, Text } from 'react-native';

import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

export const getContacts = async() => {
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

			if(contactPhone !== null) {
				contacts.push({
					name: contact.name,
					phone: contactPhone,
				});
			} else {
				contacts.push({
					name: contact.name,
					phone: '',
				});
			}
		}

		return contacts;
	}
}

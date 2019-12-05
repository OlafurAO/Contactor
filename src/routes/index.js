import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Contacts from '../components/Contacts/Contacts';
import ContactDetails from '../components/ContactDetails/ContactDetails';
import CreateContact from '../components/CreateContact/CreateContact';

const StackNavigator = createStackNavigator({
	Contacts,
	ContactDetails,
	CreateContact,
});

export default createAppContainer(StackNavigator);

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Contacts from '../components/Contacts/Contacts';
import ContactDetails from '../components/ContactDetails/ContactDetails';

const StackNavigator = createStackNavigator({
	Contacts,
	ContactDetails,
});

export default createAppContainer(StackNavigator);

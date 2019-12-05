import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#252c38',
    justifyContent: 'center',
		backgroundColor: '#2F4F4F',
  },

	toolBar: {
		backgroundColor: 'black',
		height: 60,
		flexDirection: 'row',
		borderBottomWidth: 2,

	},

	inputBox: {
		backgroundColor: '#fff',
		height: 60,
		width: 250,
		borderBottomWidth: 2,
	},

	dropDownContainer: {
		justifyContent: 'center',
		marginLeft: 'auto',
	},

	dropDown: {
		width: 50,
		height: 50,
	},

	createList: {
		marginBottom: 'auto',
		padding: 15,
	},

	createListText: {
		color: '#C0C0C0',
		alignSelf: 'flex-start',
		fontSize: 20,
	},

	contact: {
		flexDirection: 'row',
		padding: 15,
	},

	picBorder: {
		borderRadius: 150/2,
		borderWidth: 2,
	},

	profilePic: {
		width: 30,
		height: 30,
		borderRadius: 150/2,
		borderWidth: 2,
	},

	dropDownList: {
		position: 'absolute',
		backgroundColor: 'black',
		right: 0,
		top: 60,
		width: 200,
		height: 200,
	},

	dropDownListItems: {
		color: 'white',
		padding: 10,
	},

	createContactContainer: {
		justifyContent: 'center',
		marginLeft: 'auto',
		alignItems: 'center',
		width: 50,
	},

	createContact: {
		width: 20,
		height: 20,
	},
});

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#252c38',
    justifyContent: 'center',
		backgroundColor: '#FFA500',
  },

	toolBar: {
		backgroundColor: 'black',
		height: 60,
		flexDirection: 'row',
	},

	inputBox: {
		backgroundColor: '#fff',
		height: 60,
		width: 280,
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
		color: '#fff',
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
	}
});

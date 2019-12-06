import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#2F4F4F',
    //justifyContent: 'center',
		alignItems: 'stretch',
  },

	contactContainer: {
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#2F4F4F'

	},

	contactName: {
		fontSize: 20,
		color: '#C0C0C0',
	},

	contactPhone: {
		color: '#C0C0C0',
	},

	deleteContactButton: {
		backgroundColor: 'black',
		color: '#C0C0C0',

	},

	picBorder: {
		borderRadius: 150/2,
		borderWidth: 2,
	},

	profilePic: {
		width: 100,
		height: 100,
		borderRadius: 150/2,
		borderWidth: 2,
	},

	photoOverlay: {
		position: 'absolute',
	  width: 100,
	  height: 100,
	  alignSelf: 'flex-end',
		right: 50,
		marginTop: 50,
	  backgroundColor: '#2F4F4F'
	},

	textStyle:{
		color: '#C0C0C0',
	}
});

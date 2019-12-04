import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#252c38',
    justifyContent: 'center',
		alignItems: 'center',
  },

	contactContainer: {
		alignItems: 'center',
		padding: 20,
	},

	contactName: {
		fontSize: 20,
	},

	contactPhone: {

	},

	deleteContactButton: {
		backgroundColor: 'black'
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
	  alignSelf: 'center',
		marginTop: 50,
	  backgroundColor: '#d5e2e8'
	}
});

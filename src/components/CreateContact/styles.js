import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#252c38',
    justifyContent: 'center',
		backgroundColor: '#2F4F4F',
  },

	inputContainer: {
		alignSelf: 'center',
		marginBottom: 'auto',
		marginTop: 50,
	},

	inputBox: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 10,
		borderWidth: 4,
		width: 250,
		fontSize: 20,
		marginBottom: 20,
	},

	submitButton: {
		marginTop: -15,
		marginLeft: 'auto',
		padding: 12,
		borderRadius: 10,
		borderWidth: 4,
		backgroundColor: 'black',
	}
});

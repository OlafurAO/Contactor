import * as ImagePicker from 'expo-image-picker';
import * as Permission from  'expo-permissions';

const getPermissions = async permissionTypes => {
	await Promise.all(permissionTypes.map(
		async (type) => Permission.askAsync(type)
	));
}

export const selectFromCameraRoll = async () => {

};

export const takePhoto = async () => {
	await getPermissions([ Permission.CAMERA, Permission.CAMERA_ROLL]);
	const result = await ImagePicker.launchCameraAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		quality: 0.8,
		base64: true,
		aspect: [16, 9]
	});

	if(result.cancelled) {
		return 'uri not found';
	} else {
		return result.uri;
	}
}

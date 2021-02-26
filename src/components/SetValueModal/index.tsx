import React from 'react';
import { StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Dialog, TextInput, Button, withTheme } from 'react-native-paper';

interface SetValueModalProps {
	visible: boolean;
	onClose?: () => void;
	onSubmit?: (value: string) => void;
	theme: ReactNativePaper.Theme;
	keyboardType?: KeyboardTypeOptions;
}

const styles = StyleSheet.create({
	container: {
		width: '80%',
		alignSelf: 'center',
		padding: 20,
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 15,
	},
	button: {
		marginLeft: 10,
	},
});

const SetValueModal: React.FC<SetValueModalProps> = ({ visible, onClose, onSubmit, theme, keyboardType }) => {
	const [value, setValue] = React.useState('');

	const handleSubmit = React.useCallback(() => {
		if (onSubmit && value.trim()) onSubmit(value.trim());
		setValue('');
	}, [onSubmit, value]);

	const handleClose = React.useCallback(() => {
		if (onClose) onClose();

		setValue('');
	}, [onClose]);

	return (
		<Dialog onDismiss={handleClose} dismissable={true} visible={visible}>
			<Dialog.Content>
				<TextInput
					mode="outlined"
					label="Set value"
					onSubmitEditing={handleSubmit}
					keyboardType={keyboardType}
					dense
					value={value}
					onChangeText={setValue}
				/>
			</Dialog.Content>
			<Dialog.Actions>
				<Button style={styles.button} onPress={handleClose}>Cancel</Button>
				<Button style={styles.button} onPress={handleSubmit}>Submit</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

export default withTheme(SetValueModal);

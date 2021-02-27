import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, TextInput, Button, withTheme, Title } from 'react-native-paper';
import clamp from '../../util/clamp';

interface SetValueModalProps {
	visible: boolean;
	onClose?: () => void;
	onSubmit?: (value: number) => void;
	theme: ReactNativePaper.Theme;
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
	input: {
		flex: 1,
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const SetValueModal: React.FC<SetValueModalProps> = ({ visible, onClose, onSubmit, theme }) => {
	const [hours, setHours] = React.useState('0');
	const [minutes, setMinutes] = React.useState('0');
	const [seconds, setSeconds] = React.useState('0');

	const handleSubmit = () => {
		const ms = parseInt(hours) * 60 * 60 * 1000 + parseInt(minutes) * 60 * 1000 + parseInt(seconds) * 1000;
		if (onSubmit && ms) onSubmit(clamp(ms, 0, 23 * 60 * 60 * 1000));

		setHours('0');
		setMinutes('0');
		setSeconds('0');
	};

	const handleClose = React.useCallback(() => {
		if (onClose) onClose();

		setHours('0');
		setMinutes('0');
		setSeconds('0');
	}, [onClose]);

	return (
		<Dialog onDismiss={handleClose} dismissable={true} visible={visible}>
			<Dialog.Content style={styles.content}>
				<TextInput
					style={styles.input}
					mode="outlined"
					label="hh"
					onSubmitEditing={handleSubmit}
					keyboardType="numeric"
					dense
					onChangeText={setHours}
				/>
				<Title>:</Title>
				<TextInput
					style={styles.input}
					mode="outlined"
					label="mm"
					keyboardType="numeric"
					dense
					onChangeText={setMinutes}
				/>
				<Title>:</Title>
				<TextInput
					style={styles.input}
					mode="outlined"
					label="ss"
					onSubmitEditing={handleSubmit}
					keyboardType="numeric"
					dense
					onChangeText={setSeconds}
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

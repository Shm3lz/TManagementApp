import React from 'react';
import { View, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Modal, TextInput, Button, withTheme } from 'react-native-paper';

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

	const handleSubmit = React.useCallback(() => onSubmit && onSubmit(value), [onSubmit, value]);
	const containerBackgroundStyle = React.useMemo(() => ({ backgroundColor: theme.colors.background }), [theme]);

	return (
		<Modal onDismiss={onClose} dismissable={true} visible={visible}>
			<View style={[styles.container, containerBackgroundStyle]}>
				<TextInput label="Set value" onSubmitEditing={handleSubmit} keyboardType={keyboardType} dense value={value} onChangeText={setValue} />
				<View style={styles.buttonsContainer}>
					<Button mode="contained" style={styles.button} onPress={onClose}>Cancel</Button>
					<Button mode="contained" style={styles.button} onPress={handleSubmit}>Submit</Button>
				</View>
			</View>
		</Modal>
	);
};

export default withTheme(SetValueModal);

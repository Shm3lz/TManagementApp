import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Paragraph, withTheme } from 'react-native-paper';

interface ChipProps {
	theme: ReactNativePaper.Theme;
	checked: boolean;
	text: string;
	onPress?: () => void;
}

const styles = StyleSheet.create({
	chip: {
		borderRadius: 100,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderWidth: 0.5,
		borderStyle: 'solid',
	},

	checkedChip: {
		backgroundColor: 'gray',
		color: 'white',
	},

	checkedText: {
		color: 'white',
	},
});

const SimpleChip: React.FC<ChipProps> = ({ theme, text, checked, onPress }) => {
	return (
		<Pressable onPress={onPress} style={checked ? [styles.checkedChip, styles.chip] : styles.chip}>
			<Paragraph style={checked && styles.checkedText}>
				{text}
			</Paragraph>
		</Pressable>
	);
};

export default withTheme(SimpleChip);
